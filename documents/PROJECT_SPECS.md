# 🏗️ Simulateur de Travaux avec IA

## Vue d'ensemble du projet

**Nom du projet**: RenovAI - Simulateur de Travaux Intelligent

**Description**: Une plateforme web moderne permettant aux particuliers d'obtenir une estimation instantanée et intelligente de leurs travaux de rénovation grâce à l'IA.

## 🎯 Objectifs du MVP

### Fonctionnalités principales
1. **Landing Page attractive** avec présentation du service
2. **Sélection du type de travaux** (catégories intuitives)
3. **Questionnaire dynamique** adapté au type de travaux
4. **Estimation par IA** avec fourchette de prix détaillée
5. **Téléchargement du devis** en PDF
6. **Design moderne et responsive** (mobile-first)

### Fonctionnalités futures (Phase 2+)
- Authentification utilisateur (Supabase)
- Historique des simulations
- Upload de photos pour analyse IA
- Comparaison de devis
- Mise en relation avec artisans
- Tableau de bord admin
- Analytics

## 🛠️ Stack technique

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icônes**: Lucide React
- **Forms**: React Hook Form + Zod

### Backend & Services
- **API Routes**: Next.js API Routes
- **IA**: Claude API (Anthropic)
- **Base de données**: Supabase (Phase 2)
- **Storage**: Supabase Storage (Phase 2)
- **PDF Generation**: jsPDF ou react-pdf

### Dev Tools
- **IDE**: Cursor
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Git**: GitHub

## 📋 Types de travaux disponibles (MVP)

1. **Peinture & Revêtements**
   - Peinture intérieure/extérieure
   - Pose de papier peint
   - Revêtements muraux

2. **Sols & Carrelage**
   - Pose de carrelage
   - Parquet/stratifié
   - Revêtements souples

3. **Plomberie & Sanitaires**
   - Rénovation salle de bain
   - Installation cuisine
   - Remplacement chaudière

4. **Électricité**
   - Rénovation électrique
   - Installation domotique
   - Éclairage

5. **Menuiserie**
   - Changement fenêtres
   - Portes intérieures
   - Volets

6. **Isolation & Chauffage**
   - Isolation combles
   - Isolation murs
   - Pompe à chaleur

## 🎨 Design & UX

### Charte graphique
- **Couleurs primaires**: Bleu moderne (#2563EB), Orange accent (#F97316)
- **Couleurs secondaires**: Gris neutres, Blanc
- **Typographie**: Inter (headings), System fonts (body)
- **Style**: Moderne, épuré, professionnel

### Parcours utilisateur
1. Landing page → CTA "Estimer mes travaux"
2. Sélection du type de travaux (cards visuelles)
3. Questionnaire progressif (stepper)
4. Traitement IA (loader animé)
5. Résultat avec détails (fourchette, breakdown)
6. Actions: Télécharger PDF, Nouvelle simulation

## 🧮 Système d'estimation IA

### Prompt engineering
L'IA analysera:
- Type de travaux
- Surface/dimensions
- État actuel
- Qualité souhaitée (standard/premium)
- Localisation (coefficient régional)
- Complexité (accès, contraintes)

### Format de réponse
```json
{
  "estimation": {
    "min": 2500,
    "max": 3500,
    "moyen": 3000
  },
  "details": [
    {
      "poste": "Main d'œuvre",
      "montant": 1500,
      "description": "..."
    },
    {
      "poste": "Matériaux",
      "montant": 1200,
      "description": "..."
    }
  ],
  "facteurs": ["Complexité d'accès", "Qualité premium"],
  "delai": "2-3 semaines",
  "conseils": ["Conseil 1", "Conseil 2"]
}
```

## 📁 Structure du projet

```
renovai/
├── .cursorrules              # Règles pour Cursor
├── .env.local               # Variables d'environnement
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Landing page
│   │   ├── simulator/
│   │   │   ├── page.tsx      # Choix du type
│   │   │   └── [type]/
│   │   │       └── page.tsx  # Questionnaire
│   │   ├── result/
│   │   │   └── page.tsx      # Résultat estimation
│   │   └── api/
│   │       ├── estimate/
│   │       │   └── route.ts  # API estimation IA
│   │       └── pdf/
│   │           └── route.ts  # Génération PDF
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── CTA.tsx
│   │   ├── simulator/
│   │   │   ├── TypeSelector.tsx
│   │   │   ├── QuestionStep.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── EstimateLoader.tsx
│   │   └── result/
│   │       ├── PriceCard.tsx
│   │       ├── BreakdownTable.tsx
│   │       └── DownloadButton.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── ai/
│   │   │   ├── estimator.ts  # Logique estimation IA
│   │   │   └── prompts.ts    # Prompts Claude
│   │   └── pdf/
│   │       └── generator.ts  # Génération PDF
│   ├── types/
│   │   ├── work-types.ts
│   │   ├── questionnaire.ts
│   │   └── estimate.ts
│   └── data/
│       ├── work-types.ts     # Config types de travaux
│       └── questions.ts      # Questions par type
└── README.md
```

## 🚀 Roadmap MVP (3-4 semaines)

### Semaine 1: Foundation
- [x] Setup projet Next.js + TypeScript
- [x] Configuration Tailwind + shadcn/ui
- [x] Structure de base
- [ ] Landing page complète
- [ ] Routing et navigation

### Semaine 2: Core Features
- [ ] Sélecteur de types de travaux
- [ ] Système de questionnaire dynamique
- [ ] Intégration API Claude
- [ ] Logique d'estimation

### Semaine 3: Results & Polish
- [ ] Page de résultats
- [ ] Génération PDF
- [ ] Animations et transitions
- [ ] Responsive design

### Semaine 4: Testing & Deploy
- [ ] Tests utilisateurs
- [ ] Optimisations performance
- [ ] SEO basique
- [ ] Déploiement Vercel

## 📊 Métriques de succès

- **Performance**: Score Lighthouse > 90
- **UX**: Taux de complétion > 70%
- **Précision**: Estimations dans ±20% du réel
- **Vitesse**: Résultat en < 5 secondes

## 🔐 Variables d'environnement

```env
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📝 Notes importantes

- Priorité à l'expérience utilisateur
- Mobile-first approach
- Code propre et maintenable
- Documentation inline
- Accessibilité (WCAG AA minimum)
