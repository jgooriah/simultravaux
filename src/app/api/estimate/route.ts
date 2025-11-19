// app/api/estimate/route.ts
// API Route pour générer une estimation

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateEstimation } from '@/lib/ai/estimator'
import { type EstimationRequest, type EstimationResult } from '@/types/questionnaire'
import { getWorkTypeById } from '@/types/work-types'

// Fonction pour générer une estimation démo (sans IA)
function generateDemoEstimation(request: EstimationRequest): EstimationResult {
  console.log('[DEMO] Début génération pour:', request.workTypeId)
  
  const workType = getWorkTypeById(request.workTypeId)
  if (!workType) {
    console.error('[DEMO] Type de travaux non trouvé:', request.workTypeId)
    throw new Error('Type de travaux invalide')
  }
  
  console.log('[DEMO] Type de travaux trouvé:', workType.name)

  // Calculer un prix basé sur les réponses
  let basePrice = (workType.averagePriceRange.min + workType.averagePriceRange.max) / 2
  
  // Ajuster selon les réponses
  const answers = request.answers
  
  // Si surface, multiplier par la surface
  if (answers['surface-area']) {
    basePrice = Number(answers['surface-area']) * basePrice
  }
  if (answers['bathroom-size']) {
    basePrice = Number(answers['bathroom-size']) * 3000
  }
  if (answers['kitchen-size']) {
    basePrice = Number(answers['kitchen-size']) * 2500
  }
  if (answers['window-count']) {
    basePrice = Number(answers['window-count']) * 500
  }
  if (answers['door-count']) {
    basePrice = Number(answers['door-count']) * 300
  }

  // Ajuster selon la qualité
  if (answers['paint-quality'] === 'premium' || answers['equipment-range'] === 'premium' || answers['quality'] === 'premium') {
    basePrice *= 1.3
  }
  if (answers['renovation-type'] === 'complete') {
    basePrice *= 1.5
  }
  if (answers['timeline'] === 'urgent') {
    basePrice *= 1.1
  }

  const moyen = Math.round(basePrice)
  const min = Math.round(moyen * 0.85)
  const max = Math.round(moyen * 1.15)

  // Décomposition des coûts
  const mainOeuvre = Math.round(moyen * 0.55)
  const materiaux = Math.round(moyen * 0.35)
  const preparation = Math.round(moyen * 0.05)
  const finitions = Math.round(moyen * 0.03)
  const evacuation = Math.round(moyen * 0.02)

  const id = `est_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  console.log('[DEMO] Calculs terminés:', { min, max, moyen })

  const result = {
    id,
    workTypeId: request.workTypeId,
    workTypeName: workType.name,
    estimation: {
      min,
      max,
      moyen,
    },
    details: [
      {
        poste: 'Main d\'œuvre',
        montant: mainOeuvre,
        description: 'Travail des professionnels qualifiés',
      },
      {
        poste: 'Matériaux et fournitures',
        montant: materiaux,
        description: 'Tous les matériaux nécessaires au projet',
      },
      {
        poste: 'Préparation du chantier',
        montant: preparation,
        description: 'Protection, préparation des surfaces',
      },
      {
        poste: 'Finitions',
        montant: finitions,
        description: 'Travaux de finition et retouches',
      },
      {
        poste: 'Évacuation et nettoyage',
        montant: evacuation,
        description: 'Gestion des déchets et nettoyage final',
      },
    ],
    facteurs: [
      answers['postal-code'] ? `Code postal: ${answers['postal-code']}` : 'Localisation standard',
      answers['timeline'] === 'urgent' ? 'Délai urgent (+10%)' : 'Délai normal',
      answers['current-state'] === 'poor' ? 'État nécessitant des réparations' : 'État correct',
    ],
    delai: answers['timeline'] === 'urgent' ? '1-2 semaines' : '2-4 semaines',
    conseils: [
      'Comparez plusieurs devis avant de vous engager',
      'Vérifiez les assurances et garanties des artisans',
      'Planifiez vos travaux pendant les périodes creuses pour de meilleurs tarifs',
      'Demandez des références et consultez les avis clients',
    ],
    aides: [
      {
        nom: 'TVA réduite',
        montant: '10% au lieu de 20%',
        conditions: 'Pour les logements de plus de 2 ans',
      },
    ],
    metadata: {
      createdAt: new Date(),
      questionnaire: {
        workTypeId: request.workTypeId,
        answers: request.answers,
      },
      confidence: 'medium' as const,
    },
  }
  
  console.log('[DEMO] Résultat créé avec succès')
  return result
}

// Schéma de validation Zod
const estimationRequestSchema = z.object({
  workTypeId: z.string().min(1, 'Type de travaux requis'),
  answers: z.record(z.union([z.string(), z.number(), z.array(z.string()), z.boolean()])),
})

export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'ready',
    instructions:
      'Envoyez une requête POST avec workTypeId et answers (JSON) pour obtenir une estimation IA.',
    sampleRequest: {
      workTypeId: 'painting-interior',
      answers: {
        'surface-area': 25,
        'current-state': 'medium',
        'postal-code': '75010',
      },
    },
    sampleCurl: `curl -X POST ${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/estimate -H "Content-Type: application/json" -d '{"workTypeId":"painting-interior","answers":{"surface-area":25}}'`,
  })
}

export async function POST(request: NextRequest) {
  console.log('=== API /estimate appelée ===')
  
  try {
    // 1. Parser le body
    console.log('1. Parsing du body...')
    const body = await request.json()
    console.log('Body reçu:', JSON.stringify(body, null, 2))

    // 2. Valider les données
    console.log('2. Validation des données...')
    const validationResult = estimationRequestSchema.safeParse(body)
    if (!validationResult.success) {
      console.log('Validation échouée:', validationResult.error)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Données invalides',
            details: validationResult.error.flatten(),
          },
        },
        { status: 400 }
      )
    }
    console.log('Validation réussie')

    const estimationRequest: EstimationRequest = validationResult.data

    // 3. Vérifier que la clé API est configurée (mode démo si absente)
    console.log('3. Vérification mode démo...')
    const apiKey = process.env.ANTHROPIC_API_KEY || ''
    const isDemoMode = !apiKey || apiKey.includes('remplacez-moi') || apiKey.length < 20
    console.log('Mode démo:', isDemoMode, '(clé présente:', !!apiKey, ', longueur:', apiKey.length, ')')
    
    let estimation

    if (isDemoMode) {
      console.log(`MODE DÉMO: Génération estimation fictive pour ${estimationRequest.workTypeId}`)
      try {
        estimation = generateDemoEstimation(estimationRequest)
        console.log('✅ Estimation démo générée avec succès')
      } catch (demoError) {
        console.error('❌ ERREUR dans generateDemoEstimation:', demoError)
        throw demoError
      }
    } else {
      // 4. Générer l'estimation avec l'IA
      console.log(`Génération estimation IA pour ${estimationRequest.workTypeId}`)
      estimation = await generateEstimation(estimationRequest)
    }

    // 5. Retourner le résultat
    console.log('5. Retour du résultat...')
    return NextResponse.json(
      {
        success: true,
        data: estimation,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ ERREUR API /estimate:', error)
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack')
    console.error('Message:', error instanceof Error ? error.message : String(error))
    console.error('Type:', typeof error)

    // Gestion des erreurs spécifiques
    if (error instanceof Error) {
      // Erreur Anthropic API
      if (error.message.includes('API')) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'AI_ERROR',
              message: 'Erreur lors de la génération de l\'estimation',
            },
          },
          { status: 503 }
        )
      }

      // Erreur de parsing
      if (error.message.includes('JSON')) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'PARSING_ERROR',
              message: 'Erreur de traitement des données',
            },
          },
          { status: 500 }
        )
      }
    }

    // Erreur générique
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue',
        },
      },
      { status: 500 }
    )
  }
}

// OPTIONS pour CORS (si nécessaire)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Rate limiting (optionnel, à implémenter avec upstash/redis)
/*
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requêtes par minute
})

// Dans le POST handler, avant la génération:
const ip = request.ip ?? '127.0.0.1'
const { success: rateLimitOk } = await ratelimit.limit(ip)

if (!rateLimitOk) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Trop de requêtes. Veuillez réessayer dans quelques instants.',
      },
    },
    { status: 429 }
  )
}
*/
