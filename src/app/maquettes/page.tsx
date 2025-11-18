import Link from 'next/link'
import { ArrowLeft, Layout, PanelsTopLeft, Wand2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockups = [
  {
    icon: Layout,
    title: 'Landing page',
    description:
      'Hero immersif, badges de confiance, grid de types de travaux et storytelling inspiré de la version v001.',
    highlights: ['Hero réactif', 'Badges KPI', 'WorkType Grid'],
  },
  {
    icon: PanelsTopLeft,
    title: 'Simulateur',
    description:
      'Cartes interactives, questionnaire guidé et future navigation step-by-step avec React Hook Form + Zod.',
    highlights: ['Cartes interactives', 'CTA contextualisés', 'Placeholder futur Stepper'],
  },
  {
    icon: Wand2,
    title: 'Résultats & PDF',
    description:
      'Design prévu pour afficher la fourchette, les facteurs clés et générer un PDF clair et partageable.',
    highlights: ['Fourchette min/max/moyen', 'Conseils IA', 'Boutons action (PDF, nouvelle estimation)'],
  },
]

export default function MaquettesPage() {
  return (
    <main className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Maquettes & intentions
            </p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Vision UI de SimuTravaux
            </h1>
            <p className="mt-3 text-gray-600">
              Aperçu des sections clés en attendant les visuels haute fidélité. Chaque module est pensé pour maximiser la conversion et la clarté.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l’accueil
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mockups.map((mockup) => {
            const Icon = mockup.icon
            return (
              <Card
                key={mockup.title}
                className="border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">
                    {mockup.title}
                  </CardTitle>
                  <p className="text-gray-600">{mockup.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                    Points clés
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    {mockup.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}


