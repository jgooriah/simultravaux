"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: 'error', text: 'Veuillez entrer un email valide' })
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (error) {
        console.error('Erreur:', error)
        setMessage({ type: 'error', text: error.message })
        setIsLoading(false)
        return
      }

      setMessage({ 
        type: 'success', 
        text: '✅ Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.' 
      })
      setEmail('')
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({ type: 'error', text: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <Link 
            href="/login" 
            className="mb-6 inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la connexion
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Réinitialiser le mot de passe
              </CardTitle>
              <p className="text-center text-sm text-gray-600">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                </div>

                {message && (
                  <div className={`rounded-lg p-3 text-sm ${
                    message.type === 'success' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {message.text}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

