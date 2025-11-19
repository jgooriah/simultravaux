"use client"

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WORK_TYPES, getCategoryById } from '@/types/work-types'
import { Footer } from '@/components/layout/Footer'

export default function SelectWorkPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
                Étape 1 sur 2
              </p>
              <h1 className="text-4xl font-bold text-gray-900">
                Sélectionnez votre type de travaux
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Choisissez le type de travaux pour lequel vous souhaitez obtenir une estimation.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WORK_TYPES.map((workType) => {
              const category = getCategoryById(workType.categoryId)
              return (
                <Link
                  key={workType.id}
                  href={`/simulator?workType=${workType.id}`}
                  className="group"
                >
                  <Card className="h-full border-2 border-gray-200 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-3 text-sm font-medium text-blue-600">
                        {category?.name}
                      </div>
                      <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600">
                        {workType.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{workType.description}</p>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400">
                          Fourchette moyenne
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {workType.averagePriceRange.min} - {workType.averagePriceRange.max}{' '}
                          {workType.averagePriceRange.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 transition-all group-hover:gap-3">
                        Démarrer le questionnaire
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 p-8 text-center text-white shadow-lg">
            <h2 className="text-2xl font-bold">Vous ne trouvez pas votre type de travaux ?</h2>
            <p className="mt-2 text-blue-50">
              Contactez-nous pour obtenir une estimation personnalisée
            </p>
            <Button asChild variant="secondary" className="mt-6" size="lg">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

