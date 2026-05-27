'use client'

import { useState, useEffect } from 'react'
import { heroImages } from '@/lib/portfolio'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length)
        setFading(false)
      }, 600)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background image slideshow */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transition: 'opacity 0.8s ease',
            background: '#0e0e0c',
          }}
        >
          <img
            src={src}
            alt="Stevan Marroquín"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.55,
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(14,14,12,0.98) 0%, rgba(14,14,12,0.5) 50%, rgba(14,14,12,0.15) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.45)', marginBottom: '1.5rem' }}>
          Guatemala City
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(2.6rem, 8vw, 6.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#f0ede8',
            marginBottom: '0.6rem',
          }}
        >
          Hola, soy Stevan
        </h1>

        {/* Divider */}
        <div style={{ width: '48px', height: '0.5px', background: 'rgba(240,237,232,0.3)', marginBottom: '0.8rem' }} />

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(13px, 1.8vw, 15px)',
            color: 'rgba(240,237,232,0.6)',
            letterSpacing: '0.02em',
            marginBottom: '2rem',
            maxWidth: '460px',
            lineHeight: 1.55,
          }}
        >
          Artista tatuador especializado en Neo Japonés, Neo Tradicional y Cover-ups — Escritor de teología.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#portfolio"
            style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0e0e0c', background: '#f0ede8', padding: '0.75rem 1.8rem', textDecoration: 'none', transition: 'opacity 0.2s', fontWeight: 600 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            Ver portfolio
          </a>
          <a href="#escritura"
            style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.7)', background: 'transparent', padding: '0.75rem 1.8rem', textDecoration: 'none', border: '0.5px solid rgba(240,237,232,0.25)', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f0ede8'; e.currentTarget.style.borderColor = 'rgba(240,237,232,0.55)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,237,232,0.7)'; e.currentTarget.style.borderColor = 'rgba(240,237,232,0.25)' }}>
            Escritura
          </a>
        </div>

        {/* Slide indicators */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '2.5rem' }}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false) }, 300) }}
              aria-label={`Imagen ${i + 1}`}
              style={{
                width: i === current ? '24px' : '6px',
                height: '2px',
                background: i === current ? '#f0ede8' : 'rgba(240,237,232,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
