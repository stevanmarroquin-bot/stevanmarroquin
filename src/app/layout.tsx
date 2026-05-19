import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stevanmarroquin.com'),
  title: 'Stevan Marroquín | Tatuador & Escritor de Teología',
  description:
    'Tatuador especializado en Neo Japonés, Neo Tradicional y Cover-ups. Escritor de teología. Guatemala City.',
  keywords: 'tatuaje, tattoo, guatemala, neo japonés, neo tradicional, cover-up, teología, stevan marroquin',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Stevan Marroquín | Tatuador & Escritor de Teología',
    description: 'Tatuador especializado en Neo Japonés, Neo Tradicional y Cover-ups. Escritor de teología. Guatemala City.',
    url: 'https://stevanmarroquin.com',
    siteName: 'Stevan Marroquín',
    locale: 'es_GT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stevan Marroquín | Tatuador & Escritor de Teología',
    description: 'Tatuador especializado en Neo Japonés, Neo Tradicional y Cover-ups. Escritor de teología. Guatemala City.',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stevan Marroquín',
  url: 'https://stevanmarroquin.com',
  description: 'Tatuador especializado en Neo Japonés, Neo Tradicional y Cover-ups. Escritor de teología en Guatemala City.',
  jobTitle: ['Tattoo Artist', 'Theology Writer'],
  worksFor: {
    '@type': 'TattooParlor',
    name: "Soul's Anchor Tattoo Studio",
    url: 'https://soulsanchor.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de Guatemala',
    addressCountry: 'GT',
  },
  sameAs: [
    'https://www.instagram.com/stevanmarroquintattoo',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
