'use client'

import { useState, useRef, useEffect } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(240,237,232,0.04)',
  border: '0.5px solid rgba(240,237,232,0.12)',
  color: '#f0ede8',
  fontSize: '13px',
  padding: '0.85rem 1rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
  borderRadius: '2px',
}

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(240,237,232,0.45)',
  display: 'block',
  marginBottom: '0.45rem',
}

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

export default function Contacto() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const headingRef = useScrollReveal()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(240,237,232,0.4)'
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(240,237,232,0.12)'
  }

  return (
    <section id="contacto" className="section-line" style={{ padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 6vw, 5rem)', alignItems: 'start' }}>

        {/* Left: Info */}
        <div ref={headingRef} className="fade-up">
          <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Contacto
            <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(240,237,232,0.12)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#f0ede8', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Agenda tu cita
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '360px' }}>
            ¿Tienes un proyecto de tatuaje en mente? Cuéntame la idea, el estilo que te interesa y el área del cuerpo. Respondo lo antes posible.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://www.instagram.com/stevanmarroquintattoo" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.45)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.45)')}>
              <span style={{ fontSize: '14px' }}>📷</span> @stevanmarroquintattoo
            </a>
            <a href="https://soulsanchor.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.45)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.45)')}>
              <span style={{ fontSize: '14px' }}>🏠</span> Soul&apos;s Anchor Studio
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          {status === 'sent' ? (
            <div style={{ padding: '2.5rem', background: 'rgba(240,237,232,0.03)', border: '0.5px solid rgba(240,237,232,0.08)', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '0.5px solid rgba(240,237,232,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '16px' }}>✓</div>
              <p style={{ fontSize: '14px', color: '#f0ede8', marginBottom: '0.5rem', fontWeight: 500 }}>¡Mensaje enviado!</p>
              <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.6 }}>
                Te estaré contactando lo antes posible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Row: Nombre + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input type="text" name="nombre" required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" name="email" required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label style={labelStyle}>Tipo de consulta</label>
                <select name="tipo" required style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focusStyle} onBlur={blurStyle}>
                  <option value="" disabled selected>Selecciona...</option>
                  <option value="tatuaje">Consulta de tatuaje</option>
                  <option value="cover-up">Cover-up</option>
                  <option value="escritura">Sobre escritura</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label style={labelStyle}>Mensaje</label>
                <textarea
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="Cuéntame tu idea..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              {/* Referencias */}
              <div>
                <label style={labelStyle}>Imágenes de referencia (opcional)</label>
                <input
                  type="file"
                  name="referencias"
                  accept="image/*"
                  multiple
                  style={{ ...inputStyle, padding: '0.65rem 1rem', cursor: 'pointer', fontSize: '12px', color: 'rgba(240,237,232,0.55)' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ fontSize: '12px', color: '#e88', letterSpacing: '0.03em' }}>
                  Hubo un error al enviar. Intenta nuevamente o escríbeme directamente por Instagram.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0e0e0c', background: status === 'sending' ? 'rgba(240,237,232,0.6)' : '#f0ede8', padding: '0.85rem', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer', fontFamily: 'inherit', fontWeight: 600, transition: 'opacity 0.2s', marginTop: '0.25rem' }}
                onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '0.82' }}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
