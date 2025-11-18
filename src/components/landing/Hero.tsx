import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const highlights = [
  { label: 'Estimation immédiate', value: '< 3 minutes' },
  { label: 'Basé sur le marché 2025', value: 'Données France' },
  { label: 'Types de travaux couverts', value: '15+' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 sm:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-blue-400/20 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-blue-700">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1">
              <Sparkles className="h-4 w-4" />
              100% Gratuit • Sans engagement
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1">
              Estimation validée par IA
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-[70px]">
            Estimez vos travaux en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              moins de 3 minutes
            </span>
          </h1>

          <p className="mb-10 text-lg text-gray-600 sm:text-xl">
            Obtenez une estimation précise, détaillée et basée sur les prix réels
            du marché français. Simple, rapide et totalement gratuit pour tous les
            projets de rénovation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/simulator">
              <Button size="lg" className="w-full sm:w-auto">
                Commencer mon estimation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="#comment-ca-marche">Comment ça marche ?</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/60 bg-white/60 p-6 text-center shadow-sm backdrop-blur"
              >
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
