"use client"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Sparkles,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Save,
  Download,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'

interface AIEstimation {
  id: string
  workTypeName: string
  estimation: {
    min: number
    max: number
    moyen: number
  }
  scenarios: Array<{
    name: string
    description: string
    totalCost: number
    duration: string
    pros: string[]
    cons: string[]
  }>
  optimizations: Array<{
    category: string
    originalCost: number
    optimizedCost: number
    savings: number
    explanation: string
  }>
  aiAnalysis: {
    complexity: 'low' | 'medium' | 'high'
    riskFactors: string[]
    recommendations: string[]
    timeline: string
  }
  details: Array<{
    poste: string
    montant: number
    description: string
  }>
  facteurs: string[]
  conseils: string[]
  aides: Array<{
    nom: string
    montant: string
    conditions: string
  }>
  delai: string
}

export default function AIResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [estimation, setEstimation] = useState<AIEstimation | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<number>(1) // Default: Standard
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const estimationData = searchParams.get('data')
    
    if (estimationData) {
      try {
        const parsed = JSON.parse(estimationData)
        setEstimation(parsed)
      } catch (error) {
        console.error('Erreur parsing:', error)
      }
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!estimation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Aucune estimation trouvée</h1>
          <Button asChild className="mt-6">
            <Link href="/select-work">Faire une estimation</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentScenario = estimation.scenarios[selectedScenario]
  const totalSavings = estimation.optimizations.reduce((sum, opt) => sum + opt.savings, 0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-6xl">
            {/* Badge IA Premium */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 text-white">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Estimation IA Premium</span>
                <Zap className="h-5 w-5" />
              </div>
            </div>

            {/* Titre */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900">{estimation.workTypeName}</h1>
              <p className="mt-2 text-xl text-gray-600">Analyse complète par Intelligence Artificielle</p>
            </div>

            {/* Prix principal */}
            <Card className="mb-8 border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-2xl">Estimation Globale</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="text-center">
                  <p className="text-lg text-gray-600">Prix moyen estimé</p>
                  <p className="mt-2 text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {estimation.estimation.moyen.toLocaleString('fr-FR')} €
                  </p>
                  <p className="mt-4 text-xl text-gray-700">
                    Fourchette : {estimation.estimation.min.toLocaleString('fr-FR')} € -{' '}
                    {estimation.estimation.max.toLocaleString('fr-FR')} €
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-blue-50 p-4 text-center">
                    <Clock className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                    <p className="text-sm text-gray-600">Durée estimée</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{estimation.delai}</p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4 text-center">
                    <Target className="mx-auto mb-2 h-8 w-8 text-orange-600" />
                    <p className="text-sm text-gray-600">Complexité</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {estimation.aiAnalysis.complexity === 'low'
                        ? 'Facile'
                        : estimation.aiAnalysis.complexity === 'medium'
                          ? 'Moyenne'
                          : 'Complexe'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <TrendingDown className="mx-auto mb-2 h-8 w-8 text-green-600" />
                    <p className="text-sm text-gray-600">Économies possibles</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {totalSavings.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3 Scénarios */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">3 Scénarios Personnalisés</CardTitle>
                <p className="text-sm text-gray-600">Sélectionnez le scénario qui vous correspond</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {estimation.scenarios.map((scenario, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedScenario(index)}
                      className={`rounded-lg border-2 p-6 text-left transition-all ${
                        selectedScenario === index
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-900">{scenario.name}</h3>
                      <p className="mt-2 text-sm text-gray-600">{scenario.description}</p>
                      <p className="mt-4 text-3xl font-bold text-blue-600">
                        {scenario.totalCost.toLocaleString('fr-FR')} €
                      </p>
                      <p className="mt-2 text-sm text-gray-500">Durée : {scenario.duration}</p>
                    </button>
                  ))}
                </div>

                {/* Détails du scénario sélectionné */}
                <div className="mt-8 rounded-lg bg-gray-50 p-6">
                  <h4 className="mb-4 text-lg font-bold text-gray-900">
                    Détails : {currentScenario.name}
                  </h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h5 className="mb-2 flex items-center gap-2 font-semibold text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        Points forts
                      </h5>
                      <ul className="space-y-1">
                        {currentScenario.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-gray-700">
                            • {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="mb-2 flex items-center gap-2 font-semibold text-orange-700">
                        <AlertTriangle className="h-5 w-5" />
                        Points d'attention
                      </h5>
                      <ul className="space-y-1">
                        {currentScenario.cons.map((con, i) => (
                          <li key={i} className="text-sm text-gray-700">
                            • {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimisations IA */}
            {estimation.optimizations.length > 0 && (
              <Card className="mb-8 border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <TrendingDown className="h-6 w-6 text-green-600" />
                    Optimisations Détectées par l'IA
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Économisez jusqu'à {totalSavings.toLocaleString('fr-FR')} €
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {estimation.optimizations.map((opt, index) => (
                      <div key={index} className="rounded-lg bg-white p-4 shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{opt.category}</h4>
                            <p className="mt-1 text-sm text-gray-600">{opt.explanation}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-sm text-gray-500 line-through">
                              {opt.originalCost.toLocaleString('fr-FR')} €
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              {opt.optimizedCost.toLocaleString('fr-FR')} €
                            </div>
                            <div className="mt-1 text-xs font-semibold text-green-700">
                              -{opt.savings.toLocaleString('fr-FR')} € (
                              {Math.round((opt.savings / opt.originalCost) * 100)}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommandations IA */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  Recommandations IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {estimation.aiAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Facteurs de risque */}
            {estimation.aiAnalysis.riskFactors.length > 0 && (
              <Card className="mb-8 border-2 border-yellow-200">
                <CardHeader className="bg-yellow-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    Points de Vigilance
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {estimation.aiAnalysis.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-600" />
                        <span className="text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link href="/dashboard">
                  <Save className="mr-2 h-5 w-5" />
                  Sauvegarder (déjà fait)
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link href="/select-work">
                  Nouvelle estimation
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

