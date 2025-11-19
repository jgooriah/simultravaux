"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Sparkles, Zap, Brain, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'

export default function EstimationIAPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [credits, setCredits] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      
      if (user) {
        fetch('/api/ai/credits')
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              setCredits(result.data)
            }
          })
          .catch((err) => console.error('Erreur chargement crédits:', err))
          .finally(() => setIsLoading(false))
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              Nouveau : Estimation IA Premium
            </div>
            
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Estimation IA Ultra-Précise
            </h1>
            
            <p className="mb-8 text-xl text-gray-600">
              Débloquez la puissance de l'intelligence artificielle Claude pour obtenir
              des estimations détaillées avec 3 scénarios d'optimisation personnalisés.
            </p>

            {user ? (
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={() => router.push('/select-work')}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Commencer une estimation IA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {!isLoading && credits && (
                  <p className="text-sm text-gray-600">
                    Vous avez {credits.credits_remaining} crédits IA restants
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={() => router.push('/signup')}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Créer un compte gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => router.push('/login')}
                  variant="outline"
                  size="lg"
                  className="text-lg"
                >
                  Se connecter
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Avantages */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Pourquoi choisir l'estimation IA ?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 border-purple-200 bg-white shadow-lg">
                <CardHeader>
                  <Brain className="mb-4 h-12 w-12 text-purple-600" />
                  <CardTitle>Analyse Approfondie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    L'IA Claude analyse en profondeur votre projet et prend en compte
                    des dizaines de facteurs pour une estimation ultra-précise.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-white shadow-lg">
                <CardHeader>
                  <Zap className="mb-4 h-12 w-12 text-blue-600" />
                  <CardTitle>3 Scénarios Personnalisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Obtenez 3 scénarios d'estimation adaptés à votre budget :
                    Économique, Standard, et Premium.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white shadow-lg">
                <CardHeader>
                  <TrendingDown className="mb-4 h-12 w-12 text-green-600" />
                  <CardTitle>Optimisations Détectées</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    L'IA identifie automatiquement des opportunités pour réduire
                    les coûts sans compromettre la qualité.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparaison */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Mode Démo vs Mode IA Premium
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Mode Démo */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-2xl">Mode Démo</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">Gratuit</div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gray-600" />
                      <span>Estimation instantanée</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gray-600" />
                      <span>Fourchette de prix basique</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gray-600" />
                      <span>Décomposition des coûts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gray-600" />
                      <span>Conseils généraux</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mode IA */}
              <Card className="border-2 border-purple-400 shadow-xl">
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-xs text-white">
                  PREMIUM
                </div>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6" />
                    Mode IA Premium
                  </CardTitle>
                  <div className="text-3xl font-bold text-purple-600">5 crédits</div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="font-medium">Analyse IA approfondie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="font-medium">3 scénarios personnalisés</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="font-medium">Optimisations détectées</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="font-medium">Conseils d'experts IA</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="font-medium">Recommandations de matériaux</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="font-medium">Calendrier optimisé</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-center text-white shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold">
              Prêt à obtenir votre estimation IA ?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Rejoignez des milliers d'utilisateurs qui font confiance à notre IA
            </p>
            {user ? (
              <Button
                onClick={() => router.push('/select-work')}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Commencer maintenant
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/signup')}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Créer un compte gratuit
              </Button>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

