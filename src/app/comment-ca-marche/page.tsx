"use client"

import Link from 'next/link'
import { ArrowRight, Check, Sparkles, Camera, FileText, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function CommentCaMarchePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="border-b border-white/20 bg-white/80 shadow-lg backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
              Comment ça marche ?
            </h1>
            <p className="text-xl text-gray-600">
              Obtenez une estimation précise en quelques minutes
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Les 3 méthodes */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Choisissez votre méthode d'estimation
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Méthode 1 : Chat IA */}
            <Card className="bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100 shadow-lg">
                  <Bot className="h-10 w-10 text-purple-600" />
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
                Chat IA
              </h3>
              <p className="mb-6 text-center text-sm text-gray-600">
                Conversation naturelle avec notre intelligence artificielle
              </p>
              <ul className="mb-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Discutez naturellement de votre projet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>L'IA pose des questions pertinentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Estimation en temps réel</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Gratuit et sans inscription</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                <Link href="/chat">
                  Essayer le Chat IA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            {/* Méthode 2 : Analyse Photo */}
            <Card className="bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg">
                  <Camera className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
                Analyse Photo IA
              </h3>
              <p className="mb-6 text-center text-sm text-gray-600">
                Analyse visuelle automatique de votre espace
              </p>
              <ul className="mb-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Uploadez une photo de votre espace</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>L'IA analyse automatiquement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Détection de l'état et des matériaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Connexion requise (gratuite)</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                <Link href="/analyse-photo">
                  Analyser une photo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            {/* Méthode 3 : Simulateur Manuel */}
            <Card className="bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg">
                  <FileText className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
                Simulateur Manuel
              </h3>
              <p className="mb-6 text-center text-sm text-gray-600">
                Questionnaire détaillé guidé pas à pas
              </p>
              <ul className="mb-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Choisissez votre type de travaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Répondez à 5 questions simples</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Estimation détaillée et personnalisée</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Gratuit et rapide (3 min)</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                <Link href="/select-work">
                  Commencer le simulateur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* Étapes détaillées (exemple avec Simulateur Manuel) */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Le processus en détail (Simulateur Manuel)
          </h2>

          <div className="mx-auto max-w-4xl space-y-8">
            {/* Étape 1 */}
            <Card className="flex items-start gap-6 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-2xl font-bold text-white shadow-lg">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Sélectionnez votre type de travaux
                </h3>
                <p className="text-gray-600">
                  Choisissez parmi 12 catégories : cuisine, salle de bain, peinture, sol, isolation, toiture, 
                  électricité, plomberie, chauffage, fenêtres, extension ou rénovation complète.
                </p>
              </div>
            </Card>

            {/* Étape 2 */}
            <Card className="flex items-start gap-6 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-2xl font-bold text-white shadow-lg">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Répondez au questionnaire
                </h3>
                <p className="text-gray-600">
                  5 questions simples et rapides adaptées à votre projet : surface, type de rénovation, 
                  qualité des matériaux, code postal et délai souhaité.
                </p>
              </div>
            </Card>

            {/* Étape 3 */}
            <Card className="flex items-start gap-6 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-2xl font-bold text-white shadow-lg">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Obtenez votre estimation détaillée
                </h3>
                <p className="text-gray-600">
                  Recevez instantanément une fourchette de prix avec décomposition (main d'œuvre, matériaux, TVA), 
                  durée estimée, niveau de complexité et conseils personnalisés.
                </p>
              </div>
            </Card>

            {/* Étape 4 */}
            <Card className="flex items-start gap-6 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-2xl font-bold text-white shadow-lg">
                4
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Sauvegardez ou partagez
                </h3>
                <p className="text-gray-600">
                  Créez un compte gratuit pour sauvegarder vos estimations, les comparer, ou partagez-les 
                  directement avec vos proches ou artisans.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ / Points clés */}
        <div>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Points importants à savoir
          </h2>

          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            <Card className="bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold">100% Gratuit</h3>
              </div>
              <p className="text-sm text-gray-600">
                Toutes nos estimations sont entièrement gratuites et sans engagement. Aucune carte bancaire requise.
              </p>
            </Card>

            <Card className="bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold">Estimation indicative</h3>
              </div>
              <p className="text-sm text-gray-600">
                Nos estimations sont basées sur des moyennes nationales. Demandez toujours plusieurs devis professionnels.
              </p>
            </Card>

            <Card className="bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold">IA de pointe</h3>
              </div>
              <p className="text-sm text-gray-600">
                Notre Chat IA et Analyse Photo utilisent GPT-4 et GPT-4 Vision pour des estimations précises et contextuelles.
              </p>
            </Card>

            <Card className="bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold">Données sécurisées</h3>
              </div>
              <p className="text-sm text-gray-600">
                Vos données sont chiffrées et stockées en toute sécurité. Nous ne les partageons jamais avec des tiers.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Prêt à estimer vos travaux ?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Choisissez votre méthode préférée et obtenez votre estimation en quelques minutes
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link href="/simulateur">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

