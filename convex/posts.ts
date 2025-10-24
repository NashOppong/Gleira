import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    //check the current user
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!currentUser) {
      throw new Error("User not found");
    }
    //get an image url
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) {
      throw new Error("Image not found");
    }
    //create post
    await ctx.db.insert("posts", {
      userId: currentUser._id,
      imageUrl: args.storageId,
      caption: args.caption,
      storageId: args.storageId,
      likes: 0,
      comments: 0,
    });

    //increment users post by 1
    await ctx.db.patch(currentUser._id, { posts: currentUser.posts + 1 });
  },
});
