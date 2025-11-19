"use client"

export const dynamic = 'force-dynamic'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { QuestionnaireForm } from '@/components/simulator/QuestionnaireForm'
import { Footer } from '@/components/layout/Footer'
import { getQuestionnaire } from '@/data/questions'
import { type Answers, type WorkTypeId } from '@/types/questionnaire'
import { getWorkTypeById } from '@/types/work-types'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Zap, Clock, Target, TrendingDown, CheckCircle } from 'lucide-react'

export default function SimulatorPage() {
  const searchParams = useSearchParams()
  const workTypeId = (searchParams.get('workType') || 'painting-interior') as WorkTypeId
  const [isGenerating, setIsGenerating] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [credits, setCredits] = useState<any>(null)
  const [mode, setMode] = useState<'demo' | 'ai' | null>(null)

  const questionnaire = getQuestionnaire(workTypeId)
  const workType = getWorkTypeById(workTypeId)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      
      if (user) {
        fetch('/api/ai/credits')
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              setCredits(result.data)
            }
          })
      }
    })
  }, [])

  const handleComplete = async (answers: Answers) => {
    setIsGenerating(true)
    
    try {
      const endpoint = mode === 'ai' ? '/api/ai/estimate-advanced' : '/api/estimate'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workTypeId,
          answers,
        }),
      })

      const result = await response.json()

      if (result.success) {
        const estimationData = encodeURIComponent(JSON.stringify(result.data))
        const resultsPage = mode === 'ai' ? '/results-ai' : '/results'
        window.location.href = `${resultsPage}?data=${estimationData}`
      } else {
        if (result.error.code === 'INSUFFICIENT_CREDITS') {
          alert(`❌ ${result.error.message}\n\nPassez au mode Premium ou utilisez le mode Démo gratuit.`)
        } else {
          alert('❌ Erreur lors de la génération de l\'estimation: ' + result.error.message)
        }
        setIsGenerating(false)
      }
    } catch (error) {
      alert('❌ Une erreur est survenue')
      setIsGenerating(false)
    }
  }

  if (!questionnaire || questionnaire.steps.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Questionnaire non disponible</h1>
        </div>
      </div>
    )
  }

  // Choix du mode
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Choisissez votre mode d'estimation
              </h1>
              <p className="mt-2 text-xl text-gray-600">{workType?.name}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Mode Démo */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="bg-gray-50">
                  <CardTitle>Mode Démo</CardTitle>
                  <div className="text-2xl font-bold">Gratuit</div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="mb-6 space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                      <span>Estimation rapide</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                      <span>Fourchette de prix</span>
                    </li>
                  </ul>
                  <Button onClick={() => setMode('demo')} variant="outline" className="w-full">
                    Mode Démo
                  </Button>
                </CardContent>
              </Card>

              {/* Mode IA */}
              <Card className="border-2 border-purple-400">
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-xs text-white">
                  PREMIUM
                </div>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex gap-2">
                    <Sparkles className="h-6 w-6" />
                    Mode IA Avancé
                  </CardTitle>
                  <div className="text-2xl font-bold text-purple-600">5 crédits</div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="mb-6 space-y-2">
                    <li className="flex gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <span>3 scénarios personnalisés</span>
                    </li>
                    <li className="flex gap-2">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <span>Optimisations détectées</span>
                    </li>
                  </ul>
                  {user && credits && credits.credits_remaining >= 5 ? (
                    <Button onClick={() => setMode('ai')} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Mode IA Premium
                    </Button>
                  ) : user ? (
                    <Button className="w-full" disabled>
                      Crédits insuffisants
                    </Button>
                  ) : (
                    <Button
                      onClick={() => (window.location.href = '/login')}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      Connexion requise
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <>
      {mode === 'ai' && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-2 text-center text-white">
          <Sparkles className="inline h-5 w-5" /> Mode IA Premium Activé
        </div>
      )}
      <QuestionnaireForm questionnaire={questionnaire} onComplete={handleComplete} />
      <Footer />
    </>
  )
}

