// Types pour le système de questionnaire et d'estimation

import { type WorkTypeId } from './work-types'

// Types de questions
export type QuestionType =
  | 'text'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'range'

export interface QuestionOption {
  value: string
  label: string
  description?: string
  priceImpact?: 'low' | 'medium' | 'high' // Impact sur le prix
}

export interface Question {
  id: string
  type: QuestionType
  label: string
  description?: string
  placeholder?: string
  required: boolean
  options?: QuestionOption[] // Pour select, radio, checkbox
  min?: number // Pour number et range
  max?: number
  step?: number
  unit?: string // Ex: "m²", "unités", "ml"
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  dependsOn?: {
    questionId: string
    value: string | string[]
  } // Question conditionnelle
}

export interface QuestionnaireStep {
  id: string
  title: string
  description?: string
  questions: Question[]
}

export interface Questionnaire {
  workTypeId: WorkTypeId
  steps: QuestionnaireStep[]
}

// Réponses de l'utilisateur
export type Answer = string | number | string[] | boolean

export interface Answers {
  [questionId: string]: Answer
}

export interface QuestionnaireData {
  workTypeId: WorkTypeId
  answers: Answers
  completedAt?: Date
}

// Types pour l'estimation
export interface EstimationBreakdown {
  poste: string // Ex: "Main d'œuvre", "Matériaux"
  montant: number
  description: string
  pourcentage?: number
}

export interface EstimationResult {
  id: string
  workTypeId: WorkTypeId
  workTypeName: string
  estimation: {
    min: number
    max: number
    moyen: number
  }
  details: EstimationBreakdown[]
  facteurs: string[] // Facteurs ayant influencé le prix
  delai: string // Délai estimé
  conseils: string[] // Conseils pour le client
  aides?: {
    // Aides financières possibles
    nom: string
    montant: string
    conditions: string
  }[]
  metadata: {
    createdAt: Date
    questionnaire: QuestionnaireData
    confidence: 'low' | 'medium' | 'high' // Confiance dans l'estimation
  }
}

// Request/Response API
export interface EstimationRequest {
  workTypeId: WorkTypeId
  answers: Answers
}

export interface EstimationResponse {
  success: boolean
  data?: EstimationResult
  error?: {
    code: string
    message: string
  }
}

// Types pour le PDF
export interface PDFData {
  estimation: EstimationResult
  clientInfo?: {
    name?: string
    email?: string
    phone?: string
    address?: string
  }
}

// Helper types
export interface FormField {
  name: string
  value: Answer
  error?: string
}

export interface StepperState {
  currentStep: number
  totalSteps: number
  canGoNext: boolean
  canGoPrevious: boolean
  isComplete: boolean
}

// Validation
export interface ValidationError {
  questionId: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}
