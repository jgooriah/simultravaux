// app/api/estimate/route.ts
// API Route pour générer une estimation

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateEstimation } from '@/lib/ai/estimator'
import { type EstimationRequest } from '@/types/questionnaire'

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
  try {
    // 1. Parser le body
    const body = await request.json()

    // 2. Valider les données
    const validationResult = estimationRequestSchema.safeParse(body)
    if (!validationResult.success) {
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

    const estimationRequest: EstimationRequest = validationResult.data

    // 3. Vérifier que la clé API est configurée
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY non configurée')
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SERVER_ERROR',
            message: 'Service temporairement indisponible',
          },
        },
        { status: 500 }
      )
    }

    // 4. Générer l'estimation
    console.log(`Génération estimation pour ${estimationRequest.workTypeId}`)
    const estimation = await generateEstimation(estimationRequest)

    // 5. Retourner le résultat
    return NextResponse.json(
      {
        success: true,
        data: estimation,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API /estimate:', error)

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
