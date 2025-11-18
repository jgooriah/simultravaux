import { MousePointer, MessageSquare, Brain } from 'lucide-react'

const steps = [
  {
    icon: MousePointer,
    title: 'Choisissez votre projet',
    description:
      'Sélectionnez le type de travaux parmi nos catégories (salle de bain, peinture, électricité...).',
    number: '01',
  },
  {
    icon: MessageSquare,
    title: 'Répondez au questionnaire',
    description:
      'Surface, état actuel, qualité souhaitée... Quelques questions suffisent pour contextualiser votre besoin.',
    number: '02',
  },
  {
    icon: Brain,
    title: 'Recevez votre estimation',
    description:
      'Notre IA calcule instantanément une fourchette de prix réaliste avec détails, facteurs et conseils.',
    number: '03',
  },
]

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Comment ça marche ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Un processus simple en 4 étapes pour obtenir votre estimation
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="rounded-2xl bg-white p-8 text-center shadow-lg"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-8 w-8" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                  {step.number}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/simulator"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Commencer mon estimation
          </a>
        </div>
      </div>
    </section>
  )
}
