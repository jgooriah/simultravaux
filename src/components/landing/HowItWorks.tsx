import { MousePointer, MessageSquare, Brain, FileDown } from 'lucide-react'

const steps = [
  {
    icon: MousePointer,
    title: 'Choisissez vos travaux',
    description:
      'Sélectionnez le type de travaux que vous souhaitez réaliser parmi nos nombreuses catégories.',
    color: 'from-blue-500 to-blue-600',
    number: '01',
  },
  {
    icon: MessageSquare,
    title: 'Répondez aux questions',
    description:
      'Décrivez votre projet en quelques questions simples sur la surface, l\'état actuel et vos préférences.',
    color: 'from-orange-500 to-orange-600',
    number: '02',
  },
  {
    icon: Brain,
    title: 'IA analyse votre projet',
    description:
      'Notre intelligence artificielle calcule une estimation précise en analysant des milliers de projets similaires.',
    color: 'from-green-500 to-green-600',
    number: '03',
  },
  {
    icon: FileDown,
    title: 'Téléchargez votre devis',
    description:
      'Recevez instantanément un devis détaillé au format PDF avec tous les détails de l\'estimation.',
    color: 'from-purple-500 to-purple-600',
    number: '04',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Comment ça marche ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Un processus simple en 4 étapes pour obtenir votre estimation
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 to-purple-200 lg:block" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center gap-8 lg:flex-row ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      isEven ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                      <div
                        className={`mb-4 inline-block text-5xl font-bold text-gray-200 ${
                          isEven ? 'lg:float-right' : 'lg:float-left'
                        }`}
                      >
                        {step.number}
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon in the middle */}
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg lg:h-24 lg:w-24">
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${step.color}`}
                    >
                      <Icon className="h-10 w-10 text-white lg:h-12 lg:w-12" />
                    </div>
                  </div>

                  {/* Spacer for layout */}
                  <div className="hidden w-5/12 lg:block" />
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
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
