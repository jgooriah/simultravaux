"use client"

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProgressBar } from './ProgressBar'
import { QuestionField } from './QuestionField'
import { type Questionnaire, type Answers } from '@/types/questionnaire'
import { getTotalQuestions } from '@/data/questions'

interface QuestionnaireFormProps {
  questionnaire: Questionnaire
  onComplete: (answers: Answers) => void | Promise<void>
}

export function QuestionnaireForm({ questionnaire, onComplete }: QuestionnaireFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentQuestionIndexInStep, setCurrentQuestionIndexInStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const currentStep = questionnaire.steps[currentStepIndex]
  const currentQuestion = currentStep.questions[currentQuestionIndexInStep]
  const totalQuestions = getTotalQuestions(questionnaire)
  
  // Calculer le numéro de question global
  let globalQuestionNumber = 0
  for (let i = 0; i < currentStepIndex; i++) {
    globalQuestionNumber += questionnaire.steps[i].questions.length
  }
  globalQuestionNumber += currentQuestionIndexInStep

  const isFirstQuestion = currentStepIndex === 0 && currentQuestionIndexInStep === 0
  const isLastQuestion =
    currentStepIndex === questionnaire.steps.length - 1 &&
    currentQuestionIndexInStep === currentStep.questions.length - 1

  const validateCurrentQuestion = (): boolean => {
    const value = answers[currentQuestion.id]
    
    if (currentQuestion.required && !value) {
      setErrors({ [currentQuestion.id]: 'Ce champ est requis' })
      return false
    }

    if (currentQuestion.type === 'number' && value) {
      const numValue = Number(value)
      if (currentQuestion.min !== undefined && numValue < currentQuestion.min) {
        setErrors({
          [currentQuestion.id]: `La valeur minimale est ${currentQuestion.min}`,
        })
        return false
      }
      if (currentQuestion.max !== undefined && numValue > currentQuestion.max) {
        setErrors({
          [currentQuestion.id]: `La valeur maximale est ${currentQuestion.max}`,
        })
        return false
      }
    }

    if (currentQuestion.type === 'text' && value && currentQuestion.validation?.pattern) {
      const regex = new RegExp(currentQuestion.validation.pattern)
      if (!regex.test(String(value))) {
        setErrors({
          [currentQuestion.id]:
            currentQuestion.validation.message || 'Format invalide',
        })
        return false
      }
    }

    setErrors({})
    return true
  }

  const handleNext = async () => {
    if (!validateCurrentQuestion()) {
      return
    }

    if (isLastQuestion) {
      setIsLoading(true)
      try {
        await onComplete(answers)
      } finally {
        setIsLoading(false)
      }
      return
    }

    if (currentQuestionIndexInStep < currentStep.questions.length - 1) {
      setCurrentQuestionIndexInStep(currentQuestionIndexInStep + 1)
    } else {
      setCurrentStepIndex(currentStepIndex + 1)
      setCurrentQuestionIndexInStep(0)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndexInStep > 0) {
      setCurrentQuestionIndexInStep(currentQuestionIndexInStep - 1)
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      const previousStep = questionnaire.steps[currentStepIndex - 1]
      setCurrentQuestionIndexInStep(previousStep.questions.length - 1)
    }
    setErrors({})
  }

  const handleAnswerChange = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-semibold text-gray-900">
            SimuTravaux
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Changer de type de travaux
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
          <ProgressBar
            currentStep={currentStepIndex + 1}
            totalSteps={questionnaire.steps.length}
            currentQuestion={globalQuestionNumber}
            totalQuestions={totalQuestions}
          />

          {/* Step Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{currentStep.title}</h2>
            {currentStep.description && (
              <p className="mt-2 text-gray-600">{currentStep.description}</p>
            )}
          </div>

          {/* Question */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <QuestionField
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
              error={errors[currentQuestion.id]}
            />

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={isFirstQuestion || isLoading}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Précédent
              </Button>
              <Button size="lg" onClick={handleNext} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    {isLastQuestion ? 'Obtenir mon estimation' : 'Suivant'}
                    {!isLastQuestion && <ArrowRight className="ml-2 h-5 w-5" />}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Vos réponses nous permettent de calculer une estimation précise adaptée à
            votre projet.
          </p>
        </div>
      </main>
    </div>
  )
}

