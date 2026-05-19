export type PostCategory = 'teologia' | 'reflexion' | 'fe'

export interface Post {
  slug: string
  title: string
  date: string          // 'YYYY-MM-DD'
  category: PostCategory
  excerpt: string
  content: string       // HTML string
  readTime: number      // minutes
  published: boolean
}

export const categoryLabels: Record<PostCategory, string> = {
  teologia: 'Teología',
  reflexion: 'Reflexión',
  fe: 'Fe',
}

export const posts: Post[] = [
  {
    slug: 'placeholder',
    title: 'Próximamente',
    date: '2025-01-01',
    category: 'teologia',
    excerpt: 'Los artículos estarán disponibles pronto.',
    content: '<p>Contenido próximamente.</p>',
    readTime: 1,
    published: false,
  },
]

export function getPublishedPosts(): Post[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && p.published)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-GT', { year: 'numeric', month: 'long', day: 'numeric' })
}
