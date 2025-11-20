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
    const { result } = body

    if (!result || !result.estimatedBudget) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_DATA', message: 'Données invalides' },
        },
        { status: 400 }
      )
    }

    // Extraire les informations de l'analyse
    const surfaceMatch = result.estimatedArea?.match(/(\d+(?:\.\d+)?)/i)
    const surface = surfaceMatch ? parseFloat(surfaceMatch[1]) : null

    // Préparer les données pour Supabase
    const estimationData = {
      id: `photo_${Date.now()}_${user.id.substring(0, 8)}`,
      user_id: user.id,
      work_type_id: 'analyse_photo',
      work_type_name: result.workType || 'Analyse Photo IA',
      estimation_min: result.estimatedBudget.min,
      estimation_max: result.estimatedBudget.max,
      estimation_moyen: result.estimatedBudget.average,
      details: [
        {
          poste: 'Analyse Photo IA',
          description: `Type de pièce: ${result.roomType}`,
          montant: result.estimatedBudget.average,
        },
      ],
      facteurs: [
        {
          nom: 'État actuel',
          impact: result.currentState,
        },
        {
          nom: 'Surface estimée',
          impact: result.estimatedArea || 'Non déterminée',
        },
      ],
      conseils: result.recommendations || [],
      aides: [],
      delai: null,
      confidence: result.confidence || 'medium',
      questionnaire_answers: {
        'surface-area': surface,
        'room-type': result.roomType,
        'work-type': result.workType,
        'materials': result.materials,
        'current-state': result.currentState,
      },
      is_favorite: false,
      method_type: 'analyse_photo',
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
    console.error('Erreur API save-photo:', error)
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

