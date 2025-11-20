'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

interface SavedEstimation {
  id: string
  content: string
  chatId: string | null
  createdAt: number
}

export default function MesEstimationsPage() {
  const [estimations, setEstimations] = useState<SavedEstimation[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEstimation, setSelectedEstimation] = useState<SavedEstimation | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadEstimations()
  }, [])

  const checkAuthAndLoadEstimations = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    setIsAuthenticated(true)
    
    // Charger les estimations depuis localStorage
    const saved = localStorage.getItem('saved-estimations') || '[]'
    try {
      const parsed = JSON.parse(saved)
      setEstimations(parsed.sort((a: SavedEstimation, b: SavedEstimation) => b.createdAt - a.createdAt))
    } catch (e) {
      console.error('Erreur chargement estimations:', e)
    }
    
    setIsLoading(false)
  }

  const deleteEstimation = (id: string) => {
    const updated = estimations.filter((e) => e.id !== id)
    setEstimations(updated)
    localStorage.setItem('saved-estimations', JSON.stringify(updated))
  }

  const extractEstimationDetails = (content: string) => {
    // Essayer de parser comme JSON (analyse photo)
    try {
      const parsed = JSON.parse(content)
      if (parsed.workType && parsed.estimatedBudget) {
        const surface = parsed.estimatedArea?.match(/(\d+)/)?.[1] || '?'
        return {
          surface,
          type: parsed.workType || 'Travaux',
          montant: parsed.estimatedBudget.average?.toLocaleString('fr-FR') || '?',
        }
      }
    } catch (e) {
      // Pas du JSON, continuer avec le parsing texte
    }
    
    // Parsing texte (chat IA)
    const budgetMatch = content.match(/Budget estimé pour (\d+)m² de (.+?) :/)
    const moyenMatch = content.match(/Moyen : \*\*(.+?)€\*\*/)
    
    return {
      surface: budgetMatch ? budgetMatch[1] : '?',
      type: budgetMatch ? budgetMatch[2].trim() : 'Travaux',
      montant: moyenMatch ? moyenMatch[1] : '?',
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Connexion requise</h1>
          <p className="mb-6 text-gray-600">
            Vous devez être connecté pour accéder à vos estimations sauvegardées.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => router.push('/login')} className="flex-1">
              Se connecter
            </Button>
            <Button onClick={() => router.push('/signup')} variant="outline" className="flex-1">
              Créer un compte
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="border-b border-white/20 bg-white/80 shadow-lg backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
                Mes Estimations
              </h1>
              <p className="text-sm text-gray-600">
                {estimations.length} estimation{estimations.length > 1 ? 's' : ''} sauvegardée{estimations.length > 1 ? 's' : ''}
              </p>
            </div>
            <Button onClick={() => router.push('/chat')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouvelle estimation
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {estimations.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">Aucune estimation sauvegardée</h2>
            <p className="mb-6 text-gray-600">
              Commencez une conversation avec l'IA pour obtenir votre première estimation !
            </p>
            <Button onClick={() => router.push('/chat')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Démarrer un chat IA
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {estimations.map((estimation) => {
              const details = extractEstimationDetails(estimation.content)
              return (
                <Card key={estimation.id} className="relative overflow-hidden p-6 transition-all hover:shadow-xl">
                  {/* Header Card */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100">
                          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{details.type}</h3>
                          <p className="text-xs text-gray-500">{details.surface}m²</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Supprimer cette estimation ?')) {
                          deleteEstimation(estimation.id)
                        }
                      }}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Montant */}
                  <div className="mb-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 p-4">
                    <p className="text-xs text-gray-600">Budget moyen</p>
                    <p className="text-2xl font-bold text-purple-700">{details.montant}€</p>
                  </div>

                  {/* Date */}
                  <p className="mb-4 text-xs text-gray-500">
                    {new Date(estimation.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        navigator.clipboard.writeText(estimation.content)
                        alert('✅ Copié dans le presse-papier !')
                      }}
                    >
                      <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copier
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                      onClick={() => setSelectedEstimation(estimation)}
                    >
                      Voir détails
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedEstimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedEstimation(null)}>
          <Card className="max-h-[80vh] w-full max-w-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 border-b bg-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Détails de l'estimation</h2>
                <button
                  onClick={() => setSelectedEstimation(null)}
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-900">
                {selectedEstimation.content}
              </pre>
              <div className="mt-4 flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedEstimation.content)
                    alert('✅ Copié dans le presse-papier !')
                  }}
                >
                  📋 Copier le texte complet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedEstimation(null)}
                  className="flex-1"
                >
                  Fermer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

