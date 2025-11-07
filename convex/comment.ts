import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const addComments = mutation({
  args: {
    //userId: v.id("users"),
    postId: v.id("posts"),
    content: v.string(),
  },
  handler: async (ctx, args_0) => {
    const currentUser = await getAuthenticatedUser(ctx);
    if (!currentUser) {
      throw new Error("Unauthorized");
    }
    const post = await ctx.db.get(args_0.postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const commentId = await ctx.db.insert("comments", {
      userId: currentUser._id,
      postId: args_0.postId,
      content: args_0.content,
    });
    //increment the comments count
    await ctx.db.patch(post._id, { comments: post.comments + 1 });

    //create a notification
    if (currentUser._id !== post.userId) {
      await ctx.db.insert("notifications", {
        senderId: currentUser._id,
        receiverId: post.userId,
        type: "comment",
        commentId: commentId,
      });
    }

    return commentId;
  },
});

export const getComments = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args_0) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args_0.postId))
      .collect();

    const commentWithInfo = await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        return {
          ...comment,
          user: {
            username: user!.username,
            fullname: user!.fullname,
            image: user!.image,
          },
        };
      })
    );
    return commentWithInfo;
  },
});
