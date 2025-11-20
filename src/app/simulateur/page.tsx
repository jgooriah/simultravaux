"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bot, Camera, FileText, ArrowRight, Sparkles, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export default function SimulateurPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleAnalysePhoto = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/analyse-photo')
    } else {
      router.push('/analyse-photo')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="border-b border-white/20 bg-white/80 shadow-lg backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
              Choisissez votre mode d'estimation
            </h1>
            <p className="text-xl text-gray-600">
              3 façons d'obtenir une estimation précise pour vos travaux de rénovation
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Option 1 : Chat IA */}
          <Card className="group relative overflow-hidden border-2 border-purple-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-purple-400 hover:shadow-2xl">
            {/* Badge NOUVEAU */}
            <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-xs font-bold text-white shadow-md">
              NOUVEAU
            </div>

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100 shadow-lg transition-transform group-hover:scale-110">
                <Bot className="h-12 w-12 text-purple-600" />
              </div>
            </div>

            {/* Content */}
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              Chat IA
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Conversez naturellement avec notre IA pour obtenir une estimation personnalisée en quelques minutes
            </p>

            {/* Features */}
            <ul className="mb-6 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Estimation en temps réel
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Conversation naturelle
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Gratuit et sans inscription
              </li>
            </ul>

            {/* CTA */}
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Link href="/chat">
                <Bot className="mr-2 h-5 w-5" />
                Démarrer le chat IA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          {/* Option 2 : Analyse Photo IA */}
          <Card className="group relative overflow-hidden border-2 border-green-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-green-400 hover:shadow-2xl">
            {/* Badge Connexion requise */}
            {!isAuthenticated && (
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 shadow-md">
                <Lock className="h-3 w-3" />
                Connexion requise
              </div>
            )}

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg transition-transform group-hover:scale-110">
                <Camera className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {/* Content */}
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              Analyse Photo IA
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Uploadez une photo de votre espace et obtenez une analyse détaillée avec estimation de budget
            </p>

            {/* Features */}
            <ul className="mb-6 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-600" />
                Analyse visuelle IA
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-600" />
                Détection automatique
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-600" />
                Budget précis
              </li>
            </ul>

            {/* CTA */}
            <Button 
              onClick={handleAnalysePhoto}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Camera className="mr-2 h-5 w-5" />
              {isLoading ? 'Chargement...' : 'Analyser une photo'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {!isAuthenticated && !isLoading && (
              <p className="mt-2 text-center text-xs text-orange-600">
                Créez un compte gratuit pour accéder à cette fonctionnalité
              </p>
            )}
          </Card>

          {/* Option 3 : Simulateur Manuel */}
          <Card className="group relative overflow-hidden border-2 border-blue-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-blue-400 hover:shadow-2xl">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg transition-transform group-hover:scale-110">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            {/* Content */}
            <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
              Simulateur Manuel
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Répondez à un questionnaire détaillé pour obtenir une estimation personnalisée et précise
            </p>

            {/* Features */}
            <ul className="mb-6 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Questionnaire guidé
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Estimation détaillée
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Gratuit et rapide
              </li>
            </ul>

            {/* CTA */}
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/select-work">
                <FileText className="mr-2 h-5 w-5" />
                Commencer le simulateur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Quelle option choisir ?
            </h3>
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div>
                <h4 className="mb-2 font-semibold text-purple-600">Chat IA</h4>
                <p className="text-sm text-gray-600">
                  Parfait si vous voulez une estimation rapide en discutant naturellement avec notre IA
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-green-600">Analyse Photo</h4>
                <p className="text-sm text-gray-600">
                  Idéal si vous avez des photos de votre espace et voulez une analyse visuelle précise
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-blue-600">Simulateur Manuel</h4>
                <p className="text-sm text-gray-600">
                  Recommandé si vous connaissez les détails de votre projet et voulez un devis complet
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

