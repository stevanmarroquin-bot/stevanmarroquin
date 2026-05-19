'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ padding: '2rem clamp(1.5rem, 5vw, 5rem)', borderTop: '0.5px solid rgba(240,237,232,0.07)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '11px', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.04em' }}>
          © {year} Stevan Marroquín
        </span>

        <div style={{ display: 'flex', gap: '1.75rem' }}>
          <a href="https://www.instagram.com/stevanmarroquintattoo" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.3)')}>
            Instagram
          </a>
          <a href="https://soulsanchor.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.3)')}>
            Soul&apos;s Anchor
          </a>
        </div>

        <span style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.08em' }}>
          Ciudad de Guatemala
        </span>
      </div>
    </footer>
  )
}
