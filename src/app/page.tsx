import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Escritura from '@/components/Escritura'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'
import { getPublishedPosts } from '@/lib/posts'

export default function Home() {
  const posts = getPublishedPosts()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Portfolio />
        <Contacto />
        <Escritura posts={posts} />
      </main>
      <Footer />
    </>
  )
}
