import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { type EstimationResult } from '@/types/questionnaire'

export async function POST(request: NextRequest) {
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
            message: 'Vous devez être connecté pour sauvegarder une estimation',
          },
        },
        { status: 401 }
      )
    }

    // Parser le body
    const estimation: EstimationResult = await request.json()

    // Préparer les données pour l'insertion
    const estimationData = {
      id: estimation.id,
      user_id: user.id,
      work_type_id: estimation.workTypeId,
      work_type_name: estimation.workTypeName,
      estimation_min: estimation.estimation.min,
      estimation_max: estimation.estimation.max,
      estimation_moyen: estimation.estimation.moyen,
      details: estimation.details,
      facteurs: estimation.facteurs,
      conseils: estimation.conseils,
      aides: estimation.aides,
      delai: estimation.delai,
      confidence: estimation.metadata.confidence,
      questionnaire_answers: estimation.metadata.questionnaire.answers,
      is_favorite: false,
    }

    // Insérer dans Supabase (ou mettre à jour si déjà existante)
    const { data, error } = await supabase
      .from('estimations')
      .upsert(estimationData, { onConflict: 'id' })
      .select()
      .single()

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Erreur lors de la sauvegarde de l\'estimation',
            details: error.message,
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: data.id,
          message: 'Estimation sauvegardée avec succès',
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API /estimations/save:', error)

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

