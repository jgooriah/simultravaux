import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Non authentifié' },
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content, chatId } = body

    // Parser le contenu pour extraire les informations
    const workTypeMatch = content.match(/(?:rénovation|travaux)\s+(?:de\s+)?(?:la\s+)?([^\n:]+)/i)
    const surfaceMatch = content.match(/(\d+(?:\s*\.\s*\d+)?)\s*(?:m2|m²|mètres?\s*carrés?)/i)
    const budgetMatch = content.match(/(?:Budget|Coût|Prix)\s*:?\s*(\d[\d\s]*)\s*€?\s*(?:à|-)\s*(\d[\d\s]*)\s*€/i)
    const moyenMatch = content.match(/(?:moyen|moyenne)\s*:?\s*(\d[\d\s]*)\s*€/i)
    const qualityMatch = content.match(/(?:qualité|gamme)\s*:?\s*(\w+)/i)
    const postalMatch = content.match(/(?:code postal|CP)\s*:?\s*(\d{5})/i)
    const delaiMatch = content.match(/(?:délai|durée)\s*:?\s*([^\n]+)/i)

    // Extraire les valeurs
    const workType = workTypeMatch ? workTypeMatch[1].trim() : 'Travaux de rénovation'
    const surface = surfaceMatch ? parseFloat(surfaceMatch[1].replace(/\s/g, '')) : null
    const budgetMin = budgetMatch ? parseInt(budgetMatch[1].replace(/\s/g, '')) : 0
    const budgetMax = budgetMatch ? parseInt(budgetMatch[2].replace(/\s/g, '')) : 0
    const budgetMoyen = moyenMatch 
      ? parseInt(moyenMatch[1].replace(/\s/g, '')) 
      : budgetMatch 
        ? Math.round((budgetMin + budgetMax) / 2)
        : 0
    const quality = qualityMatch ? qualityMatch[1] : 'Standard'
    const postalCode = postalMatch ? postalMatch[1] : null
    const delai = delaiMatch ? delaiMatch[1].trim() : null

    // Préparer les données pour Supabase
    const estimationData = {
      id: `chat_${Date.now()}_${user.id.substring(0, 8)}`,
      user_id: user.id,
      work_type_id: 'chat_ia',
      work_type_name: workType,
      estimation_min: budgetMin,
      estimation_max: budgetMax,
      estimation_moyen: budgetMoyen,
      details: [
        {
          poste: 'Estimation IA',
          description: 'Estimation générée par Chat IA',
          montant: budgetMoyen,
        },
      ],
      facteurs: [],
      conseils: [content.substring(0, 500)], // Extrait du contenu
      aides: [],
      delai: delai,
      confidence: 'medium',
      questionnaire_answers: {
        'surface-area': surface,
        'quality': quality,
        'postal-code': postalCode,
        'chat_id': chatId,
      },
      is_favorite: false,
      method_type: 'chat_ia',
    }

    // Upsert dans Supabase
    const { data, error } = await supabase
      .from('estimations')
      .upsert(estimationData)
      .select()

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Erreur lors de la sauvegarde',
            details: error.message,
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: data[0],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API save-chat:', error)
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

