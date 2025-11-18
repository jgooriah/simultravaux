# 🚀 Guide de démarrage - RenovAI

## Étape 1: Initialisation du projet

### Créer le projet Next.js

```bash
# Avec pnpm (recommandé)
npx create-next-app@latest renovai --typescript --tailwind --app --src-dir --import-alias "@/*"

# Répondre aux questions:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ src/ directory: Yes
# ✓ App Router: Yes
# ✓ import alias: Yes (@/*)

cd renovai
```

### Installer les dépendances

```bash
# UI Components (shadcn/ui)
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react

# Forms & Validation
pnpm add react-hook-form zod @hookform/resolvers/zod

# Animations
pnpm add framer-motion

# IA (Claude)
pnpm add @anthropic-ai/sdk

# PDF Generation
pnpm add jspdf jspdf-autotable

# Dev dependencies
pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D prettier prettier-plugin-tailwindcss
```

## Étape 2: Configuration de shadcn/ui

```bash
# Initialiser shadcn/ui
npx shadcn-ui@latest init

# Configuration recommandée:
# Style: Default
# Base color: Slate
# CSS variables: Yes

# Installer les composants de base
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
```

## Étape 3: Configuration des fichiers

### .env.local
```env
# API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RenovAI

# Future: Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
```

### .env.example
```env
# API Keys
ANTHROPIC_API_KEY=

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RenovAI
```

### .gitignore (ajouter)
```
# Environment
.env*.local
.env.local

# IDE
.cursor/
.vscode/
*.swp
*.swo
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### tsconfig.json (vérifier)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### package.json (ajouter scripts)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

## Étape 4: Structure des dossiers

```bash
# Créer la structure
mkdir -p src/components/ui
mkdir -p src/components/landing
mkdir -p src/components/simulator
mkdir -p src/components/result
mkdir -p src/lib/ai
mkdir -p src/lib/pdf
mkdir -p src/types
mkdir -p src/data
mkdir -p src/app/api/estimate
mkdir -p src/app/api/pdf
mkdir -p src/app/simulator
mkdir -p src/app/result
mkdir -p public/images
```

## Étape 5: Fichiers utilitaires de base

### src/lib/utils.ts
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
```

## Étape 6: Démarrer le développement

```bash
# Lancer le serveur de dev
pnpm dev

# Ouvrir http://localhost:3000
```

## Étape 7: Copier les fichiers du projet

1. Copier `.cursorrules` à la racine du projet
2. Copier les fichiers de configuration
3. Créer les types de base
4. Créer les composants de la landing page

## Checklist de démarrage

- [ ] Projet Next.js créé
- [ ] Dépendances installées
- [ ] shadcn/ui configuré
- [ ] Variables d'environnement configurées
- [ ] Structure des dossiers créée
- [ ] Fichiers utilitaires créés
- [ ] Git initialisé
- [ ] Premier commit
- [ ] Serveur de dev lance sans erreur

## Prochaines étapes

Une fois le setup terminé, nous allons créer:

1. **Landing page** - Hero, Features, CTA
2. **Types & Data** - Définitions des types de travaux et questions
3. **Composants simulator** - Sélection et questionnaire
4. **API IA** - Intégration Claude pour estimation
5. **Page résultats** - Affichage et téléchargement PDF

## Aide

Si tu rencontres des problèmes:

1. Vérifie que Node.js >= 18 est installé: `node -v`
2. Utilise pnpm: `npm install -g pnpm`
3. Nettoie le cache si nécessaire: `pnpm store prune`
4. Supprime node_modules et réinstalle: `rm -rf node_modules && pnpm install`

🚀 **Let's build!**
