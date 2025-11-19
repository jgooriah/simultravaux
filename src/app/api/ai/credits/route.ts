import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
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
            message: 'Non authentifié',
          },
        },
        { status: 401 }
      )
    }

    // Récupérer les crédits
    const { data: credits, error } = await supabase
      .from('user_ai_credits')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      // Si l'utilisateur n'a pas encore de crédits, les créer
      if (error.code === 'PGRST116') {
        const { data: newCredits, error: insertError } = await supabase
          .from('user_ai_credits')
          .insert({
            user_id: user.id,
            plan: 'free',
            credits_remaining: 10,
            credits_total: 10,
          })
          .select()
          .single()

        if (insertError) {
          throw insertError
        }

        return NextResponse.json({
          success: true,
          data: newCredits,
        })
      }

      throw error
    }

    return NextResponse.json({
      success: true,
      data: credits,
    })
  } catch (error: any) {
    console.error('Erreur récupération crédits:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Erreur lors de la récupération des crédits',
          details: error.message,
        },
      },
      { status: 500 }
    )
  }
}

