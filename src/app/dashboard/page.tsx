"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Plus, Trash2, ExternalLink, Calendar, TrendingUp, Star, Search, StickyNote, Share2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { NotesModal } from '@/components/dashboard/NotesModal'
import { ShareModal } from '@/components/dashboard/ShareModal'
import { exportEstimationToPDF } from '@/lib/export-pdf'

interface SavedEstimation {
  id: string
  work_type_name: string
  estimation_min: number
  estimation_max: number
  estimation_moyen: number
  created_at: string
  work_type_id: string
  is_favorite: boolean
  notes: string | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [estimations, setEstimations] = useState<SavedEstimation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  // Filtres et tri
  const [filterType, setFilterType] = useState<string>('all')
  const [filterFavorite, setFilterFavorite] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // Modal notes
  const [notesModalOpen, setNotesModalOpen] = useState(false)
  const [selectedEstimation, setSelectedEstimation] = useState<SavedEstimation | null>(null)
  
  // Modal partage
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [estimationToShare, setEstimationToShare] = useState<SavedEstimation | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Vérifier l'authentification
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      loadEstimations()
    })
  }, [router])

  const loadEstimations = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/estimations/list')
      const result = await response.json()

      if (result.success) {
        setEstimations(result.data)
      } else {
        console.error('Erreur:', result.error)
      }
    } catch (error) {
      console.error('Erreur chargement estimations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const response = await fetch('/api/estimations/favorite', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estimationId: id,
          isFavorite: !currentFavorite,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Mettre à jour l'état local
        setEstimations((prev) =>
          prev.map((est) =>
            est.id === id ? { ...est, is_favorite: !currentFavorite } : est
          )
        )
      } else {
        alert('❌ Erreur lors de la mise à jour du favori')
      }
    } catch (error) {
      console.error('Erreur toggle favori:', error)
      alert('❌ Une erreur est survenue')
    }
  }

  const handleOpenNotes = (estimation: SavedEstimation) => {
    setSelectedEstimation(estimation)
    setNotesModalOpen(true)
  }

  const handleSaveNotes = (notes: string) => {
    if (selectedEstimation) {
      setEstimations((prev) =>
        prev.map((est) =>
          est.id === selectedEstimation.id ? { ...est, notes } : est
        )
      )
    }
  }

  const handleOpenShare = (estimation: SavedEstimation) => {
    setEstimationToShare(estimation)
    setShareModalOpen(true)
  }

  const handleExportPDF = async (estimationId: string) => {
    try {
      // Récupérer l'estimation complète avec tous les détails
      const supabase = createClient()
      const { data, error } = await supabase
        .from('estimations')
        .select('*')
        .eq('id', estimationId)
        .single()

      if (error || !data) {
        alert('❌ Erreur lors de la récupération de l\'estimation')
        return
      }

      // Exporter en PDF
      await exportEstimationToPDF(data)
    } catch (error) {
      console.error('Erreur export PDF:', error)
      alert('❌ Une erreur est survenue lors de l\'export PDF')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette estimation ?')) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from('estimations').delete().eq('id', id)

      if (error) {
        alert('❌ Erreur lors de la suppression')
        return
      }

      // Recharger la liste
      loadEstimations()
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('❌ Une erreur est survenue')
    }
  }

  // Filtrer et trier les estimations
  const filteredAndSortedEstimations = estimations
    .filter((est) => {
      // Filtre par favoris
      if (filterFavorite && !est.is_favorite) return false
      
      // Filtre par type
      if (filterType !== 'all' && est.work_type_id !== filterType) return false
      
      // Filtre par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = est.work_type_name.toLowerCase().includes(query)
        const matchesPrice = est.estimation_moyen.toString().includes(query)
        if (!matchesName && !matchesPrice) return false
      }
      
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'date') {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      } else if (sortBy === 'price') {
        comparison = a.estimation_moyen - b.estimation_moyen
      } else if (sortBy === 'name') {
        comparison = a.work_type_name.localeCompare(b.work_type_name)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Obtenir les types de travaux uniques pour les filtres
  const workTypes = Array.from(new Set(estimations.map((est) => ({
    id: est.work_type_id,
    name: est.work_type_name,
  })))).reduce((acc, current) => {
    if (!acc.find((item) => item.id === current.id)) {
      acc.push(current)
    }
    return acc
  }, [] as Array<{ id: string; name: string }>)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Chargement de vos estimations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Estimations</h1>
              <p className="mt-1 text-gray-600">
                Retrouvez toutes vos estimations de travaux sauvegardées
              </p>
            </div>
            <Button asChild>
              <Link href="/select-work">
                <Plus className="mr-2 h-5 w-5" />
                Nouvelle estimation
              </Link>
            </Button>
          </div>

          {/* Statistiques */}
          {estimations.length > 0 && (
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total estimations</p>
                      <p className="text-2xl font-bold text-gray-900">{estimations.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Montant total estimé</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {estimations
                          .reduce((sum, est) => sum + est.estimation_moyen, 0)
                          .toLocaleString('fr-FR')}{' '}
                        €
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Dernière estimation</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {new Date(estimations[0].created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filtres et tri */}
          {estimations.length > 0 && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                {/* Barre de recherche */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher par nom ou prix..."
                      className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {/* Filtre par type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Type de travaux
                    </label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="all">Tous les types</option>
                      {workTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtre favoris */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Favoris
                    </label>
                    <button
                      onClick={() => setFilterFavorite(!filterFavorite)}
                      className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors ${
                        filterFavorite
                          ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Star
                        className={`mr-2 inline h-4 w-4 ${
                          filterFavorite ? 'fill-yellow-400' : ''
                        }`}
                      />
                      {filterFavorite ? 'Favoris uniquement' : 'Tous'}
                    </button>
                  </div>

                  {/* Tri par */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Trier par
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'name')}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="date">Date</option>
                      <option value="price">Prix</option>
                      <option value="name">Nom</option>
                    </select>
                  </div>

                  {/* Ordre */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Ordre
                    </label>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {sortOrder === 'desc' ? '↓ Décroissant' : '↑ Croissant'}
                    </button>
                  </div>
                </div>

                {/* Résultats */}
                <div className="mt-4 text-sm text-gray-600">
                  {filteredAndSortedEstimations.length} estimation
                  {filteredAndSortedEstimations.length > 1 ? 's' : ''} affichée
                  {filteredAndSortedEstimations.length > 1 ? 's' : ''}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Liste des estimations */}
          {estimations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  Aucune estimation sauvegardée
                </h2>
                <p className="mb-6 text-gray-600">
                  Commencez par créer votre première estimation de travaux
                </p>
                <Button asChild>
                  <Link href="/select-work">
                    <Plus className="mr-2 h-5 w-5" />
                    Créer une estimation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAndSortedEstimations.map((estimation) => (
                <Card key={estimation.id} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="flex-1 text-lg">{estimation.work_type_name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleToggleFavorite(estimation.id, estimation.is_favorite)
                          }
                          className="rounded-full p-1 transition-colors hover:bg-gray-100"
                          title={estimation.is_favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              estimation.is_favorite
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-400'
                            }`}
                          />
                        </button>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          {estimation.estimation_moyen.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>Fourchette :</strong>{' '}
                        {estimation.estimation_min.toLocaleString('fr-FR')} € -{' '}
                        {estimation.estimation_max.toLocaleString('fr-FR')} €
                      </p>
                      <p>
                        <strong>Créée le :</strong>{' '}
                        {new Date(estimation.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    {/* Notes preview */}
                    {estimation.notes && (
                      <div className="mb-3 rounded-lg bg-yellow-50 p-3 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <StickyNote className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                          <p className="line-clamp-2">{estimation.notes}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {/* Boutons principaux */}
                      <div className="flex gap-2">
                        <Button asChild variant="default" size="sm" className="flex-1">
                          <Link href={`/simulator?workType=${estimation.work_type_id}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Refaire
                          </Link>
                        </Button>
                        <Button
                          onClick={() => handleDelete(estimation.id)}
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Boutons secondaires */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleOpenNotes(estimation)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          title="Ajouter/modifier notes"
                        >
                          <StickyNote className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Notes</span>
                        </Button>
                        <Button
                          onClick={() => handleOpenShare(estimation)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          title="Partager l'estimation"
                        >
                          <Share2 className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Partager</span>
                        </Button>
                        <Button
                          onClick={() => handleExportPDF(estimation.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          title="Télécharger en PDF"
                        >
                          <Download className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">PDF</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal notes */}
      {notesModalOpen && selectedEstimation && (
        <NotesModal
          estimationId={selectedEstimation.id}
          estimationName={selectedEstimation.work_type_name}
          initialNotes={selectedEstimation.notes}
          onClose={() => setNotesModalOpen(false)}
          onSave={handleSaveNotes}
        />
      )}

      {/* Modal partage */}
      {shareModalOpen && estimationToShare && (
        <ShareModal
          estimationId={estimationToShare.id}
          estimationName={estimationToShare.work_type_name}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </div>
  )
}

