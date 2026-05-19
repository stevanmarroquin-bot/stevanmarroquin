'use client'

import { useEffect, useRef } from 'react'
import type { Post } from '@/lib/posts'
import { categoryLabels, formatDate } from '@/lib/posts'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function ArticleCard({ post }: { post: Post; index: number }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block', padding: '1.75rem 0', borderBottom: '0.5px solid rgba(240,237,232,0.07)', transition: 'opacity 0.2s' }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          {/* Category + Date */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', background: 'rgba(240,237,232,0.05)', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
              {categoryLabels[post.category]}
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(240,237,232,0.35)', letterSpacing: '0.05em' }}>
              {formatDate(post.date)}
            </span>
          </div>

          {/* Title */}
          <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', fontWeight: 500, color: '#f0ede8', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '0.6rem' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.65, maxWidth: '540px' }}>
            {post.excerpt}
          </p>
        </div>

        {/* Read info */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', paddingTop: '0.25rem' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)' }}>
            {post.readTime} min
          </span>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Leer →
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Escritura({ posts }: { posts: Post[] }) {
  const headingRef = useScrollReveal()

  return (
    <section id="escritura" className="section-line" style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headingRef} className="fade-up" style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Escritura
            <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(240,237,232,0.12)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#f0ede8', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Teología & reflexión
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(240,237,232,0.45)', maxWidth: '480px', lineHeight: 1.65 }}>
            Artículos sobre fe, teología y la intersección entre el arte y lo sagrado.
          </p>
        </div>

        {/* Articles */}
        {posts.length > 0 ? (
          <div>
            {posts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div style={{ padding: '3rem 0', textAlign: 'center' }}>
            <div style={{ width: '1px', height: '48px', background: 'rgba(240,237,232,0.12)', margin: '0 auto 1.5rem' }} />
            <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.35)', letterSpacing: '0.05em' }}>
              Artículos próximamente.
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.25)', marginTop: '0.5rem' }}>
              Mientras tanto, puedes seguir el trabajo en Instagram.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
