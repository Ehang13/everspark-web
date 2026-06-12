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

    // 텔레그램 알림
    if (process.env.OTP_ENDPOINT && process.env.CHAT_ID) {
      try {
        const response = await fetch(process.env.OTP_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.CHAT_ID,
            text: emailBody,
          }),
        });
        if (!response.ok) {
          console.error("Telegram 전송 실패:", await response.text());
        }
      } catch (error) {
        console.error("Telegram 전송 오류:", error);
      }
    }

    // 이메일 알림 (Resend)
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const serviceTypeText = args.serviceType === "coaching" ? "월 30만원 코칭 플랜" : "완전 대행 플랜";
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "EverSpark <onboarding@resend.dev>",
            to: [process.env.NOTIFICATION_EMAIL],
            subject: `[EverSpark] 새 상담 신청 - ${args.name} (${args.businessType})`,
            text: emailBody,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#f97316;">🔔 새 상담 신청이 접수되었습니다</h2>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px;border:1px solid #eee;color:#666;">이름</td><td style="padding:8px;border:1px solid #eee;font-weight:bold;">${args.name}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #eee;color:#666;">연락처</td><td style="padding:8px;border:1px solid #eee;font-weight:bold;">${args.phone}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #eee;color:#666;">업종</td><td style="padding:8px;border:1px solid #eee;">${args.businessType}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #eee;color:#666;">신청 서비스</td><td style="padding:8px;border:1px solid #eee;">${serviceTypeText}</td></tr>
                  <tr><td style="padding:8px;border:1px solid #eee;color:#666;">문의 내용</td><td style="padding:8px;border:1px solid #eee;">${args.message || "-"}</td></tr>
                </table>
                <p style="color:#999;font-size:12px;margin-top:16px;">접수 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
              </div>
            `,
          }),
        });
        if (!response.ok) {
          console.error("이메일 전송 실패:", await response.text());
        }
      } catch (error) {
        console.error("이메일 전송 오류:", error);
      }
    }
  },
});
