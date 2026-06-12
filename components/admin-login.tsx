"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, KeyRound } from "lucide-react";

export default function AdminLogin() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"email" | "checking" | "code">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  
  // 이메일 화이트리스트 확인 쿼리
  const emailCheck = useQuery(
    api.authz.checkAdminEmail,
    step === "checking" ? { email } : "skip"
  );
  
  // 이메일 확인 결과 처리
  if (step === "checking" && emailCheck !== undefined && pendingFormData) {
    if (emailCheck.allowed) {
      // 허용된 이메일이면 OTP 전송
      signIn("resend-otp", pendingFormData)
        .then(() => {
          setStep("code");
          setPendingFormData(null);
        })
        .catch((err) => {
          setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
          console.error(err);
          setStep("email");
          setPendingFormData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // 허용되지 않은 이메일
      setError(emailCheck.message || "관리자 권한이 없는 이메일입니다.");
      setStep("email");
      setIsLoading(false);
      setPendingFormData(null);
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);
    setPendingFormData(formData);
    setStep("checking");
  };

  const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await signIn("resend-otp", formData);
      // Authentication success will be handled by the parent component
    } catch (err) {
      setError("인증 코드가 올바르지 않습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold">관리자 로그인</CardTitle>
          <CardDescription>
            {step === "email" || step === "checking"
              ? "관리자 이메일 주소를 입력하세요" 
              : "이메일로 전송된 인증 코드를 입력하세요"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" || step === "checking" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  이메일
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? (step === "checking" ? "확인 중..." : "전송 중...") : "인증 코드 받기"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <input name="email" value={email} type="hidden" />
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-gray-500" />
                  인증 코드
                </label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="123456"
                  required
                  disabled={isLoading}
                  className="w-full text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </p>
              )}
              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? "확인 중..." : "인증하기"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  disabled={isLoading}
                >
                  다른 이메일로 로그인
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
