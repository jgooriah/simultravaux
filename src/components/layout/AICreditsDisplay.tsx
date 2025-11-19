"use client"

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Credits {
  plan: string
  credits_remaining: number
  credits_total: number
}

export function AICreditsDisplay() {
  const [credits, setCredits] = useState<Credits | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthAndLoadCredits()
  }, [])

  const checkAuthAndLoadCredits = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setIsLoading(false)
        return
      }

      setIsAuthenticated(true)
      
      const response = await fetch('/api/ai/credits')
      const result = await response.json()

      if (result.success) {
        setCredits(result.data)
      }
    } catch (error) {
      console.error('Erreur chargement crédits:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !isAuthenticated || !credits) {
    return null
  }

  const percentage = (credits.credits_remaining / credits.credits_total) * 100
  const isLow = percentage < 20

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${
        isLow ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
      }`}
    >
      <Zap className={`h-4 w-4 ${isLow ? 'text-red-600' : 'text-blue-600'}`} />
      <span className="font-semibold">
        {credits.credits_remaining} / {credits.credits_total}
      </span>
      <span className="hidden text-xs sm:inline">crédits IA</span>
    </div>
  )
}

