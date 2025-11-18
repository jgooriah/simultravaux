import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WORK_TYPES, getCategoryById } from '@/types/work-types'
import { Button } from '@/components/ui/button'

const featuredWorkTypes = WORK_TYPES.slice(0, 8)

export function WorkTypeGrid() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Tous vos projets
          </p>
          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Sélectionnez votre type de travaux
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            15+ types de rénovations couverts avec des questionnaires adaptés.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredWorkTypes.map((workType) => {
            const category = getCategoryById(workType.categoryId)
            return (
              <Card
                key={workType.id}
                className="flex h-full flex-col border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-3 text-sm font-medium text-blue-600">
                    {category?.name}
                  </div>
                  <CardTitle className="text-2xl text-gray-900">
                    {workType.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{workType.description}</p>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">
                      Fourchette moyenne
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {workType.averagePriceRange.min} - {workType.averagePriceRange.max}{' '}
                      {workType.averagePriceRange.unit}
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/simulator?workType=${workType.id}`}>
                      Obtenir une estimation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}


