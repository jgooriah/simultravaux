import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
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
            message: 'Vous devez être connecté',
          },
        },
        { status: 401 }
      )
    }

    // Parser le body
    const { estimationId, isFavorite } = await request.json()

    if (!estimationId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PARAM',
            message: 'ID estimation manquant',
          },
        },
        { status: 400 }
      )
    }

    // Mettre à jour le favori
    const { data, error } = await supabase
      .from('estimations')
      .update({ is_favorite: isFavorite })
      .eq('id', estimationId)
      .eq('user_id', user.id) // Sécurité : seulement ses propres estimations
      .select()
      .single()

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Erreur lors de la mise à jour',
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
          is_favorite: data.is_favorite,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API /estimations/favorite:', error)

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

