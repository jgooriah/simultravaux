"use client"

import Link from 'next/link'
import { ArrowLeft, ClipboardList, Construction, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cards = [
  {
    id: 'questionnaire',
    title: 'Questionnaire guidé',
    description:
      'Chaque type de travaux aura son propre parcours avec validation en temps réel et étapes claires.',
    details:
      'Navigation step-by-step, validations React Hook Form + Zod, et sauvegarde automatique des réponses.',
    icon: ClipboardList,
    actionLabel: 'Voir la roadmap',
    actionHref: '/roadmap',
  },
  {
    id: 'ai',
    title: 'Analyse IA',
    description:
      'Les réponses alimentent Claude pour générer une estimation fiable et un breakdown détaillé.',
    details:
      'Prompt optimisé, parsing JSON sécurisé et calcul de confiance pour chaque résultat.',
    icon: Construction,
    actionLabel: 'Tester l’API',
    actionHref: '/api/estimate',
  },
  {
    id: 'results',
    title: 'Résultats actionnables',
    description:
      'Vous obtiendrez un récapitulatif complet, des conseils personnalisés et bientôt un PDF téléchargeable.',
    details:
      'Page résultat dédiée avec breakdown visuel, facteurs clés et génération PDF (coming soon).',
    icon: Sparkles,
    actionLabel: 'Découvrir les maquettes',
    actionHref: '/maquettes',
  },
]

export default function SimulatorPlaceholderPage() {
  const [activeCardId, setActiveCardId] = useState<string | null>(cards[0].id)
  const activeCard = cards.find((card) => card.id === activeCardId)

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
              Simulateur en préparation
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">
              Arrivée imminente du questionnaire intelligent
            </h1>
            <p className="mt-3 text-gray-600">
              Nous finalisons l’expérience interactive qui vous permettra
              d’obtenir votre estimation personnalisée en quelques minutes.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l’accueil
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon
            const isActive = card.id === activeCardId
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCardId(card.id)}
                className="text-left"
                aria-pressed={isActive}
              >
                <Card
                  className={`h-full border-2 ${isActive ? 'border-blue-500 shadow-lg' : 'border-transparent'}`}
                >
                  <CardHeader className="flex flex-col space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>

        {activeCard && (
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
            <p className="mb-2 text-sm font-semibold uppercase text-blue-600">
              Étape sélectionnée
            </p>
            <h2 className="text-2xl font-bold text-gray-900">{activeCard.title}</h2>
            <p className="mt-4 text-gray-600">{activeCard.details}</p>
            <Button asChild className="mt-6">
              <Link href={activeCard.actionHref}>
                {activeCard.actionLabel}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}


