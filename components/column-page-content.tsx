"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, ArrowRight, FileText } from "lucide-react";

export default function ColumnPageContent(props: {
  preloadedArticles: Preloaded<typeof api.articles.getPublished>;
}) {
  const articles = usePreloadedQuery(props.preloadedArticles);

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
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                메인으로
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative" style={{
        background: 'linear-gradient(135deg, #1a1a4e 0%, #2d1b4e 50%, #1a1a4e 100%)'
      }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full mb-6">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">EverSpark 칼럼</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            네이버 마케팅 인사이트
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            블로그와 플레이스 마케팅에 대한 실전 노하우와<br />
            로컬 비즈니스 성장을 위한 인사이트를 공유합니다.
          </p>
        </div>
      </section>

      {/* Articles List */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
              <FileText className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">아직 작성된 칼럼이 없습니다</h3>
            <p className="text-gray-400 mb-8">
              곧 유용한 마케팅 인사이트를 공유할 예정입니다.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">메인 페이지로 돌아가기</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link key={article._id} href={`/column/${article.slug}`}>
                <Card className="bg-gray-900/60 border-gray-800 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10 group">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
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
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-gray-400 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center text-orange-400 group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium mr-1">읽기</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EverSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
