"use client"

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { QuestionnaireForm } from '@/components/simulator/QuestionnaireForm'
import { Footer } from '@/components/layout/Footer'
import { getQuestionnaire } from '@/data/questions'
import { type Answers, type WorkTypeId } from '@/types/questionnaire'
import { getWorkTypeById } from '@/types/work-types'

export default function SimulatorPage() {
  const searchParams = useSearchParams()
  const workTypeId = (searchParams.get('workType') || 'painting-interior') as WorkTypeId
  const [isGenerating, setIsGenerating] = useState(false)

  const questionnaire = getQuestionnaire(workTypeId)
  const workType = getWorkTypeById(workTypeId)

  const handleComplete = async (answers: Answers) => {
    console.log('Questionnaire complété:', answers)
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/estimate', {
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
        console.log('✅ [Simulator] Estimation reçue:', result.data)
        // Rediriger vers la page de résultats avec les données
        const estimationData = encodeURIComponent(JSON.stringify(result.data))
        console.log('🔗 [Simulator] URL de redirection:', `/results?data=${estimationData.substring(0, 100)}...`)
        console.log('📏 [Simulator] Taille des données encodées:', estimationData.length)
        window.location.href = `/results?data=${estimationData}`
      } else {
        console.error('Erreur:', result.error)
        alert('❌ Erreur lors de la génération de l\'estimation: ' + result.error.message)
        setIsGenerating(false)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Une erreur est survenue lors de la génération de l\'estimation')
      setIsGenerating(false)
    }
  }

  if (!questionnaire || questionnaire.steps.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Questionnaire non disponible
          </h1>
          <p className="mt-2 text-gray-600">
            Le questionnaire pour ce type de travaux n'est pas encore configuré.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <QuestionnaireForm questionnaire={questionnaire} onComplete={handleComplete} />
      <Footer />
    </>
  )
}


