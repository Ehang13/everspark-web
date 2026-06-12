"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultServiceType?: "coaching" | "agency";
}

export default function ContactFormModal({
  open,
  onOpenChange,
  defaultServiceType = "coaching",
}: ContactFormModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [serviceType, setServiceType] = useState<"coaching" | "agency">(defaultServiceType);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createContact = useMutation(api.contacts.createContact);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !businessType) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "이름, 연락처, 업종은 필수 입력 항목입니다.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createContact({
        name,
        phone,
        businessType,
        serviceType,
        message: message || undefined,
      });

      toast({
        title: "상담 신청이 완료되었습니다! 🎉",
        description: "빠른 시간 내에 연락드리겠습니다.",
      });

      // 폼 초기화 및 모달 닫기
      setName("");
      setPhone("");
      setBusinessType("");
      setMessage("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "신청 중 오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">무료 상담 신청</DialogTitle>
          <DialogDescription>
            정보를 남겨주시면 24시간 내에 연락드리겠습니다.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">연락처 *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-1234-5678"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">업종 *</Label>
            <Input
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="예: 한의원, 카페, 미용실 등"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">신청 서비스 *</Label>
            <Select
              value={serviceType}
              onValueChange={(value: "coaching" | "agency") => setServiceType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coaching">월 30만원 코칭 플랜</SelectItem>
                <SelectItem value="agency">완전 대행 플랜 (맞춤 견적)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">문의 내용 (선택)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="현재 네이버 마케팅 상황이나 궁금하신 점을 자유롭게 적어주세요."
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                신청 중...
              </>
            ) : (
              "상담 신청하기"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
