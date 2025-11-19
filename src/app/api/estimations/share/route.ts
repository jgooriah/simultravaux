import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
            message: 'Vous devez être connecté',
          },
        },
        { status: 401 }
      )
    }

    // Parser le body
    const { estimationId, expiresInDays } = await request.json()

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

    // Vérifier que l'estimation appartient à l'utilisateur
    const { data: estimation, error: estError } = await supabase
      .from('estimations')
      .select('id')
      .eq('id', estimationId)
      .eq('user_id', user.id)
      .single()

    if (estError || !estimation) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Estimation non trouvée',
          },
        },
        { status: 404 }
      )
    }

    // Calculer la date d'expiration
    let expiresAt = null
    if (expiresInDays && expiresInDays > 0) {
      const expDate = new Date()
      expDate.setDate(expDate.getDate() + expiresInDays)
      expiresAt = expDate.toISOString()
    }

    // Créer ou mettre à jour le partage
    const { data: existingShare } = await supabase
      .from('shared_estimations')
      .select('*')
      .eq('estimation_id', estimationId)
      .single()

    let shareData

    if (existingShare) {
      // Mettre à jour le partage existant
      const { data, error } = await supabase
        .from('shared_estimations')
        .update({ expires_at: expiresAt })
        .eq('share_id', existingShare.share_id)
        .select()
        .single()

      if (error) {
        console.error('Erreur Supabase update:', error)
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

      shareData = data
    } else {
      // Créer un nouveau partage
      const { data, error } = await supabase
        .from('shared_estimations')
        .insert({
          estimation_id: estimationId,
          user_id: user.id,
          expires_at: expiresAt,
        })
        .select()
        .single()

      if (error) {
        console.error('Erreur Supabase insert:', error)
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'DATABASE_ERROR',
              message: 'Erreur lors de la création',
              details: error.message,
            },
          },
          { status: 500 }
        )
      }

      shareData = data
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          share_id: shareData.share_id,
          share_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/shared/${shareData.share_id}`,
          expires_at: shareData.expires_at,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API /estimations/share:', error)

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

