import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getPublishedPosts, formatDate, categoryLabels } from '@/lib/posts'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Stevan Marroquín`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '64px' }}>
        {/* Article header */}
        <div style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem) 2rem', maxWidth: '740px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <a href="/#escritura" style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.4)')}>
              ← Escritura
            </a>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', background: 'rgba(240,237,232,0.05)', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
              {categoryLabels[post.category]}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#f0ede8', lineHeight: 1.15, marginBottom: '1rem' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '12px', color: 'rgba(240,237,232,0.4)' }}>{formatDate(post.date)}</span>
            <span style={{ fontSize: '12px', color: 'rgba(240,237,232,0.3)' }}>·</span>
            <span style={{ fontSize: '12px', color: 'rgba(240,237,232,0.4)' }}>{post.readTime} min de lectura</span>
          </div>

          <div style={{ height: '0.5px', background: 'rgba(240,237,232,0.1)' }} />
        </div>

        {/* Article body */}
        <article
          style={{ padding: '0 clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem)', maxWidth: '740px', margin: '0 auto' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Inline article styles via a style tag */}
        <style>{`
          article p { font-size: 16px; line-height: 1.8; color: rgba(240,237,232,0.75); margin-bottom: 1.4em; }
          article h2 { font-size: 1.4rem; font-weight: 600; color: #f0ede8; margin: 2.5em 0 0.75em; letter-spacing: -0.01em; }
          article h3 { font-size: 1.15rem; font-weight: 500; color: #f0ede8; margin: 2em 0 0.6em; }
          article blockquote { border-left: 2px solid rgba(240,237,232,0.2); padding-left: 1.25rem; margin: 1.75em 0; font-style: italic; color: rgba(240,237,232,0.55); }
          article a { color: rgba(240,237,232,0.7); }
          article a:hover { color: #f0ede8; }
          article strong { color: #f0ede8; font-weight: 600; }
          article em { font-style: italic; }
          article ul, article ol { color: rgba(240,237,232,0.75); font-size: 16px; line-height: 1.8; margin-bottom: 1.4em; padding-left: 1.5em; }
          article li { margin-bottom: 0.4em; }
          article hr { border: none; border-top: 0.5px solid rgba(240,237,232,0.1); margin: 2.5em 0; }
        `}</style>
      </main>
      <Footer />
    </>
  )
}
