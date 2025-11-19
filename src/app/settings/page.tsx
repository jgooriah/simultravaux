"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Lock, Trash2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setIsLoading(false)
    })
  }, [router])

  const handleDeleteAccount = async () => {
    const confirmation = prompt(
      'Cette action est irréversible. Tapez "SUPPRIMER" pour confirmer :'
    )

    if (confirmation !== 'SUPPRIMER') {
      return
    }

    if (confirm('Êtes-vous vraiment sûr de vouloir supprimer votre compte ?')) {
      try {
        // TODO: Implémenter la suppression du compte
        // (nécessite une API côté serveur pour supprimer l'utilisateur)
        alert('⚠️ La suppression de compte sera disponible prochainement.')
      } catch (error) {
        console.error('Erreur:', error)
        alert('❌ Une erreur est survenue')
      }
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Paramètres</h1>

          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Gérez vos préférences de notification (fonctionnalité à venir)
                </p>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium text-gray-900">Mot de passe</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Modifiez votre mot de passe pour sécuriser votre compte
                  </p>
                  <Button variant="outline" disabled>
                    Modifier le mot de passe (à venir)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Zone de danger */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Zone de danger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium text-gray-900">Supprimer mon compte</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Cette action est irréversible. Toutes vos données seront supprimées
                    définitivement.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

