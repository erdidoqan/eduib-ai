import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Practice } from "@/components/practice"
import { Features } from "@/components/features"
import { Join } from "@/components/join"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
      <Practice />
      <Features />
      <Join />
      <Footer />
    </main>
  )
}
