import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>

          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">À propos de SimuTravaux</h1>
            
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                SimuTravaux est une plateforme innovante qui vous permet d'estimer rapidement
                et précisément le coût de vos travaux de rénovation grâce à l'intelligence
                artificielle.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900">Notre mission</h2>
              <p>
                Nous croyons que chaque projet de rénovation mérite une estimation claire et
                transparente. Notre mission est de vous fournir les outils nécessaires pour
                prendre des décisions éclairées concernant vos travaux.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900">Comment ça marche ?</h2>
              <p>
                Notre algorithme d'intelligence artificielle analyse vos réponses et les compare
                avec des milliers de projets similaires pour vous fournir une estimation précise
                basée sur les prix réels du marché français.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900">100% gratuit</h2>
              <p>
                SimuTravaux est entièrement gratuit et le restera toujours. Aucune carte
                bancaire n'est requise pour utiliser notre service.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

