"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'

interface SharedEstimation {
  id: string
  work_type_name: string
  estimation_min: number
  estimation_max: number
  estimation_moyen: number
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
  complexity: string
  confidence: string
  created_at: string
}

export default function SharedEstimationPage() {
  const params = useParams()
  const router = useRouter()
  const shareId = params.shareId as string
  const [estimation, setEstimation] = useState<SharedEstimation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSharedEstimation = async () => {
      try {
        const supabase = createClient()

        // Récupérer le partage et l'estimation
        const { data: share, error: shareError } = await supabase
          .from('shared_estimations')
          .select('*')
          .eq('share_id', shareId)
          .single()

        if (shareError || !share) {
          setError('Lien de partage introuvable ou expiré')
          setIsLoading(false)
          return
        }

        // Vérifier l'expiration
        if (share.expires_at && new Date(share.expires_at) < new Date()) {
          setError('Ce lien de partage a expiré')
          setIsLoading(false)
          return
        }

        // Récupérer l'estimation
        const { data: est, error: estError } = await supabase
          .from('estimations')
          .select('*')
          .eq('id', share.estimation_id)
          .single()

        if (estError || !est) {
          setError('Estimation introuvable')
          setIsLoading(false)
          return
        }

        setEstimation(est)

        // Incrémenter le compteur de vues et mettre à jour last_viewed_at
        await supabase
          .from('shared_estimations')
          .update({
            view_count: (share.view_count || 0) + 1,
            last_viewed_at: new Date().toISOString(),
          })
          .eq('share_id', shareId)
      } catch (err) {
        console.error('Erreur chargement estimation partagée:', err)
        setError('Une erreur est survenue')
      } finally {
        setIsLoading(false)
      }
    }

    loadSharedEstimation()
  }, [shareId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Chargement de l'estimation partagée...</p>
        </div>
      </div>
    )
  }

  if (error || !estimation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{error || 'Estimation non trouvée'}</h1>
          <p className="mt-2 text-gray-600">
            Le lien de partage est peut-être invalide ou expiré.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(estimation.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const total = estimation.details.reduce((sum, item) => sum + item.montant, 0)
  const tva = Math.round(total * 0.1)
  const totalTTC = total + tva

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            {/* Badge "Estimation partagée" */}
            <div className="mb-6 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                📤 Estimation partagée
              </span>
            </div>

            {/* Titre */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900">{estimation.work_type_name}</h1>
              <p className="mt-2 text-xl text-gray-600">Estimation de travaux</p>
              <p className="mt-1 text-sm text-gray-500">
                Générée le {formattedDate}
              </p>
            </div>

            {/* Bloc principal d'estimation */}
            <Card className="mb-8 border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Estimation des travaux</CardTitle>
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700">
                      {estimation.confidence === 'high'
                        ? '90%'
                        : estimation.confidence === 'medium'
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
                    {estimation.estimation_moyen.toLocaleString('fr-FR')} €
                  </p>
                  <p className="mt-4 text-xl text-gray-700">
                    Fourchette de prix :{' '}
                    <span className="font-semibold">
                      {estimation.estimation_min.toLocaleString('fr-FR')} € —{' '}
                      {estimation.estimation_max.toLocaleString('fr-FR')} €
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
                      {estimation.complexity === 'high'
                        ? 'Complexe'
                        : estimation.complexity === 'medium'
                          ? 'Moyenne'
                          : 'Facile'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                    <p className="text-sm text-gray-600">Niveau de confiance</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {estimation.confidence === 'high'
                        ? 'Élevé'
                        : estimation.confidence === 'medium'
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
                  {estimation.details.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="font-medium text-gray-700">{item.poste}</span>
                      </div>
                      <span className="text-gray-900">
                        {item.montant.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="font-medium text-gray-700">TVA (10%)</span>
                    <span className="text-gray-900">{tva.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-blue-600 pt-4 text-xl font-bold text-gray-900">
                    <span>Total TTC</span>
                    <span>{totalTTC.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facteurs influençant le prix */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Facteurs influençant le prix</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {estimation.facteurs.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA pour créer son propre compte */}
            <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="py-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Créez votre propre estimation
                </h3>
                <p className="mb-6 text-gray-700">
                  Obtenez des estimations personnalisées pour vos projets de rénovation
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg">
                    <Link href="/select-work">Créer une estimation gratuite</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/signup">Créer un compte</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

