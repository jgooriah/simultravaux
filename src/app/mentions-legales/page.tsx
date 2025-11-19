import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'

export default function MentionsLegalesPage() {
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

          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">Mentions légales</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">Éditeur du site</h2>
                <p>
                  SimuTravaux<br />
                  SARL au capital de 10 000 €<br />
                  Siège social : Paris, France<br />
                  SIRET : XXX XXX XXX XXXXX
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">Directeur de publication</h2>
                <p>Directeur : [Nom du directeur]</p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">Hébergement</h2>
                <p>
                  Vercel Inc.<br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789, USA
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">Propriété intellectuelle</h2>
                <p>
                  L'ensemble de ce site relève de la législation française et internationale
                  sur le droit d'auteur et la propriété intellectuelle. Tous les droits de
                  reproduction sont réservés.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

