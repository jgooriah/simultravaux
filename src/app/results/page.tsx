"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Share2,
  Download,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  RefreshCw,
  Edit,
  Save,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { type EstimationResult } from '@/types/questionnaire'
import { createClient } from '@/lib/supabase/client'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [estimation, setEstimation] = useState<EstimationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    console.log('🔍 [Results] Page chargée')
    
    // Vérifier si l'utilisateur est connecté
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log('👤 [Results] Utilisateur:', user ? user.email : 'Non connecté')
      setUser(user)
    })

    // Récupérer l'estimation depuis l'URL
    const estimationData = searchParams.get('data')
    console.log('📊 [Results] Données URL présentes:', !!estimationData)
    console.log('📊 [Results] Longueur données:', estimationData?.length || 0)
    
    if (estimationData) {
      try {
        console.log('🔄 [Results] Début parsing...')
        // Note: searchParams.get() décode automatiquement l'URL, pas besoin de decodeURIComponent
        const parsed = JSON.parse(estimationData)
        console.log('✅ [Results] Estimation parsée:', parsed)
        setEstimation(parsed)
      } catch (error) {
        console.error('❌ [Results] Erreur parsing estimation:', error)
        console.error('❌ [Results] Données brutes (100 premiers caractères):', estimationData?.substring(0, 100))
      }
    } else {
      console.warn('⚠️ [Results] Aucune donnée dans l\'URL')
    }
    setIsLoading(false)
  }, [searchParams])

  const handleSave = async () => {
    if (!estimation || !user) {
      // Rediriger vers la page de connexion si non connecté
      router.push(`/login?redirect=/results?data=${searchParams.get('data')}`)
      return
    }

    setIsSaving(true)

    try {
      // Sauvegarder dans Supabase via l'API
      const response = await fetch('/api/estimations/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estimation),
      })

      const result = await response.json()

      if (result.success) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)
      } else {
        alert('❌ Erreur lors de la sauvegarde: ' + result.error.message)
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error)
      alert('❌ Une erreur est survenue lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

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
          <p className="mt-2 text-gray-600">Veuillez d'abord compléter le questionnaire.</p>
          <Button asChild className="mt-6">
            <Link href="/select-work">Faire une estimation</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(estimation.metadata.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Calculer les pourcentages pour la décomposition
  const total = estimation.details.reduce((sum, item) => sum + item.montant, 0)
  const detailsWithPercentage = estimation.details.map((item) => ({
    ...item,
    pourcentage: Math.round((item.montant / total) * 100),
  }))

  const tva = Math.round(total * 0.1)
  const totalTTC = total + tva

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            {/* Titre */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">{estimation.workTypeName}</h1>
              <p className="mt-2 text-xl text-gray-600">Votre estimation de travaux</p>
              <p className="mt-1 text-sm text-gray-500">
                Estimation générée le {formattedDate}
              </p>
              {estimation.metadata.confidence === 'medium' && (
                <div className="mt-4 rounded-lg bg-blue-50 p-3">
                  <p className="text-sm text-blue-800">
                    ℹ️ Mode démo : Cette estimation est calculée automatiquement. Pour une estimation
                    IA plus précise, configurez votre clé API Anthropic.
                  </p>
                </div>
              )}
            </div>

            {/* Bloc principal d'estimation */}
            <Card className="mb-8 border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Estimation des travaux</CardTitle>
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700">
                      {estimation.metadata.confidence === 'high'
                        ? '90%'
                        : estimation.metadata.confidence === 'medium'
                          ? '70%'
                          : '50%'}{' '}
                      de confiance
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="text-center">
                  <p className="text-lg text-gray-600">Prix moyen estimé</p>
                  <p className="mt-2 text-6xl font-bold text-blue-600">
                    {estimation.estimation.moyen.toLocaleString('fr-FR')} €
                  </p>
                  <p className="mt-4 text-xl text-gray-700">
                    Fourchette de prix :{' '}
                    <span className="font-semibold">
                      {estimation.estimation.min.toLocaleString('fr-FR')} € —{' '}
                      {estimation.estimation.max.toLocaleString('fr-FR')} €
                    </span>
                  </p>

                  <div className="mt-6 rounded-lg bg-yellow-50 p-4">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="mb-1 inline h-4 w-4" /> Cette estimation est
                      indicative. Pour un devis précis, consultez un professionnel.
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <Clock className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                    <p className="text-sm text-gray-600">Durée estimée</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {estimation.delai}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <Target className="mx-auto mb-2 h-8 w-8 text-orange-600" />
                    <p className="text-sm text-gray-600">Complexité</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {estimation.metadata.confidence === 'high'
                        ? 'Facile'
                        : estimation.metadata.confidence === 'medium'
                          ? 'Moyenne'
                          : 'Complexe'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                    <p className="text-sm text-gray-600">Niveau de confiance</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {estimation.metadata.confidence === 'high'
                        ? 'Élevé'
                        : estimation.metadata.confidence === 'medium'
                          ? 'Moyen'
                          : 'Faible'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Décomposition des coûts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Décomposition des coûts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detailsWithPercentage.map((detail, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{detail.poste}</p>
                        <p className="text-sm text-gray-600">{detail.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          {detail.montant.toLocaleString('fr-FR')} €
                        </p>
                        <p className="text-sm text-gray-500">{detail.pourcentage}%</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between border-t-2 pt-4">
                    <p className="font-semibold text-gray-900">TVA (10%)</p>
                    <p className="text-xl font-bold text-gray-900">
                      {tva.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t-2 bg-blue-50 p-4">
                    <p className="text-xl font-bold text-gray-900">Total TTC</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {totalTTC.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facteurs influençant le prix */}
            {estimation.facteurs.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                    Facteurs influençant le prix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {estimation.facteurs.map((facteur, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                        <span className="text-gray-700">{facteur}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Conseils et recommandations */}
            {estimation.conseils.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Conseils et recommandations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {estimation.conseils.map((conseil, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4"
                      >
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <p className="text-gray-700">{conseil}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Aides financières */}
            {estimation.aides && estimation.aides.length > 0 && (
              <Card className="mb-8 border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-900">
                    Aides financières disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {estimation.aides.map((aide, index) => (
                      <div key={index} className="rounded-lg bg-white p-4">
                        <h3 className="font-semibold text-green-900">{aide.nom}</h3>
                        <p className="mt-1 text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Montant: {aide.montant}
                          </span>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">{aide.conditions}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sauvegarde de l'estimation - Uniquement si non connecté */}
            {!user && (
              <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl">Sauvegardez votre estimation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-700">
                    Créez un compte gratuit pour sauvegarder vos estimations, les comparer et y
                    accéder à tout moment.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="flex-1">
                      <Link href="/signup">Créer un compte gratuit</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1">
                      <Link href="/login">Se connecter</Link>
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Inscription rapide • Aucune carte bancaire requise
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-4">
              {/* Bouton Sauvegarder */}
              <Button
                onClick={handleSave}
                size="lg"
                className="w-full"
                disabled={isSaving || isSaved}
                variant={isSaved ? 'default' : 'default'}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sauvegarde en cours...
                  </>
                ) : isSaved ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Estimation sauvegardée !
                  </>
                ) : user ? (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Sauvegarder mon estimation
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Se connecter pour sauvegarder
                  </>
                )}
              </Button>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/select-work">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Nouvelle estimation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href={`/simulator?workType=${estimation.workTypeId}`}>
                    <Edit className="mr-2 h-5 w-5" />
                    Modifier mes réponses
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mentions légales */}
            <div className="mt-8 rounded-lg bg-gray-100 p-6 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Important :</strong> Cette estimation est indicative et basée sur des
                moyennes de marché. Pour un devis précis, consultez un professionnel.
              </p>
              <p>
                Les prix peuvent varier selon votre localisation, la période de l'année et la
                disponibilité des artisans.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

