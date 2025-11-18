"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
        404
      </p>
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-xl text-gray-600">
        Oups ! La page que vous cherchez n’existe pas ou a été déplacée. Retournez
        vers l’accueil pour découvrir notre simulateur de travaux intelligent.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Revenir à l’accueil</Link>
      </Button>
    </main>
  )
}


