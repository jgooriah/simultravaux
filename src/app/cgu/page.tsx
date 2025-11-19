import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'

export default function CGUPage() {
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
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Conditions Générales d'Utilisation
            </h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. Objet</h2>
                <p>
                  Les présentes conditions générales d'utilisation (CGU) ont pour objet de
                  définir les modalités et conditions dans lesquelles SimuTravaux met à
                  disposition de ses utilisateurs son service d'estimation de travaux.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. Acceptation des CGU</h2>
                <p>
                  L'utilisation du site SimuTravaux implique l'acceptation pleine et entière
                  des présentes CGU.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Services proposés</h2>
                <p>
                  SimuTravaux propose un service gratuit d'estimation de travaux de rénovation
                  basé sur l'intelligence artificielle. Les estimations fournies sont indicatives
                  et ne constituent pas un devis contractuel.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Responsabilités</h2>
                <p>
                  SimuTravaux ne saurait être tenu responsable de l'inexactitude des estimations
                  fournies. Il appartient à l'utilisateur de faire appel à des professionnels
                  pour obtenir des devis précis.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">5. Données personnelles</h2>
                <p>
                  Les données personnelles collectées sont traitées conformément à notre
                  politique de confidentialité.
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

