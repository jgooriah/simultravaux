import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserMenu } from './UserMenu'

const links = [
  { href: '#hero', label: 'Accueil' },
  { href: '/select-work', label: 'Simulateur' },
  { href: '#estimation-ia', label: 'Estimation IA' },
  { href: '#analyse-photo', label: 'Analyse Photo IA' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/maquettes', label: 'Maquettes' },
  { href: '#comment-ca-marche', label: 'Comment ça marche ?' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-semibold text-gray-900">
          SimuTravaux
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/select-work">Commencer</Link>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}


