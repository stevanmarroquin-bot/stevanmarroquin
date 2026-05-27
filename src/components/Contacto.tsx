'use client'

import { useState, useRef, useEffect } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(240,237,232,0.04)',
  border: '0.5px solid rgba(240,237,232,0.12)',
  color: '#f0ede8',
  fontSize: '13px',
  padding: '0.75rem 0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
  borderRadius: '2px',
}

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(240,237,232,0.4)',
  display: 'block',
  marginBottom: '0.4rem',
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function Contacto() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const headingRef = useScrollReveal()

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(240,237,232,0.4)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(240,237,232,0.12)'
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
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
            ¿Tienes un proyecto de tatuaje en mente? Cuéntame la idea, el estilo y el área. Te respondo lo antes posible.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <a href="https://www.instagram.com/stevanmarroquintattoo" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.4)')}>
              @stevanmarroquintattoo
            </a>
            <a href="https://soulsanchor.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.4)')}>
              Soul&apos;s Anchor Tattoo Studio
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ background: 'rgba(240,237,232,0.02)', border: '0.5px solid rgba(240,237,232,0.08)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '3px' }}>

          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: '1.5rem' }}>
            Solicitud de cita · Tatuaje
          </p>

          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '0.5px solid rgba(240,237,232,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '16px' }}>✓</div>
              <p style={{ fontSize: '14px', color: '#f0ede8', marginBottom: '0.5rem', fontWeight: 500 }}>¡Solicitud enviada!</p>
              <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.45)', lineHeight: 1.6 }}>
                Te estaré contactando lo antes posible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Nombre + WhatsApp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Nombre completo</label>
                  <input type="text" name="nombre" placeholder="Tu nombre" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp</label>
                  <input type="text" name="whatsapp" placeholder="+502 ..." required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Correo */}
              <div>
                <label style={labelStyle}>Correo electrónico</label>
                <input type="email" name="correo" placeholder="tu@email.com" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Descripción */}
              <div>
                <label style={labelStyle}>Describe tu tatuaje</label>
                <textarea name="descripcion" placeholder="Tu idea, referencias, etc." rows={3} style={{ ...inputStyle, resize: 'none' }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Estilo + Área */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Estilo que buscas</label>
                  <input type="text" name="estilo" placeholder="Neo Japonés, Blackwork..." style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelStyle}>Área del tatuaje</label>
                  <input type="text" name="area" placeholder="Brazo, espalda, pierna..." style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Tamaño */}
              <div>
                <label style={labelStyle}>Tamaño aproximado</label>
                <input type="text" name="tamano" placeholder="Sé lo más específico posible." required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Referencias */}
              <div>
                <label style={labelStyle}>Imágenes de referencia</label>
                <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.32)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                  Adjunta referencias, fotos del área, o fotos del tatuaje que deseas cubrir. Si vas a enviar una foto del área, asegúrate que salga en una posición natural, párate recto y pídele favor a alguien que te tome la foto.
                </p>
                <input
                  type="file"
                  name="referencias"
                  accept="image/*"
                  multiple
                  style={{ ...inputStyle, padding: '0.6rem 0.9rem', cursor: 'pointer', fontSize: '12px', color: 'rgba(240,237,232,0.45)' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ fontSize: '12px', color: '#e88', letterSpacing: '0.03em' }}>
                  Hubo un error al enviar. Intenta de nuevo o escríbeme por Instagram.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0e0e0c', background: status === 'sending' ? 'rgba(240,237,232,0.6)' : '#f0ede8', padding: '0.85rem', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer', fontFamily: 'inherit', fontWeight: 600, transition: 'opacity 0.2s', marginTop: '0.25rem', borderRadius: '2px' }}
                onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '0.82' }}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
              </button>

              <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.2)', textAlign: 'center', marginTop: '0.25rem', letterSpacing: '0.03em' }}>
                También puedes visitarme en Soul&apos;s Anchor · Lun–Sáb · 10am a 7pm · Zona 10
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
