import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'

export default function ConfidentialitePage() {
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
              Politique de Confidentialité
            </h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  1. Collecte des données
                </h2>
                <p>
                  SimuTravaux collecte les données personnelles suivantes :
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Données de navigation</li>
                  <li>Informations relatives aux projets de travaux</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  2. Utilisation des données
                </h2>
                <p>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1">
                  <li>Fournir le service d'estimation</li>
                  <li>Améliorer nos services</li>
                  <li>Vous contacter si nécessaire</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  3. Conservation des données
                </h2>
                <p>
                  Vos données sont conservées pendant la durée nécessaire aux finalités pour
                  lesquelles elles ont été collectées, conformément à la réglementation en
                  vigueur.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
                  d'effacement, de limitation, d'opposition et de portabilité de vos données.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">5. Contact</h2>
                <p>
                  Pour exercer vos droits, contactez-nous à : contact@simutravaux.fr
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

