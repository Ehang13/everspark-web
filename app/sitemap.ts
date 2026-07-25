import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

const siteUrl = 'https://www.everspark.co.kr'

// Published insight URLs live in Convex, so keep this metadata route dynamic.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/insights`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return staticRoutes
  }

  try {
    const articles = await fetchQuery(api.articles.getPublished)
    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${siteUrl}/insights/${encodeURIComponent(article.slug)}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticRoutes, ...articleRoutes]
  } catch (error) {
    console.error('Unable to load published insight articles for sitemap.', error)
    return staticRoutes
  }
}
