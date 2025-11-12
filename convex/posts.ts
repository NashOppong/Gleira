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
        const PostAuthor = (await ctx.db.get(post.userId))!;
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
            _id: PostAuthor?._id,
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

export const getPostsByUser = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const user = args.userId
      ? await ctx.db.get(args.userId)
      : await getAuthenticatedUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId || user._id))
      .order("desc")
      .collect();
    return posts;
  },
});

export const toggleLike = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", currentUser._id).eq("postId", args.postId)
      )
      .first();
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }
    if (existingLike) {
      //remove like
      await ctx.db.delete(existingLike._id);
      //decrement likes
      await ctx.db.patch(post._id, { likes: post.likes - 1 });
      return false;
    } else {
      //add like
      await ctx.db.insert("likes", {
        userId: currentUser._id,
        postId: args.postId,
      });
      //increment likes
      await ctx.db.patch(post._id, { likes: post.likes + 1 });

      //if its not my post create a notification
      if (post.userId !== currentUser._id) {
        await ctx.db.insert("notifications", {
          receiverId: post.userId,
          senderId: currentUser._id,
          type: "like",
          postId: args.postId,
        });
      }
      return true;
    }
  },
});

export const deletePost = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }
    //verify post owner
    if (post.userId !== currentUser._id) {
      throw new Error("Unauthorized");
    }
    //delete associated posts.... 1,GET ALL ASSOCIATED LIKES
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    // DELETE ALL LIKES
    for (const like of likes) {
      await ctx.db.delete(like._id);
    }
    //delete associated comments.... 1,GET ALL ASSOCIATED COMMENTS
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    // DELETE ALL COMMENTS
    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    //delete associated bookmarks.... 1,GET ALL ASSOCIATED Bookmarks
    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    // DELETE ALL Bookmarks
    for (const bookmark of bookmarks) {
      await ctx.db.delete(bookmark._id);
    }
    // DELETE Post media
    await ctx.storage.delete(post.storageId);
    //delete post
    await ctx.db.delete(args.postId);
    //decrement posts count
    await ctx.db.patch(currentUser._id, {
      posts: Math.max(currentUser.posts) - 1,
    });
  },
});
