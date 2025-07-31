import { MetadataRoute } from 'next'
import termsData from '@/data/terms.json'
import { Term } from '@/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  const terms = termsData as Term[]
  
  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // 词汇页面
  const termPages = terms.map((term) => ({
    url: `${baseUrl}/terms/${term.slug}`,
    lastModified: new Date(term.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...termPages]
} 