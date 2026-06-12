import { query, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc } from "./_generated/dataModel";
import { v } from "convex/values";

export const currentLoggedInUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user: Doc<"users"> | null = await ctx.db.get(userId);
    return user;
  },
});

// Internal mutation to set user as admin (run via CLI)
export const setAdminRole = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
    
    if (!user) {
      throw new Error(`User with email ${args.email} not found`);
    }
    
    await ctx.db.patch(user._id, { role: "admin" });
    return { success: true, userId: user._id };
  },
});
