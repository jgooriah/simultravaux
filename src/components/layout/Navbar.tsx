"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserMenu } from './UserMenu'
import { AICreditsDisplay } from './AICreditsDisplay'
import { createClient } from '@/lib/supabase/client'

interface NavLink {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '/#hero', label: 'Accueil' },
  { href: '/select-work', label: 'Simulateur' },
  { href: '/chat', label: 'Estimation IA' },
  { href: '/analyse-photo', label: 'Analyse Photo IA' },
  { href: '/#how-it-works', label: 'Comment ça marche' },
]

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [showCommencerMenu, setShowCommencerMenu] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-semibold text-gray-900">
          SimuTravaux
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative transition hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Bouton Commencer avec Menu Déroulant */}
          <div className="relative hidden md:block">
            <Button
              size="sm"
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setShowCommencerMenu(!showCommencerMenu)}
            >
              <span>Commencer</span>
              <svg className={`ml-1 h-4 w-4 transition-transform ${showCommencerMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            
            {/* Menu Déroulant */}
            {showCommencerMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCommencerMenu(false)}></div>
                <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-2xl">
                  <Link
                    href="/select-work"
                    onClick={() => setShowCommencerMenu(false)}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Simulateur Manuel</p>
                      <p className="text-xs text-gray-600">Questionnaire guidé en 5 questions</p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/chat"
                    onClick={() => setShowCommencerMenu(false)}
                    className="flex items-start gap-3 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 p-3 transition-all hover:from-purple-100 hover:to-blue-100 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">Chat IA</p>
                        <span className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          NOUVEAU
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Conversation naturelle avec l'IA</p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/analyse-photo"
                    onClick={() => setShowCommencerMenu(false)}
                    className="flex items-start gap-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-3 transition-all hover:from-green-100 hover:to-emerald-100 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">Analyse Photo IA</p>
                        <span className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          NOUVEAU
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Uploadez une photo pour une analyse IA</p>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
          
          <AICreditsDisplay />
          
          {/* Si connecté : UserMenu, sinon : Connexion/Inscription */}
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Inscription</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


