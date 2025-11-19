# 🏗️ RenovAI - Simulateur de Travaux avec IA

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

Une application web moderne permettant aux particuliers d'obtenir des estimations instantanées et précises de leurs travaux de rénovation grâce à l'intelligence artificielle.

## ✨ Fonctionnalités

### MVP (Phase 1)
- 🎨 **Landing page attractive** - Design moderne et responsive
- 🏗️ **Sélection de travaux** - 6 catégories principales, 15+ types de travaux
- 📝 **Questionnaire dynamique** - Questions adaptées à chaque type de travaux
- 🤖 **Estimation par IA** - Utilisation de Claude (Anthropic) pour des estimations précises
- 💰 **Fourchette de prix détaillée** - Min, max, moyen + détail des postes
- 📄 **Génération PDF** - Téléchargement du devis
- 📱 **100% Responsive** - Mobile-first design

### Futures fonctionnalités (Phase 2+)
- 🔐 Authentification utilisateur (Supabase)
- 📊 Historique des estimations
- 📸 Upload de photos pour analyse IA
- 🔍 Comparaison de devis
- 👷 Mise en relation avec artisans
- 📈 Analytics et tableau de bord admin

## 🚀 Stack Technique

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend & Services
- **API**: Next.js API Routes
- **IA**: Claude API ([Anthropic](https://www.anthropic.com/))
- **Database**: Supabase (Phase 2)
- **PDF**: jsPDF

## 📦 Installation

### Prérequis
- Node.js 18+
- pnpm (recommandé) ou npm

### Setup

1. **Cloner le projet**
```bash
git clone https://github.com/votre-username/renovai.git
cd renovai
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Éditer `.env.local` et ajouter vos clés API:
```env
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Lancer le serveur de développement**
```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
renovai/
├── .cursorrules              # Règles Cursor AI
├── public/
│   ├── images/               # Images statiques
│   └── icons/                # Icônes
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Landing page
│   │   ├── simulator/        # Pages du simulateur
│   │   ├── result/           # Page de résultats
│   │   └── api/              # API Routes
│   │       ├── estimate/     # Endpoint estimation
│   │       └── pdf/          # Génération PDF
│   ├── components/
│   │   ├── ui/               # Composants shadcn/ui
│   │   ├── landing/          # Composants landing page
│   │   ├── simulator/        # Composants simulateur
│   │   └── result/           # Composants résultats
│   ├── lib/
│   │   ├── utils.ts          # Utilitaires
│   │   ├── ai/               # Logique IA
│   │   └── pdf/              # Génération PDF
│   ├── types/
│   │   ├── work-types.ts     # Types de travaux
│   │   ├── questionnaire.ts  # Types questionnaire
│   │   └── estimate.ts       # Types estimation
│   └── data/
│       ├── work-types.ts     # Configuration travaux
│       └── questions.ts      # Questions
└── README.md
```

## 🎨 Développement

### Scripts disponibles

```bash
# Développement
pnpm dev

# Build production
pnpm build

# Démarrer en production
pnpm start

# Linting
pnpm lint

# Formatage du code
pnpm format

# Type checking
pnpm type-check
```

### Conventions de code

Le projet utilise des conventions strictes définies dans `.cursorrules`:

- ✅ TypeScript strict (pas de `any`)
- ✅ Composants fonctionnels React
- ✅ Server Components par défaut
- ✅ Tailwind CSS pour le styling
- ✅ Prettier pour le formatage
- ✅ Commits conventionnels

## 🤖 Intégration IA

### Claude API

L'estimation utilise Claude d'Anthropic pour analyser les réponses du questionnaire et générer:
- Fourchette de prix (min, max, moyen)
- Détail des postes de dépenses
- Facteurs influençant le prix
- Délais estimés
- Conseils personnalisés

### Prompt Engineering

Les prompts sont optimisés pour:
- Prendre en compte la localisation (coefficient régional)
- Analyser la complexité des travaux
- Évaluer la qualité souhaitée
- Considérer l'état actuel

## 📊 Types de Travaux Disponibles

### Catégories principales

1. **Peinture & Revêtements**
   - Peinture intérieure/extérieure
   - Papier peint

2. **Sols & Carrelage**
   - Carrelage sol/mural
   - Parquet

3. **Plomberie & Sanitaires**
   - Rénovation salle de bain
   - Installation cuisine
   - Chaudière

4. **Électricité**
   - Rénovation électrique
   - Domotique

5. **Menuiserie**
   - Fenêtres
   - Portes intérieures

6. **Isolation & Chauffage**
   - Isolation combles/murs
   - Pompe à chaleur

## 🚧 Roadmap

### Phase 1 - MVP (En cours) ✅
- [x] Setup projet
- [x] Landing page
- [ ] Sélecteur de travaux
- [ ] Système de questionnaire
- [ ] Intégration IA
- [ ] Page de résultats
- [ ] Génération PDF
- [ ] Déploiement

### Phase 2 - Auth & Historique
- [ ] Intégration Supabase
- [ ] Authentification
- [ ] Sauvegarde des estimations
- [ ] Historique utilisateur

### Phase 3 - Features avancées
- [ ] Upload photos
- [ ] Analyse IA des photos
- [ ] Comparateur de devis
- [ ] Suggestions d'artisans

### Phase 4 - Marketplace
- [ ] Profils artisans
- [ ] Système de mise en relation
- [ ] Avis et notations
- [ ] Paiement intégré

## 🧪 Tests

```bash
# Tests unitaires (à venir)
pnpm test

# Tests E2E (à venir)
pnpm test:e2e

# Coverage (à venir)
pnpm test:coverage
```

## 📈 Performance

Objectifs:
- ⚡ Lighthouse Score > 90
- 🎯 First Contentful Paint < 1.5s
- 📱 Mobile-first & Responsive
- ♿ Accessibilité WCAG AA

## 🔐 Sécurité

- ✅ Variables d'environnement pour les secrets
- ✅ Validation des inputs (Zod)
- ✅ Sanitization des données
- ✅ Rate limiting (à venir)
- ✅ HTTPS en production

## 📝 License

MIT

## 🤝 Contributing

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📧 Contact

- **Email**: support@renovai.fr
- **Website**: https://renovai.fr

## 🙏 Remerciements

- [Anthropic](https://www.anthropic.com/) pour Claude AI
- [Vercel](https://vercel.com/) pour l'hébergement
- [shadcn](https://ui.shadcn.com/) pour les composants UI

---

Fait avec ❤️ par l'équipe RenovAI
