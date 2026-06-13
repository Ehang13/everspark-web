import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()),
  }).index("email", ["email"]),
  contacts: defineTable({
    name: v.string(),
    phone: v.string(),
    businessName: v.optional(v.string()),
    businessType: v.string(),
    serviceType: v.string(), // "coaching" or "agency"
    message: v.optional(v.string()),
    consultationNote: v.optional(v.string()),
    status: v.string(), // "new", "contacted", "completed", "cancelled"
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    thumbnailId: v.optional(v.id("_storage")),
    published: v.boolean(),
    scheduledAt: v.optional(v.number()), // 예약 발행 시간 (timestamp)
    authorId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("slug", ["slug"])
    .index("published", ["published"])
    .index("author", ["authorId"])
    .index("scheduledAt", ["scheduledAt"]),
})
