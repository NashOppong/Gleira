import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
  args: { postId: v.id("posts") },

  /**
   * Toggles a bookmark on a post.
   * If the bookmark already exists, it will be deleted.
   * If the bookmark does not exist, it will be created.
   * @param ctx - The mutation context.
   * @param postId - The ID of the post to toggle the bookmark on.
   */
  handler: async (ctx, { postId }) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const existingBookmark = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", currentUser._id).eq("postId", postId)
      )
      .first();
    if (existingBookmark) {
      await ctx.db.delete(existingBookmark._id);
      return false;
    } else {
      await ctx.db.insert("bookmarks", {
        userId: currentUser._id,
        postId,
      });
      return true;
    }
  },
});

export const getBookmarks = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .order("desc")
      .collect();

    const bookmarksWithPosts = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const post = await ctx.db.get(bookmark.postId);
        return { ...bookmark, post };
      })
    );
    return bookmarksWithPosts;
  },
});
