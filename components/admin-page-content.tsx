"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLogin from "@/components/admin-login";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, Plus, Edit, Trash2, Eye, FileText, Users, Home, Upload, X, ImageIcon, Clock, CalendarClock, Bold, Heading2, Heading3 } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminPageContent() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.currentLoggedInUser);
  const isAdmin = useQuery(api.authz.isAdmin);
  const contactsResult = useQuery(
    api.contacts.getContacts,
    isAdmin ? {} : "skip"
  );
  const articlesResult = useQuery(
    api.articles.getAllForAdmin,
    isAdmin ? {} : "skip"
  );

  // Contact detail modal state
  const [selectedContact, setSelectedContact] = useState<Doc<"contacts"> | null>(null);

  // Article form state
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<Id<"articles"> | null>(null);
  const [articleFormData, setArticleFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    thumbnailId: undefined as Id<"_storage"> | undefined,
    published: false,
    scheduledAt: undefined as number | undefined,
  });
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const updateContactStatus = useMutation(api.contacts.updateContactStatus);

  const CONTACT_STATUSES = [
    { value: "new", label: "신규", color: "bg-blue-100 text-blue-700" },
    { value: "contacted", label: "연락완료", color: "bg-yellow-100 text-yellow-700" },
    { value: "completed", label: "계약완료", color: "bg-green-100 text-green-700" },
    { value: "cancelled", label: "취소", color: "bg-gray-100 text-gray-500" },
  ];

  const getStatusLabel = (status: string) =>
    CONTACT_STATUSES.find((s) => s.value === status)?.label ?? status;
  const getStatusColor = (status: string) =>
    CONTACT_STATUSES.find((s) => s.value === status)?.color ?? "";

  const createArticle = useMutation(api.articles.create);

  // 텍스트 서식 삽입 함수
  const insertFormatting = (type: "bold" | "h2" | "h3") => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = articleFormData.content.substring(start, end);
    const beforeText = articleFormData.content.substring(0, start);
    const afterText = articleFormData.content.substring(end);

    let newText = "";
    let cursorOffset = 0;

    switch (type) {
      case "bold":
        newText = `**${selectedText || "굵은 텍스트"}**`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case "h2":
        // 줄 시작에 ## 추가
        const h2Text = selectedText || "소제목";
        newText = beforeText.endsWith("\n") || beforeText === "" 
          ? `## ${h2Text}\n` 
          : `\n## ${h2Text}\n`;
        cursorOffset = newText.length - 1;
        break;
      case "h3":
        const h3Text = selectedText || "소제목";
        newText = beforeText.endsWith("\n") || beforeText === "" 
          ? `### ${h3Text}\n` 
          : `\n### ${h3Text}\n`;
        cursorOffset = newText.length - 1;
        break;
    }

    const finalContent = beforeText + newText + afterText;
    setArticleFormData({ ...articleFormData, content: finalContent });

    // 커서 위치 복원
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  const updateArticle = useMutation(api.articles.update);
  const deleteArticle = useMutation(api.articles.deleteArticle);
  const generateUploadUrl = useMutation(api.articles.generateUploadUrl);

  // Handle thumbnail upload
  const handleThumbnailUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const uploadUrl = await generateUploadUrl();
      
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      
      if (!uploadResponse.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }
      
      const { storageId } = await uploadResponse.json();
      
      if (!storageId) {
        throw new Error("업로드된 이미지 ID를 받지 못했습니다.");
      }
      
      setArticleFormData({ ...articleFormData, thumbnailId: storageId });
      setThumbnailPreview(URL.createObjectURL(file));
      console.log("Thumbnail uploaded:", storageId);
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeThumbnail = () => {
    setArticleFormData({ ...articleFormData, thumbnailId: undefined });
    setThumbnailPreview(null);
  };

  // Auto-generate slug from title (Korean-friendly)
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setArticleFormData({ 
      ...articleFormData, 
      title,
      slug: isSlugManuallyEdited ? articleFormData.slug : generateSlug(title)
    });
  };

  const handleSlugChange = (slug: string) => {
    setArticleFormData({ ...articleFormData, slug });
    setIsSlugManuallyEdited(true);
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticleId) {
        const result = await updateArticle({ id: editingArticleId, ...articleFormData });
        if (result.ok) {
          resetArticleForm();
        } else {
          alert(`오류: ${result.message}`);
        }
      } else {
        const result = await createArticle(articleFormData);
        if (result.ok) {
          resetArticleForm();
        } else {
          alert(`오류: ${result.message}`);
        }
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const resetArticleForm = () => {
    setArticleFormData({ title: "", slug: "", content: "", excerpt: "", thumbnailId: undefined, published: false, scheduledAt: undefined });
    setShowArticleForm(false);
    setEditingArticleId(null);
    setIsSlugManuallyEdited(false);
    setThumbnailPreview(null);
  };

  const handleEditArticle = (article: Doc<"articles"> & { author?: { name: string }; thumbnailUrl?: string | null }) => {
    setArticleFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt || "",
      thumbnailId: article.thumbnailId,
      published: article.published,
      scheduledAt: article.scheduledAt,
    });
    setThumbnailPreview(article.thumbnailUrl || null);
    setEditingArticleId(article._id);
    setShowArticleForm(true);
    setIsSlugManuallyEdited(true);
  };

  const handleDeleteArticle = async (id: Id<"articles">) => {
    if (confirm("정말 이 인사이트를 삭제하시겠습니까?")) {
      const result = await deleteArticle({ id });
      if (!result.ok) {
        alert(`오류: ${result.message}`);
      }
    }
  };

  // Loading state
  if (user === undefined || isAdmin === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // Not authenticated - show login form
  if (user === null) {
    return <AdminLogin />;
  }

  // Authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold text-lg">
            ⛔ 접근 권한이 없습니다
          </p>
          <p className="text-gray-600">
            관리자 권한이 필요합니다. ({user.email})
          </p>
          <Button
            onClick={() => void signOut()}
            variant="outline"
            className="mt-4"
          >
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </div>
    );
  }

  // Loading data
  if (contactsResult === undefined || articlesResult === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500">데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error from result union
  if (!contactsResult.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{contactsResult.message}</p>
      </div>
    );
  }

  if (!articlesResult.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{articlesResult.message}</p>
      </div>
    );
  }

  const contacts = contactsResult.contacts;
  const articles = articlesResult.articles;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              관리자 대시보드
            </h1>
            <p className="text-gray-600">
              EverSpark 관리 페이지
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                메인으로
              </Link>
            </Button>
            <span className="text-sm text-gray-600">{user.email}</span>
            <Button
              onClick={() => void signOut()}
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              상담 신청 ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              트렌드 인사이트 ({articles.length})
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            {contacts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">아직 상담 신청이 없습니다.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>접수일시</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>연락처</TableHead>
                      <TableHead>업종</TableHead>
                      <TableHead>서비스</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>문의내용</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact._id}>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(contact.createdAt).toLocaleString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="font-medium">
                          {contact.name}
                        </TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.businessType}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              contact.serviceType === "coaching"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {contact.serviceType === "coaching"
                              ? "월 30만원 코칭"
                              : "완전 대행"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={contact.status}
                            onValueChange={(value) =>
                              void updateContactStatus({ id: contact._id, status: value })
                            }
                          >
                            <SelectTrigger className={`w-28 text-xs font-medium border-0 ${getStatusColor(contact.status)}`}>
                              <SelectValue>{getStatusLabel(contact.status)}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {CONTACT_STATUSES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.color}`}>
                                    {s.label}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 truncate flex-1">
                              {contact.message || "-"}
                            </span>
                            {contact.message && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                                className="shrink-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-2"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Contact Detail Modal */}
            <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>상담 신청 상세</DialogTitle>
                </DialogHeader>
                {selectedContact && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">이름</p>
                        <p className="font-medium">{selectedContact.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">연락처</p>
                        <p className="font-medium">{selectedContact.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">업종</p>
                        <p className="font-medium">{selectedContact.businessType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">서비스</p>
                        <Badge variant={selectedContact.serviceType === "coaching" ? "default" : "secondary"}>
                          {selectedContact.serviceType === "coaching" ? "월 30만원 코칭" : "완전 대행"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">접수일시</p>
                        <p className="font-medium">
                          {new Date(selectedContact.createdAt).toLocaleString("ko-KR")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">상태</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                          {getStatusLabel(selectedContact.status)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-2 text-sm">문의 내용</p>
                      <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                        <p className="text-sm whitespace-pre-wrap">
                          {selectedContact.message || "문의 내용이 없습니다."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/insights">
                      <Eye className="h-4 w-4 mr-2" />
                      트렌드 인사이트 보기
                    </Link>
                  </Button>
                </div>
                <Button onClick={() => {
                  setShowArticleForm(true);
                  setIsSlugManuallyEdited(false);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  새 인사이트 작성
                </Button>
              </div>

              {/* Article Form */}
              {showArticleForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingArticleId ? "인사이트 수정" : "새 인사이트 작성"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleArticleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">제목</Label>
                        <Input
                          id="title"
                          value={articleFormData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="인사이트 제목을 입력하세요"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">URL 슬러그</Label>
                        <Input
                          id="slug"
                          value={articleFormData.slug}
                          onChange={(e) => handleSlugChange(e.target.value)}
                          placeholder="url-slug"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          URL: /insights/{articleFormData.slug || "url-slug"}
                        </p>
                      </div>
                      
                      {/* Thumbnail Upload */}
                      <div>
                        <Label>대표 이미지 (선택)</Label>
                        {thumbnailPreview ? (
                          <div className="relative mt-2 inline-block">
                            <Image 
                              src={thumbnailPreview} 
                              alt="Thumbnail preview" 
                              width={200} 
                              height={120}
                              className="rounded-lg object-cover border"
                            />
                            <button
                              type="button"
                              onClick={removeThumbnail}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors">
                              <div className="text-center">
                                {isUploading ? (
                                  <p className="text-sm text-gray-500">업로드 중...</p>
                                ) : (
                                  <>
                                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">클릭하여 이미지 업로드</p>
                                    <p className="text-xs text-gray-400">JPG, PNG, WebP</p>
                                  </>
                                )}
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                disabled={isUploading}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleThumbnailUpload(file);
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="excerpt">요약 (선택)</Label>
                        <Textarea
                          id="excerpt"
                          value={articleFormData.excerpt}
                          onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                          rows={2}
                          placeholder="인사이트의 간단한 요약..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">본문</Label>
                        {/* 서식 도구 모음 */}
                        <div className="flex gap-1 mb-2 p-2 bg-gray-100 rounded-t-md border border-b-0 border-gray-300">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("bold")}
                            title="굵게 (Ctrl+B)"
                            className="h-8 w-8 p-0"
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("h2")}
                            title="큰 소제목"
                            className="h-8 px-2"
                          >
                            <Heading2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">큰</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => insertFormatting("h3")}
                            title="작은 소제목"
                            className="h-8 px-2"
                          >
                            <Heading3 className="h-4 w-4 mr-1" />
                            <span className="text-xs">작은</span>
                          </Button>
                          <span className="text-xs text-gray-500 ml-auto self-center">
                            텍스트 선택 후 버튼 클릭
                          </span>
                        </div>
                        <Textarea
                          ref={contentTextareaRef}
                          id="content"
                          value={articleFormData.content}
                          onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                          rows={15}
                          required
                          placeholder="인사이트 내용을 작성하세요...

## 소제목은 이렇게 (큰 소제목)
### 더 작은 소제목 (작은 소제목)
**굵은 텍스트**는 이렇게"
                          className="font-mono rounded-t-none"
                        />
                      </div>
                      {/* 예약 발행 */}
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center gap-2 mb-3">
                          <CalendarClock className="h-4 w-4 text-orange-500" />
                          <Label className="text-sm font-medium">예약 발행</Label>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <input
                              type="datetime-local"
                              value={articleFormData.scheduledAt 
                                ? (() => {
                                    const d = new Date(articleFormData.scheduledAt);
                                    const year = d.getFullYear();
                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                    const day = String(d.getDate()).padStart(2, '0');
                                    const hours = String(d.getHours()).padStart(2, '0');
                                    const minutes = String(d.getMinutes()).padStart(2, '0');
                                    return `${year}-${month}-${day}T${hours}:${minutes}`;
                                  })()
                                : ""
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                setArticleFormData({
                                  ...articleFormData,
                                  scheduledAt: value ? new Date(value).getTime() : undefined
                                });
                              }}
                              className="flex h-10 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            {articleFormData.scheduledAt && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setArticleFormData({ ...articleFormData, scheduledAt: undefined })}
                              >
                                <X className="h-4 w-4" />
                                예약 취소
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {articleFormData.scheduledAt 
                              ? `${new Date(articleFormData.scheduledAt).toLocaleString("ko-KR")}에 자동 공개됩니다.`
                              : "날짜/시간을 선택하면 해당 시점에 자동으로 공개됩니다. 비워두면 즉시 공개됩니다."
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={articleFormData.published}
                          onCheckedChange={(checked) => setArticleFormData({ ...articleFormData, published: checked })}
                        />
                        <Label htmlFor="published" className="flex flex-col">
                          <span>
                            {articleFormData.published 
                              ? (articleFormData.scheduledAt 
                                  ? `${new Date(articleFormData.scheduledAt).toLocaleString("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}에 공개`
                                  : "즉시 공개"
                                )
                              : "비공개 (저장만)"
                            }
                          </span>
                        </Label>
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">{editingArticleId ? "수정" : "작성"}</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetArticleForm}
                        >
                          취소
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Articles List */}
              {articles.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">아직 작성된 인사이트가 없습니다.</p>
                  <Button onClick={() => setShowArticleForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    첫 인사이트 작성하기
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Card key={article._id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              {article.scheduledAt && article.scheduledAt > Date.now() ? (
                                <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                                  <Clock className="h-3 w-3 mr-1" />
                                  예약: {new Date(article.scheduledAt).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </Badge>
                              ) : (
                                <Badge variant={article.published ? "default" : "secondary"}>
                                  {article.published ? "공개" : "비공개"}
                                </Badge>
                              )}
                              <span className="text-sm text-gray-500">
                                {new Date(article.scheduledAt || article.createdAt).toLocaleDateString("ko-KR")}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{article.title}</h3>
                            <p className="text-sm text-gray-500">/insights/{article.slug}</p>
                            {article.excerpt && (
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {article.excerpt}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {article.published && (
                              <Button size="sm" variant="ghost" asChild>
                                <Link href={`/insights/${article.slug}`} target="_blank">
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => handleEditArticle(article)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteArticle(article._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
