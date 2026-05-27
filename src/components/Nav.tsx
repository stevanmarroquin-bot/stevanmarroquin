'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'Portfolio', anchor: '#portfolio' },
  { label: 'Contacto', anchor: '#contacto' },
  { label: 'Teología', anchor: '#escritura' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(14,14,12,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(240,237,232,0.08)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.2rem, 4vw, 3rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

        {/* Logo / Name */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span style={{ fontSize: '13px', letterSpacing: '0.12em', color: '#f0ede8', fontWeight: 500 }}>
            Stevan Marroquín
          </span>
          <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)' }}>
            Artista · Comunicador
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
          {links.map((l) => (
            <a key={l.label} href={l.anchor}
              style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.5)')}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#contacto" className="hidden md:block"
          style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0e0e0c', background: '#f0ede8', padding: '0.55rem 1.3rem', textDecoration: 'none', transition: 'opacity 0.2s', fontWeight: 600 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
          Agendar cita
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#f0ede8', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#f0ede8', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#f0ede8', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(14,14,12,0.99)', borderTop: '0.5px solid rgba(240,237,232,0.08)' }}>
          {links.map((l) => (
            <a key={l.label} href={l.anchor} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.65)', textDecoration: 'none', padding: '1.1rem 2rem', borderBottom: '0.5px solid rgba(240,237,232,0.05)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ padding: '1rem 2rem 1.5rem' }}>
            <a href="#contacto" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0e0e0c', background: '#f0ede8', textDecoration: 'none', padding: '0.85rem', textAlign: 'center', fontWeight: 600 }}>
              Agendar cita
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
