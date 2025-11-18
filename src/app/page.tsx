import { FAQ } from '@/components/landing/FAQ'
import { Features } from '@/components/landing/Features'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Testimonials } from '@/components/landing/Testimonials'
import { WorkTypeGrid } from '@/components/landing/WorkTypeGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <WorkTypeGrid />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  )
}


