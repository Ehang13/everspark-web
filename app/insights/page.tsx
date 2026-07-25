import type { Metadata } from 'next';
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import InsightsPageContent from "@/components/insights-page-content";

const siteUrl = 'https://www.everspark.co.kr';

export const metadata: Metadata = {
  title: "트렌드 인사이트 | EverSpark - 마케팅 & 비즈니스 트렌드",
  description: "최신 마케팅 트렌드, 비즈니스 인사이트, 네이버 블로그·플레이스 노하우를 공유합니다. 로컬 비즈니스 성장을 위한 실전 정보.",
  keywords: ["마케팅 트렌드", "비즈니스 인사이트", "네이버 마케팅", "블로그 마케팅", "플레이스 마케팅", "로컬 비즈니스"],
  alternates: {
    canonical: `${siteUrl}/insights`,
  },
  openGraph: {
    title: "트렌드 인사이트 | EverSpark - 마케팅 & 비즈니스 트렌드",
    description: "최신 마케팅 트렌드와 비즈니스 인사이트를 공유합니다.",
    type: "website",
    url: `${siteUrl}/insights`,
  },
};

export default async function InsightsPage() {
  const preloadedArticles = await preloadQuery(api.articles.getPublished);
  return <InsightsPageContent preloadedArticles={preloadedArticles} />;
}
