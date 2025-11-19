'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Eye, Trash2, Heart, MessageCircle, Camera, FileText, Plus } from 'lucide-react'

interface Estimation {
  id: string
  work_type_name: string
  estimation_min: number
  estimation_moyen: number
  estimation_max: number
  method_type: 'chat_ia' | 'analyse_photo' | 'simulateur_manuel'
  is_favorite: boolean
  created_at: string
}

export default function MesEstimationsPage() {
  const [estimations, setEstimations] = useState<Estimation[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filterMethod, setFilterMethod] = useState<string>('all')
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
    
    // Charger les estimations depuis Supabase
    try {
      const { data, error } = await supabase
        .from('estimations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur chargement:', error)
      } else {
        setEstimations(data || [])
      }
    } catch (e) {
      console.error('Erreur:', e)
    }
    
    setIsLoading(false)
  }

  const deleteEstimation = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette estimation ?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('estimations')
        .delete()
        .eq('id', id)

      if (error) throw error

      setEstimations(estimations.filter(e => e.id !== id))
      alert('✅ Estimation supprimée')
    } catch (err) {
      console.error('Erreur suppression:', err)
      alert('❌ Erreur lors de la suppression')
    }
  }

  const toggleFavorite = async (id: string) => {
    try {
      const estimation = estimations.find(e => e.id === id)
      if (!estimation) return

      const supabase = createClient()
      const { error } = await supabase
        .from('estimations')
        .update({ is_favorite: !estimation.is_favorite })
        .eq('id', id)

      if (error) throw error

      setEstimations(estimations.map(e => 
        e.id === id ? { ...e, is_favorite: !e.is_favorite } : e
      ))
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'chat_ia':
        return <MessageCircle className="h-5 w-5 text-purple-600" />
      case 'analyse_photo':
        return <Camera className="h-5 w-5 text-green-600" />
      case 'simulateur_manuel':
        return <FileText className="h-5 w-5 text-blue-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getMethodName = (method: string) => {
    switch (method) {
      case 'chat_ia':
        return 'Chat IA'
      case 'analyse_photo':
        return 'Analyse Photo'
      case 'simulateur_manuel':
        return 'Simulateur'
      default:
        return 'Estimation'
    }
  }

  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case 'chat_ia':
        return 'bg-purple-100 text-purple-700'
      case 'analyse_photo':
        return 'bg-green-100 text-green-700'
      case 'simulateur_manuel':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredEstimations = filterMethod === 'all'
    ? estimations
    : estimations.filter(e => e.method_type === filterMethod)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-100/20">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-100/20">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-100/20">
      {/* Pattern décoratif */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99, 102, 241) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <div className="relative border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
                Mes Estimations
              </h1>
              <p className="text-sm text-gray-600">
                {filteredEstimations.length} estimation{filteredEstimations.length > 1 ? 's' : ''} {filterMethod !== 'all' ? `(${getMethodName(filterMethod)})` : ''}
              </p>
            </div>
            <Button onClick={() => router.push('/select-work')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle estimation
            </Button>
          </div>

          {/* Filtres */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant={filterMethod === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('all')}
            >
              Toutes ({estimations.length})
            </Button>
            <Button
              variant={filterMethod === 'simulateur_manuel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('simulateur_manuel')}
              className={filterMethod === 'simulateur_manuel' ? '' : 'hover:bg-blue-50'}
            >
              <FileText className="mr-2 h-4 w-4" />
              Simulateur ({estimations.filter(e => e.method_type === 'simulateur_manuel').length})
            </Button>
            <Button
              variant={filterMethod === 'chat_ia' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('chat_ia')}
              className={filterMethod === 'chat_ia' ? '' : 'hover:bg-purple-50'}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat IA ({estimations.filter(e => e.method_type === 'chat_ia').length})
            </Button>
            <Button
              variant={filterMethod === 'analyse_photo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('analyse_photo')}
              className={filterMethod === 'analyse_photo' ? '' : 'hover:bg-green-50'}
            >
              <Camera className="mr-2 h-4 w-4" />
              Analyse Photo ({estimations.filter(e => e.method_type === 'analyse_photo').length})
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-8">
        {filteredEstimations.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {filterMethod === 'all' ? 'Aucune estimation sauvegardée' : `Aucune estimation ${getMethodName(filterMethod)}`}
            </h2>
            <p className="mb-6 text-gray-600">
              {filterMethod === 'all' 
                ? 'Commencez par créer votre première estimation !'
                : `Créez une estimation via ${getMethodName(filterMethod)}`
              }
            </p>
            <Button onClick={() => router.push('/select-work')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Créer une estimation
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEstimations.map((estimation) => (
              <Card key={estimation.id} className="group relative overflow-hidden bg-white/80 p-6 transition-all hover:shadow-2xl backdrop-blur-sm">
                {/* Badge favori */}
                {estimation.is_favorite && (
                  <div className="absolute right-4 top-4">
                    <Heart className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                )}

                {/* Icône méthode */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-blue-50">
                      {getMethodIcon(estimation.method_type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {estimation.work_type_name}
                      </h3>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getMethodBadgeColor(estimation.method_type)}`}>
                        {getMethodName(estimation.method_type)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-4">
                  <p className="mb-1 text-xs text-gray-600">Budget moyen</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {estimation.estimation_moyen?.toLocaleString('fr-FR')} €
                  </p>
                  {estimation.estimation_min && estimation.estimation_max && (
                    <p className="mt-1 text-xs text-gray-600">
                      {estimation.estimation_min.toLocaleString('fr-FR')} - {estimation.estimation_max.toLocaleString('fr-FR')} €
                    </p>
                  )}
                </div>

                {/* Date */}
                <p className="mb-4 text-xs text-gray-500">
                  Créée le {new Date(estimation.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => router.push(`/estimation/${estimation.id}`)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                    size="sm"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Voir détails
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(estimation.id)}
                    className={estimation.is_favorite ? 'bg-yellow-50' : ''}
                  >
                    <Heart className={`h-4 w-4 ${estimation.is_favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteEstimation(estimation.id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
