import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

//1 get upload url
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

//create a mutation to create a post
export const createPost = mutation({
  args: { caption: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    //get the identity of the user
    const currentUser = await getAuthenticatedUser(ctx);
    //get an image url
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) {
      throw new Error("Image not found");
    }
    //create post
    await ctx.db.insert("posts", {
      userId: currentUser._id,
      imageUrl,
      caption: args.caption,
      storageId: args.storageId,
      likes: 0,
      comments: 0,
    });

    //increment users post by 1
    await ctx.db.patch(currentUser._id, { posts: currentUser.posts + 1 });
  },
});

export const getFeedPost = query({
  handler: async (ctx) => {
    //identify user
    const currentUser = await getAuthenticatedUser(ctx);

    // get all posts from users that the current user is following
    const posts = await ctx.db.query("posts").order("desc").collect();
    if (posts.length === 0) return [];

    // enhance posts with user information
    const postsWithInfo = await Promise.all(
      posts.map(async (post) => {
        const PostAuthor = await ctx.db.get(post.userId);
        const likes = await ctx.db
          .query("likes")
          .withIndex("by_user_and_post", (q) =>
            q.eq("userId", currentUser._id).eq("postId", post._id)
          )
          .first();

        // check if the current user has bookmarked the post
        const bookmarks = await ctx.db
          .query("bookmarks")
          .withIndex("by_user_and_post", (q) =>
            q.eq("userId", currentUser._id).eq("postId", post._id)
          )
          .first();

        return {
          ...post,
          author: {
            username: PostAuthor?.username,
            fullname: PostAuthor?.fullname,
            image: PostAuthor?.image,
          },
          isLiked: !!likes,
          isBookmarked: !!bookmarks,
        };
      })
    );
    return postsWithInfo;
  },
});
