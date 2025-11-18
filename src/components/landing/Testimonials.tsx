import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Marie Dubois',
    city: 'Paris',
    project: 'Rénovation salle de bain',
    feedback:
      "L'estimation était très proche du devis final de mon artisan. Outil idéal pour budgétiser avant de contacter les pros.",
  },
  {
    name: 'Thomas Martin',
    city: 'Lyon',
    project: 'Rénovation cuisine',
    feedback:
      'Simple, rapide et clair. J’ai pu comparer facilement avec trois devis et SimuTravaux était dans la moyenne.',
  },
  {
    name: 'Sophie Bernard',
    city: 'Toulouse',
    project: 'Peinture intérieure',
    feedback:
      'Excellente base de discussion avec les artisans. La décomposition des coûts m’a permis de négocier sereinement.',
  },
]

export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Ils nous font confiance
          </p>
          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Utilisé partout en France
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Des milliers de particuliers ont déjà validé l’efficacité de SimuTravaux.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border border-gray-100 shadow-md transition hover:-translate-y-1 hover:border-blue-200"
            >
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  {testimonial.name}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {testimonial.city} • {testimonial.project}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">“{testimonial.feedback}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


