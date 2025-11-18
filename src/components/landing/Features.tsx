import {
  Sparkles,
  Clock,
  Shield,
  FileText,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Sparkles,
    title: 'Estimation par IA',
    description:
      "Notre intelligence artificielle analyse vos besoins et vous fournit une estimation précise basée sur des milliers de projets réalisés.",
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Clock,
    title: 'Résultat instantané',
    description:
      'Obtenez votre devis détaillé en moins de 2 minutes. Plus besoin d\'attendre des jours pour une première estimation.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Shield,
    title: '100% gratuit',
    description:
      'Aucun frais caché, aucun engagement. Estimez autant de projets que vous le souhaitez, complètement gratuitement.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: FileText,
    title: 'Devis détaillé',
    description:
      "Recevez un devis complet avec le détail des postes de dépenses, les matériaux, la main d'œuvre et les délais estimés.",
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: TrendingUp,
    title: 'Estimation précise',
    description:
      "Nos algorithmes prennent en compte votre localisation, l'état actuel et la qualité souhaitée pour une estimation au plus juste.",
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Users,
    title: 'Comparaison simple',
    description:
      "Comparez facilement avec les devis d'artisans. Notre estimation vous donne une base solide pour négocier.",
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
  },
]

export function Features() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Pourquoi utiliser RenovAI ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            La solution la plus rapide et fiable pour estimer vos travaux de
            rénovation
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-none shadow-lg transition-shadow hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
