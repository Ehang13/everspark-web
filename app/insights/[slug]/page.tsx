import type { Metadata } from 'next';
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import InsightsArticleContent from "@/components/insights-article-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Create a readable title from slug
  const title = slug.replace(/-/g, ' ');
  
  return {
    title: `${title} | EverSpark 트렌드 인사이트`,
    description: `EverSpark의 트렌드 인사이트 - ${title}`,
    openGraph: {
      title: `${title} | EverSpark 트렌드 인사이트`,
      description: `EverSpark의 트렌드 인사이트 - ${title}`,
      type: 'article',
    },
  };
}

export default async function InsightsArticlePage({ params }: Props) {
  const { slug } = await params;
  const preloadedArticle = await preloadQuery(api.articles.getBySlug, { slug });

  return <InsightsArticleContent preloadedArticle={preloadedArticle} />;
}
