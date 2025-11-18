import {
  Sparkles,
  Clock,
  Shield,
  FileText,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const estimationFeatures = [
  {
    icon: Sparkles,
    title: 'Estimation par IA',
    description:
      'Analyse poussée des réponses et des prix du marché 2025 pour un résultat ultra réaliste.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Clock,
    title: 'Résultat instantané',
    description:
      'Moins de 3 minutes pour recevoir une fourchette de prix détaillée et actionnable.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Shield,
    title: '100% gratuit',
    description:
      'Aucun paiement requis. Utilisez le simulateur autant de fois que nécessaire.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
]

const analysePhotoFeatures = [
  {
    icon: FileText,
    title: 'Devis décomposé',
    description:
      'Chaque poste est détaillé (main d’œuvre, matériaux, préparation, finitions).',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: TrendingUp,
    title: 'Facteurs clés identifiés',
    description:
      'Comprenez ce qui influe le plus sur votre budget pour arbitrer sereinement.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Users,
    title: 'Comparaison facilitée',
    description:
      'Servez-vous de l’estimation comme base solide pour challenger vos devis artisans.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
  },
]

export function Features() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div id="estimation-ia" className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Estimation IA
          </p>
          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Pourquoi choisir SimuTravaux ?
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Une technologie fiable qui s’adapte à chaque projet de rénovation.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {estimationFeatures.map((feature) => {
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

        <div id="analyse-photo" className="mt-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Analyse photo IA (bientôt)
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            Préparez-vous à aller encore plus loin
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Uploadez vos photos, laissez l’IA identifier l’état du chantier et
            ajuster automatiquement le devis.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {analysePhotoFeatures.map((feature) => {
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

