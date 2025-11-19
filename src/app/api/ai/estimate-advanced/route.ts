import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { getWorkTypeById } from '@/types/work-types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Coûts en crédits par feature
const CREDIT_COSTS = {
  advanced_estimation: 5,
  chat_message: 1,
  photo_analysis: 10,
  document_analysis: 15,
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const supabase = await createClient()

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Vous devez être connecté pour utiliser le mode IA avancé',
          },
        },
        { status: 401 }
      )
    }

    // Parser le body
    const { workTypeId, answers } = await request.json()

    if (!workTypeId || !answers) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAMS',
            message: 'Paramètres manquants',
          },
        },
        { status: 400 }
      )
    }

    // Vérifier les crédits disponibles
    const { data: credits } = await supabase
      .from('user_ai_credits')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!credits || credits.credits_remaining < CREDIT_COSTS.advanced_estimation) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INSUFFICIENT_CREDITS',
            message: `Crédits insuffisants. Il vous faut ${CREDIT_COSTS.advanced_estimation} crédits, vous en avez ${credits?.credits_remaining || 0}.`,
            creditsNeeded: CREDIT_COSTS.advanced_estimation,
            creditsAvailable: credits?.credits_remaining || 0,
          },
        },
        { status: 402 }
      )
    }

    const workType = getWorkTypeById(workTypeId)
    if (!workType) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_WORK_TYPE',
            message: 'Type de travaux invalide',
          },
        },
        { status: 400 }
      )
    }

    // Construire le prompt pour Claude
    const prompt = buildAdvancedEstimationPrompt(workType, answers)

    console.log('🤖 [AI] Envoi de la requête à Claude...')

    // Appel à Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4096,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const aiResponse = message.content[0].text
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens
    const processingTime = Date.now() - startTime

    console.log('✅ [AI] Réponse reçue:', {
      tokens: tokensUsed,
      time: processingTime,
    })

    // Parser la réponse IA
    const parsedEstimation = parseAIEstimation(aiResponse, workType)

    // Déduire les crédits
    const { error: deductError } = await supabase.rpc('deduct_ai_credits', {
      p_user_id: user.id,
      p_credits: CREDIT_COSTS.advanced_estimation,
    })

    if (deductError) {
      console.error('Erreur déduction crédits:', deductError)
    }

    // Logger l'utilisation
    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature: 'advanced_estimation',
      credits_used: CREDIT_COSTS.advanced_estimation,
      request_data: { workTypeId, answers },
      response_data: parsedEstimation,
      tokens_input: message.usage.input_tokens,
      tokens_output: message.usage.output_tokens,
      processing_time_ms: processingTime,
      model_used: 'claude-3-5-sonnet-20240620',
      status: 'success',
    })

    // Sauvegarder l'estimation complète
    const { data: savedEstimation, error: saveError } = await supabase
      .from('estimations')
      .insert({
        id: parsedEstimation.id,
        user_id: user.id,
        work_type_id: workTypeId,
        work_type_name: workType.name,
        estimation_min: parsedEstimation.estimation.min,
        estimation_max: parsedEstimation.estimation.max,
        estimation_moyen: parsedEstimation.estimation.moyen,
        details: parsedEstimation.details,
        facteurs: parsedEstimation.facteurs,
        conseils: parsedEstimation.conseils,
        aides: parsedEstimation.aides,
        delai: parsedEstimation.delai,
        confidence: 'high',
        questionnaire_answers: answers,
      })
      .select()
      .single()

    if (saveError) {
      console.error('Erreur sauvegarde estimation:', saveError)
    }

    // Sauvegarder les détails IA premium
    if (savedEstimation) {
      await supabase.from('ai_estimations').insert({
        user_id: user.id,
        estimation_id: savedEstimation.id,
        ai_analysis: parsedEstimation.aiAnalysis,
        scenarios: parsedEstimation.scenarios,
        optimizations: parsedEstimation.optimizations,
        model_used: 'claude-3-5-sonnet-20240620',
        tokens_used: tokensUsed,
        processing_time_ms: processingTime,
        confidence_score: 0.95,
      })
    }

    return NextResponse.json(
      {
        success: true,
        data: parsedEstimation,
        meta: {
          creditsUsed: CREDIT_COSTS.advanced_estimation,
          creditsRemaining: credits.credits_remaining - CREDIT_COSTS.advanced_estimation,
          processingTime,
          tokensUsed,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('❌ [AI] Erreur:', error)

    const processingTime = Date.now() - startTime

    // Logger l'erreur
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase.from('ai_usage_logs').insert({
        user_id: user.id,
        feature: 'advanced_estimation',
        credits_used: 0,
        processing_time_ms: processingTime,
        status: 'error',
        error_message: error.message,
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AI_ERROR',
          message: "Une erreur est survenue lors de l'estimation IA",
          details: error.message,
        },
      },
      { status: 500 }
    )
  }
}

// Prompt système pour Claude
const SYSTEM_PROMPT = `Tu es un expert en rénovation et estimation de travaux avec 20 ans d'expérience.

Ton rôle est de fournir des estimations ultra-précises et détaillées pour des projets de rénovation.

Tu dois TOUJOURS répondre au format JSON suivant (et UNIQUEMENT ce JSON, sans texte avant ou après) :

{
  "estimation": {
    "min": number,
    "max": number,
    "moyen": number
  },
  "scenarios": [
    {
      "name": "Budget Optimisé",
      "description": "Solution économique sans compromis qualité",
      "totalCost": number,
      "duration": "string",
      "pros": ["string"],
      "cons": ["string"]
    },
    {
      "name": "Standard Confort",
      "description": "Équilibre parfait qualité/prix",
      "totalCost": number,
      "duration": "string",
      "pros": ["string"],
      "cons": ["string"]
    },
    {
      "name": "Premium Excellence",
      "description": "Matériaux haut de gamme",
      "totalCost": number,
      "duration": "string",
      "pros": ["string"],
      "cons": ["string"]
    }
  ],
  "optimizations": [
    {
      "category": "string",
      "originalCost": number,
      "optimizedCost": number,
      "savings": number,
      "explanation": "string"
    }
  ],
  "aiAnalysis": {
    "complexity": "low" | "medium" | "high",
    "riskFactors": ["string"],
    "recommendations": ["string"],
    "timeline": "string"
  }
}

Soit TRÈS précis dans tes calculs. Base-toi sur les prix du marché français 2024.`

function buildAdvancedEstimationPrompt(workType: any, answers: any): string {
  let prompt = `Je souhaite une estimation détaillée pour des travaux de : ${workType.name}\n\n`
  prompt += `Description : ${workType.description}\n\n`
  prompt += `Réponses au questionnaire :\n`

  Object.entries(answers).forEach(([key, value]) => {
    prompt += `- ${key}: ${value}\n`
  })

  prompt += `\nFournis-moi une estimation avec 3 scénarios différents et des optimisations possibles.`

  return prompt
}

function parseAIEstimation(aiResponse: string, workType: any) {
  try {
    // Extraire le JSON de la réponse
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Aucun JSON trouvé dans la réponse')
    }

    const parsed = JSON.parse(jsonMatch[0])

    // Créer l'estimation complète
    const estimation = {
      id: `est_ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      workTypeId: workType.id,
      workTypeName: workType.name,
      estimation: parsed.estimation,
      scenarios: parsed.scenarios,
      optimizations: parsed.optimizations,
      aiAnalysis: parsed.aiAnalysis,
      details: generateDetailsFromScenario(parsed.scenarios[1]), // Standard scenario
      facteurs: parsed.aiAnalysis.riskFactors || [],
      conseils: parsed.aiAnalysis.recommendations || [],
      aides: [
        {
          nom: 'TVA réduite',
          montant: '10% au lieu de 20%',
          conditions: 'Pour les logements de plus de 2 ans',
        },
      ],
      delai: parsed.aiAnalysis.timeline,
      metadata: {
        createdAt: new Date(),
        confidence: 'high',
        aiGenerated: true,
      },
    }

    return estimation
  } catch (error) {
    console.error('Erreur parsing IA:', error)
    throw new Error('Impossible de parser la réponse IA')
  }
}

function generateDetailsFromScenario(scenario: any) {
  const total = scenario.totalCost
  return [
    {
      poste: "Main d'œuvre",
      montant: Math.round(total * 0.55),
      description: 'Travail des professionnels qualifiés',
    },
    {
      poste: 'Matériaux et fournitures',
      montant: Math.round(total * 0.35),
      description: 'Tous les matériaux nécessaires',
    },
    {
      poste: 'Préparation du chantier',
      montant: Math.round(total * 0.05),
      description: 'Protection, préparation des surfaces',
    },
    {
      poste: 'Finitions',
      montant: Math.round(total * 0.03),
      description: 'Travaux de finition et retouches',
    },
    {
      poste: 'Évacuation et nettoyage',
      montant: Math.round(total * 0.02),
      description: 'Gestion des déchets et nettoyage final',
    },
  ]
}

