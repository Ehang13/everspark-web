import { v } from "convex/values";
import { mutation, internalAction, query } from "./_generated/server";
import { internal, api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

// Define result type for getContacts
type GetContactsResult =
  | { ok: true; contacts: Doc<"contacts">[] }
  | { ok: false; code: "FORBIDDEN"; message: string };

// Query: 모든 상담 신청 데이터 조회 (최신순) - 관리자 전용
export const getContacts = query({
  args: {},
  handler: async (ctx): Promise<GetContactsResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "관리자만 접근할 수 있습니다." };
    }

    const contacts = await ctx.db
      .query("contacts")
      .order("desc")
      .collect();
    return { ok: true, contacts };
  },
});

// Mutation: 상담 신청 데이터를 데이터베이스에 저장
export const createContact = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    businessType: v.string(),
    serviceType: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contacts", {
      name: args.name,
      phone: args.phone,
      businessType: args.businessType,
      serviceType: args.serviceType,
      message: args.message,
      status: "new",
      createdAt: Date.now(),
    });

    // 이메일 알림 전송을 위해 action 호출
    await ctx.scheduler.runAfter(0, internal.contacts.sendContactEmail, {
      contactId,
      name: args.name,
      phone: args.phone,
      businessType: args.businessType,
      serviceType: args.serviceType,
      message: args.message || "",
    });

    return contactId;
  },
});

// Mutation: 상담 신청 상태 변경 - 관리자 전용
export const updateContactStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    if (!isUserAdmin) {
      return { ok: false, message: "관리자만 접근할 수 있습니다." };
    }
    await ctx.db.patch(args.id, { status: args.status });
    return { ok: true };
  },
});

// Internal Action: 알림 전송 (텔레그램 + 이메일)
export const sendContactEmail = internalAction({
  args: {
    contactId: v.id("contacts"),
    name: v.string(),
    phone: v.string(),
    businessType: v.string(),
    serviceType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const serviceTypeText = args.serviceType === "coaching" ? "코칭 플랜" : "완전 대행 플랜";
    
    const emailBody = `
새로운 상담 신청이 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━
📋 신청자 정보
━━━━━━━━━━━━━━━━━━━━━━━━

👤 이름: ${args.name}
📞 연락처: ${args.phone}
🏢 업종: ${args.businessType}
📦 신청 서비스: ${serviceTypeText}

${args.message ? `💬 문의 내용:\n${args.message}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━

접수 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
Contact ID: ${args.contactId}
    `.trim();

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: emailBody,
          }),
        }
      );
      if (!response.ok) {
        console.error("Telegram 전송 실패:", await response.text());
      }
    } catch (error) {
      console.error("Telegram 전송 오류:", error);
    }
  },
});
