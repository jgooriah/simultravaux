import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'

export default function BlogPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">Blog</h1>
            <p className="text-lg text-gray-600">
              Le blog SimuTravaux arrive bientôt avec des conseils, astuces et guides pour
              tous vos projets de rénovation.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

