"use client"

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FloatingChatButton() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip/Badge */}
      <div className="relative">
        <Link href="/chat">
          <Button
            size="lg"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl transition-transform hover:scale-110"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </Button>
        </Link>

        {/* Badge "Nouveau" */}
        <div className="absolute -right-2 -top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
          <Sparkles className="h-3 w-3" />
          NEW
        </div>

        {/* Bouton fermer */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition-opacity hover:bg-gray-800"
          title="Masquer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Texte incitatif */}
      <div className="absolute bottom-20 right-0 w-64 rounded-lg bg-white p-3 shadow-xl">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Besoin d'aide ?</p>
            <p className="text-xs text-gray-600">
              Discutez avec notre IA pour obtenir des conseils instantanés !
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

