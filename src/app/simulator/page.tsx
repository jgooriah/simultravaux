"use client"

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { QuestionnaireForm } from '@/components/simulator/QuestionnaireForm'
import { Footer } from '@/components/layout/Footer'
import { getQuestionnaire } from '@/data/questions'
import { type Answers, type WorkTypeId } from '@/types/questionnaire'

export default function SimulatorPage() {
  const searchParams = useSearchParams()
  const workTypeId = (searchParams.get('workType') || 'painting-interior') as WorkTypeId
  const [isGenerating, setIsGenerating] = useState(false)

  const questionnaire = getQuestionnaire(workTypeId)

  const handleComplete = async (answers: Answers) => {
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
        const estimationData = encodeURIComponent(JSON.stringify(result.data))
        window.location.href = `/results?data=${estimationData}`
      } else {
        alert('❌ Erreur lors de la génération de l\'estimation: ' + result.error.message)
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

  return (
    <>
      <QuestionnaireForm questionnaire={questionnaire} onComplete={handleComplete} isLoading={isGenerating} />
      <Footer />
    </>
  )
}

