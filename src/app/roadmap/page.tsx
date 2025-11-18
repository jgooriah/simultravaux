import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const roadmap = [
  {
    title: 'Semaine 1 — Fondation & Landing',
    focus: 'Structure, Hero, sections principales',
    tasks: [
      'Initialiser Next.js 14 + Tailwind + shadcn/ui',
      'Intégrer Hero, Features, How It Works',
      'Mettre en place la navigation et le branding',
    ],
  },
  {
    title: 'Semaine 2 — Types & Simulateur',
    focus: 'Données, questionnaires, navigation',
    tasks: [
      'Définir les types de travaux et questionnaires dynamiques',
      'Créer le sélecteur de travaux (TypeSelector)',
      'Structurer le simulateur et la progression',
    ],
  },
  {
    title: 'Semaine 3 — IA & Résultats',
    focus: 'API Claude, intégration IA, page résultat',
    tasks: [
      'Finaliser les prompts et la fonction d’estimation',
      'Implémenter /api/estimate et la gestion des erreurs',
      'Concevoir la page résultats (fourchette, breakdown, conseils)',
    ],
  },
  {
    title: 'Semaine 4 — PDF, polish & déploiement',
    focus: 'Export PDF, optimisations, Vercel',
    tasks: [
      'Générer un PDF professionnel depuis l’estimation',
      'Optimiser performance / accessibilité / SEO',
      'Configurer Vercel et finaliser la documentation',
    ],
  },
]

export default function RoadmapPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Roadmap produit
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Plan de développement SimuTravaux
            </h1>
            <p className="mt-3 text-gray-600">
              Inspiré du MVP plan fourni. Chaque semaine cible une étape clé pour livrer un simulateur complet et fiable.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l’accueil
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {roadmap.map((step) => (
            <Card
              key={step.title}
              className="border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  {step.title}
                </CardTitle>
                <p className="text-sm text-blue-600">{step.focus}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  {step.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}


