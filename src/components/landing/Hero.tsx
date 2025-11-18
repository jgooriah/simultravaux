import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-blue-400/20 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            <span>Estimation instantanée par IA</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Estimez vos travaux en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              quelques clics
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-gray-600 sm:text-xl">
            Obtenez une estimation précise et détaillée de vos travaux de
            rénovation grâce à notre intelligence artificielle. Gratuit,
            instantané et sans engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/simulator">
              <Button size="lg" className="w-full sm:w-auto">
                Estimer mes travaux
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Comment ça marche ?
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500" />
                <div className="h-8 w-8 rounded-full bg-orange-500" />
                <div className="h-8 w-8 rounded-full bg-green-500" />
              </div>
              <span>
                <strong className="text-gray-900">2,500+</strong> estimations
                réalisées
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>
                <strong className="text-gray-900">4.8/5</strong> satisfaction
              </span>
            </div>
            <div>
              <span>
                <strong className="text-gray-900">100%</strong> gratuit
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
