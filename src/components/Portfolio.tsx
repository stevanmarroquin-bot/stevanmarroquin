'use client'

import { useState, useEffect, useRef } from 'react'
import { portfolioItems, type PortfolioCategory } from '@/lib/portfolio'

const PAGE_SIZE = 10

const ALL = 'todos'
type Filter = PortfolioCategory | typeof ALL

const filterOptions: { key: Filter; label: string }[] = [
  { key: ALL, label: 'Todos' },
  { key: 'neo-japones', label: 'Neo Japonés' },
  { key: 'neo-tradicional', label: 'Neo Tradicional' },
  { key: 'cover-up', label: 'Cover-ups' },
  { key: 'realismo', label: 'Realismo' },
  { key: 'arte', label: 'Arte' },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(14,14,12,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', cursor: 'zoom-out' }}
    >
      <img
        src={src}
        alt={alt}
        style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        aria-label="Cerrar"
        style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(240,237,232,0.6)', fontSize: '28px', cursor: 'pointer', lineHeight: 1, padding: '0.25rem 0.5rem' }}
      >
        ×
      </button>
    </div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const headingRef = useScrollReveal()

  const filtered = filter === ALL ? portfolioItems : portfolioItems.filter((item) => item.category === filter)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  function handleFilter(f: Filter) {
    setFilter(f)
    setVisible(PAGE_SIZE)
  }

  return (
    <section id="portfolio" className="section-line" style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headingRef} className="fade-up" style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Portfolio
            <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(240,237,232,0.12)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#f0ede8', lineHeight: 1.1 }}>
            Trabajo de tatuaje
          </h2>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {filterOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleFilter(key)}
              style={{
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.4rem 0.9rem',
                border: '0.5px solid',
                borderColor: filter === key ? 'rgba(240,237,232,0.6)' : 'rgba(240,237,232,0.12)',
                background: filter === key ? 'rgba(240,237,232,0.07)' : 'transparent',
                color: filter === key ? '#f0ede8' : 'rgba(240,237,232,0.45)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: '2px',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '6px',
          }}
        >
          {shown.map((item, i) => (
            <div
              key={item.src}
              onClick={() => setLightbox({ src: item.src, alt: item.alt })}
              style={{
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                background: '#161614',
                cursor: 'zoom-in',
                position: 'relative',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={i < 8 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.45s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>

        {/* Load more / Instagram CTA */}
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {hasMore ? (
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.8rem',
                border: '0.5px solid rgba(240,237,232,0.2)',
                background: 'transparent',
                color: 'rgba(240,237,232,0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.5)'; e.currentTarget.style.color = '#f0ede8' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.2)'; e.currentTarget.style.color = 'rgba(240,237,232,0.6)' }}
            >
              Ver más · {filtered.length - visible} restantes
            </button>
          ) : (
            <span style={{ fontSize: '10px', color: 'rgba(240,237,232,0.25)', letterSpacing: '0.1em' }}>
              {filtered.length} imágenes
            </span>
          )}

          <a
            href="https://www.instagram.com/stevanmarroquintattoo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.4)')}
          >
            @stevanmarroquintattoo →
          </a>
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
