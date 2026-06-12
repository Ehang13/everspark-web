"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, FileText } from "lucide-react";

export default function ArticlePageContent(props: {
  preloadedArticle: Preloaded<typeof api.articles.getBySlug>;
}) {
  const article = usePreloadedQuery(props.preloadedArticle);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
            <FileText className="h-10 w-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">칼럼을 찾을 수 없습니다</h1>
          <p className="text-gray-400 mb-6">
            요청하신 칼럼이 존재하지 않거나 삭제되었습니다.
          </p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/column">
              <ArrowLeft className="h-4 w-4 mr-2" />
              칼럼 목록으로
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=400,height=400,fit=scale-down,quality=90,anim=true/qk03svjcyig9ubqocjhegz95/j27ye25azcxwlnug91w5wl7d/IkU-FEG69o2vhW_L6jqWS.png"
                alt="EverSpark Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold text-white">EverSpark</span>
            </Link>
            <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Link href="/column">
                <ArrowLeft className="h-4 w-4 mr-2" />
                칼럼 목록
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <article>
          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="border-gray-700 text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(article.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </Badge>
              <Badge variant="outline" className="border-gray-700 text-gray-400">
                <User className="h-3 w-3 mr-1" />
                {article.author.name}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-xl text-gray-400 leading-relaxed">
                {article.excerpt}
              </p>
            )}
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-invert max-w-none">
            {article.content.split('\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;
              return (
                <p key={index} className="text-gray-300 leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">
                <p>작성일: {new Date(article.createdAt).toLocaleDateString("ko-KR")}</p>
                {article.updatedAt !== article.createdAt && (
                  <p>수정일: {new Date(article.updatedAt).toLocaleDateString("ko-KR")}</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/column">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    다른 칼럼 보기
                  </Link>
                </Button>
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/">
                    상담 신청하기
                  </Link>
                </Button>
              </div>
            </div>
          </footer>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EverSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
