import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'RenovAI - Simulateur de travaux avec IA',
  description:
    'Estimez le coût de vos travaux de rénovation grâce à l’intelligence artificielle.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}


