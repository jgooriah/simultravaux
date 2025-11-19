"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Share2, Trash2, Heart, Edit3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function EstimationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [estimation, setEstimation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEstimation = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/login')
          return
        }

        // Charger depuis Supabase
        const { data, error: fetchError } = await supabase
          .from('estimations')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single()

        if (fetchError) {
          console.error('Erreur chargement:', fetchError)
          setError('Estimation non trouvée')
          return
        }

        setEstimation(data)
      } catch (err) {
        console.error('Erreur:', err)
        setError('Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    loadEstimation()
  }, [id, router])

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette estimation ?')) return

    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase
        .from('estimations')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      alert('✅ Estimation supprimée')
      router.push('/mes-estimations')
    } catch (err) {
      console.error('Erreur suppression:', err)
      alert('❌ Erreur lors de la suppression')
    }
  }

  const handleToggleFavorite = async () => {
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from('estimations')
        .update({ is_favorite: !estimation.is_favorite })
        .eq('id', id)

      if (updateError) throw updateError

      setEstimation({ ...estimation, is_favorite: !estimation.is_favorite })
    } catch (err) {
      console.error('Erreur:', err)
      alert('❌ Erreur lors de la mise à jour')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (error || !estimation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 text-center">
          <p className="mb-4 text-red-600">{error || 'Estimation non trouvée'}</p>
          <Button onClick={() => router.push('/mes-estimations')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Card>
      </div>
    )
  }

  // Déterminer l'icône selon le type de méthode
  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'chat_ia':
        return '💬'
      case 'analyse_photo':
        return '📸'
      case 'simulateur_manuel':
        return '📝'
      default:
        return '📊'
    }
  }

  const getMethodName = (method: string) => {
    switch (method) {
      case 'chat_ia':
        return 'Chat IA'
      case 'analyse_photo':
        return 'Analyse Photo IA'
      case 'simulateur_manuel':
        return 'Simulateur Manuel'
      default:
        return 'Estimation'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-100/20 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/mes-estimations')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à mes estimations
          </Button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-3xl">{getMethodIcon(estimation.method_type)}</span>
                <h1 className="text-3xl font-bold text-gray-900">
                  {estimation.work_type_name || 'Estimation'}
                </h1>
              </div>
              <p className="text-gray-600">
                Créée le {new Date(estimation.created_at).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-sm text-gray-500">
                Méthode : {getMethodName(estimation.method_type)}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFavorite}
                className={estimation.is_favorite ? 'bg-yellow-50 text-yellow-600' : ''}
              >
                <Heart className={`h-4 w-4 ${estimation.is_favorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="space-y-6 lg:col-span-2">
            {/* Budget estimé */}
            <Card className="overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">💰 Budget estimé</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Minimum</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {estimation.estimation_min?.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Moyen</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {estimation.estimation_moyen?.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Maximum</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {estimation.estimation_max?.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>
              {estimation.confidence && (
                <p className="mt-3 text-xs text-gray-600">
                  Confiance : {estimation.confidence}
                </p>
              )}
            </Card>

            {/* Détails des postes */}
            {estimation.details && Array.isArray(estimation.details) && estimation.details.length > 0 && (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">📊 Décomposition des coûts</h2>
                <div className="space-y-3">
                  {estimation.details.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.label || item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-600">{item.description}</p>
                        )}
                      </div>
                      <p className="ml-4 font-bold text-gray-900">
                        {item.montant?.toLocaleString('fr-FR')} €
                        {item.pourcentage && (
                          <span className="ml-2 text-sm text-gray-500">({item.pourcentage}%)</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Facteurs */}
            {estimation.facteurs && Array.isArray(estimation.facteurs) && estimation.facteurs.length > 0 && (
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">⚙️ Facteurs influençant le prix</h2>
                <ul className="space-y-2">
                  {estimation.facteurs.map((facteur: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700">{facteur.label || facteur}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Conseils */}
            {estimation.conseils && Array.isArray(estimation.conseils) && estimation.conseils.length > 0 && (
              <Card className="bg-blue-50 p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">💡 Conseils personnalisés</h2>
                <ul className="space-y-2">
                  {estimation.conseils.map((conseil: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700">{conseil.text || conseil}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Aides */}
            {estimation.aides && Array.isArray(estimation.aides) && estimation.aides.length > 0 && (
              <Card className="bg-green-50 p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">💸 Aides financières disponibles</h2>
                <ul className="space-y-3">
                  {estimation.aides.map((aide: any, idx: number) => (
                    <li key={idx} className="rounded-lg bg-white p-3">
                      <p className="font-medium text-gray-900">{aide.nom || aide.name}</p>
                      {aide.montant && (
                        <p className="text-sm text-green-600">Jusqu'à {aide.montant}</p>
                      )}
                      {aide.description && (
                        <p className="text-sm text-gray-600">{aide.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations générales */}
            <Card className="p-6">
              <h3 className="mb-4 font-bold text-gray-900">📝 Informations</h3>
              <div className="space-y-3 text-sm">
                {estimation.delai && (
                  <div>
                    <p className="text-gray-600">Délai estimé</p>
                    <p className="font-medium text-gray-900">{estimation.delai}</p>
                  </div>
                )}
                {estimation.complexity && (
                  <div>
                    <p className="text-gray-600">Complexité</p>
                    <p className="font-medium text-gray-900">{estimation.complexity}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">Mise à jour</p>
                  <p className="font-medium text-gray-900">
                    {new Date(estimation.updated_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </Card>

            {/* Réponses du questionnaire */}
            {estimation.questionnaire_answers && Object.keys(estimation.questionnaire_answers).length > 0 && (
              <Card className="p-6">
                <h3 className="mb-4 font-bold text-gray-900">📋 Vos réponses</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(estimation.questionnaire_answers).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-600">{key}</p>
                      <p className="font-medium text-gray-900">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Notes */}
            <Card className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">📌 Notes</h3>
                <Button variant="ghost" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              <textarea
                value={estimation.notes || ''}
                onChange={(e) => setEstimation({ ...estimation, notes: e.target.value })}
                placeholder="Ajoutez des notes personnelles..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                rows={4}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

