// lib/ai/estimator.ts
// Fonction principale d'estimation utilisant Claude API

import Anthropic from '@anthropic-ai/sdk'
import { type EstimationRequest, type EstimationResult } from '@/types/questionnaire'
import { getWorkTypeById } from '@/types/work-types'
import { buildEstimationPrompt } from './prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function generateEstimation(
  request: EstimationRequest
): Promise<EstimationResult> {
  try {
    // 1. Récupérer les infos du type de travaux
    const workType = getWorkTypeById(request.workTypeId)
    if (!workType) {
      throw new Error('Type de travaux invalide')
    }

    // 2. Construire le prompt
    const prompt = buildEstimationPrompt(workType, request.answers)

    // 3. Appeler Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      temperature: 0.3, // Plus bas = plus déterministe
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // 4. Parser la réponse
    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Format de réponse inattendu')
    }

    // Extraire le JSON de la réponse
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Pas de JSON dans la réponse')
    }

    const estimationData = JSON.parse(jsonMatch[0])

    // 5. Construire le résultat final
    const result: EstimationResult = {
      id: generateId(),
      workTypeId: request.workTypeId,
      workTypeName: workType.name,
      estimation: estimationData.estimation,
      details: estimationData.details,
      facteurs: estimationData.facteurs || [],
      delai: estimationData.delai || 'À définir',
      conseils: estimationData.conseils || [],
      aides: estimationData.aides || [],
      metadata: {
        createdAt: new Date(),
        questionnaire: {
          workTypeId: request.workTypeId,
          answers: request.answers,
        },
        confidence: calculateConfidence(estimationData),
      },
    }

    return result
  } catch (error) {
    console.error('Erreur génération estimation:', error)
    throw new Error('Impossible de générer l\'estimation')
  }
}

// Fonction helper pour générer un ID unique
function generateId(): string {
  return `est_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Fonction pour calculer la confiance dans l'estimation
function calculateConfidence(data: any): 'low' | 'medium' | 'high' {
  // Logique basée sur la qualité des données
  const hasDetailedBreakdown = data.details && data.details.length >= 3
  const hasReasonableRange =
    data.estimation.max / data.estimation.min <= 2 // Fourchette pas trop large

  if (hasDetailedBreakdown && hasReasonableRange) {
    return 'high'
  } else if (hasDetailedBreakdown || hasReasonableRange) {
    return 'medium'
  }
  return 'low'
}

// Validation de l'estimation
export function validateEstimation(data: any): boolean {
  try {
    return !!(
      data.estimation &&
      typeof data.estimation.min === 'number' &&
      typeof data.estimation.max === 'number' &&
      typeof data.estimation.moyen === 'number' &&
      data.estimation.min > 0 &&
      data.estimation.max > data.estimation.min &&
      Array.isArray(data.details) &&
      data.details.length > 0
    )
  } catch {
    return false
  }
}
