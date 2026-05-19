import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://stevanmarroquin.com'
  const posts = getPublishedPosts()

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
