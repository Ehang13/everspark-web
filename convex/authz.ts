import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const user = await ctx.db.get(userId);
    return !!user && user.role === "admin";
  },
});

// 관리자 이메일 화이트리스트 확인
export const checkAdminEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // 환경변수에서 허용된 이메일 목록 가져오기
    const adminEmails = process.env.ADMIN_EMAILS;
    
    if (!adminEmails) {
      console.log("ADMIN_EMAILS 환경변수가 설정되지 않았습니다.");
      return { allowed: false, message: "관리자 설정이 완료되지 않았습니다." };
    }
    
    // 쉼표로 구분된 이메일 목록을 배열로 변환
    const allowedEmails = adminEmails
      .split(",")
      .map(email => email.trim().toLowerCase());
    
    const isAllowed = allowedEmails.includes(args.email.toLowerCase());
    
    if (!isAllowed) {
      console.log(`관리자 로그인 시도 거부: ${args.email}`);
      return { allowed: false, message: "관리자 권한이 없는 이메일입니다." };
    }
    
    console.log(`관리자 로그인 허용: ${args.email}`);
    return { allowed: true, message: "" };
  },
});
