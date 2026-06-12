import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

// Generate upload URL for thumbnail images
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    if (!isUserAdmin) {
      throw new Error("관리자 권한이 필요합니다.");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

// Get thumbnail URL from storage ID
export const getThumbnailUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Public query to get all published articles for insights page
// 예약 발행: scheduledAt이 없거나 현재 시간보다 이전인 글만 표시
export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const articles = await ctx.db
      .query("articles")
      .withIndex("published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
    
    // 예약 발행 시간이 지난 글만 필터링
    const publishedArticles = articles.filter(article => 
      !article.scheduledAt || article.scheduledAt <= now
    );
    
    // Sort by scheduledAt (publication date) or createdAt, newest first
    const sortedArticles = publishedArticles.sort((a, b) => {
      const dateA = a.scheduledAt || a.createdAt;
      const dateB = b.scheduledAt || b.createdAt;
      return dateB - dateA;
    });
    
    // Get author info and thumbnail URL for each article
    const articlesWithAuthors = await Promise.all(
      sortedArticles.map(async (article) => {
        const author = await ctx.db.get(article.authorId);
        const thumbnailUrl = article.thumbnailId 
          ? await ctx.storage.getUrl(article.thumbnailId) 
          : null;
        return {
          ...article,
          thumbnailUrl,
          author: author ? { name: author.name || "EverSpark" } : { name: "EverSpark" }
        };
      })
    );
    
    return articlesWithAuthors;
  },
});

// Public query to get a single published article by slug
// 예약 발행: scheduledAt이 없거나 현재 시간보다 이전인 글만 표시
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const now = Date.now();
    const article = await ctx.db
      .query("articles")
      .withIndex("slug", (q) => q.eq("slug", slug))
      .filter((q) => q.eq(q.field("published"), true))
      .first();
    
    // 예약 발행 시간이 안 지났으면 공개 안 함
    if (!article || (article.scheduledAt && article.scheduledAt > now)) return null;
    
    const author = await ctx.db.get(article.authorId);
    const thumbnailUrl = article.thumbnailId 
      ? await ctx.storage.getUrl(article.thumbnailId) 
      : null;
    return {
      ...article,
      thumbnailUrl,
      author: author ? { name: author.name || "EverSpark" } : { name: "EverSpark" }
    };
  },
});

// Admin query to get all articles (published and unpublished)
type GetAllForAdminResult =
  | { ok: true; articles: (Doc<"articles"> & { author: { name: string }; thumbnailUrl: string | null })[] }
  | { ok: false; code: "FORBIDDEN"; message: string };

export const getAllForAdmin = query({
  args: {},
  handler: async (ctx): Promise<GetAllForAdminResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "관리자 권한이 필요합니다." };
    }

    const articles = await ctx.db.query("articles").collect();
    
    // Sort by scheduledAt (publication date) or createdAt, newest first
    const sortedArticles = articles.sort((a, b) => {
      const dateA = a.scheduledAt || a.createdAt;
      const dateB = b.scheduledAt || b.createdAt;
      return dateB - dateA;
    });
    
    // Get author info and thumbnail URL for each article
    const articlesWithAuthors = await Promise.all(
      sortedArticles.map(async (article) => {
        const author = await ctx.db.get(article.authorId);
        const thumbnailUrl = article.thumbnailId 
          ? await ctx.storage.getUrl(article.thumbnailId) 
          : null;
        return {
          ...article,
          thumbnailUrl,
          author: author ? { name: author.name || "EverSpark" } : { name: "EverSpark" }
        };
      })
    );
    
    return { ok: true, articles: articlesWithAuthors };
  },
});

// Admin mutation to create a new article
type CreateArticleResult =
  | { ok: true; articleId: string }
  | { ok: false; code: "FORBIDDEN" | "VALIDATION_ERROR"; message: string };

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    thumbnailId: v.optional(v.id("_storage")),
    published: v.boolean(),
    scheduledAt: v.optional(v.number()), // 예약 발행 시간
  },
  handler: async (ctx, args): Promise<CreateArticleResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "관리자 권한이 필요합니다." };
    }

    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { ok: false, code: "FORBIDDEN", message: "로그인이 필요합니다." };
    }

    // Check if slug already exists
    const existingArticle = await ctx.db
      .query("articles")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (existingArticle) {
      return { ok: false, code: "VALIDATION_ERROR", message: "이미 사용 중인 URL 슬러그입니다." };
    }

    const now = Date.now();
    const articleId = await ctx.db.insert("articles", {
      ...args,
      authorId: userId,
      createdAt: now,
      updatedAt: now,
    });

    return { ok: true, articleId };
  },
});

// Admin mutation to update an article
type UpdateArticleResult =
  | { ok: true }
  | { ok: false; code: "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_ERROR"; message: string };

export const update = mutation({
  args: {
    id: v.id("articles"),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    thumbnailId: v.optional(v.id("_storage")),
    published: v.boolean(),
    scheduledAt: v.optional(v.number()), // 예약 발행 시간
  },
  handler: async (ctx, args): Promise<UpdateArticleResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "관리자 권한이 필요합니다." };
    }

    const article = await ctx.db.get(args.id);
    if (!article) {
      return { ok: false, code: "NOT_FOUND", message: "칼럼을 찾을 수 없습니다." };
    }

    // Check if slug already exists (excluding current article)
    const existingArticle = await ctx.db
      .query("articles")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.neq(q.field("_id"), args.id))
      .first();
    
    if (existingArticle) {
      return { ok: false, code: "VALIDATION_ERROR", message: "이미 사용 중인 URL 슬러그입니다." };
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug: args.slug,
      content: args.content,
      excerpt: args.excerpt,
      thumbnailId: args.thumbnailId,
      published: args.published,
      scheduledAt: args.scheduledAt,
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

// Admin mutation to delete an article
type DeleteArticleResult =
  | { ok: true }
  | { ok: false; code: "FORBIDDEN" | "NOT_FOUND"; message: string };

export const deleteArticle = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, { id }): Promise<DeleteArticleResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "관리자 권한이 필요합니다." };
    }

    const article = await ctx.db.get(id);
    if (!article) {
      return { ok: false, code: "NOT_FOUND", message: "칼럼을 찾을 수 없습니다." };
    }

    await ctx.db.delete(id);
    return { ok: true };
  },
});
