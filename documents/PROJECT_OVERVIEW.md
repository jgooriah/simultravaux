# 🏗️ RenovAI - Simulateur de Travaux avec IA

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║              🚀 PROJET COMPLET ET PRÊT À DÉMARRER           ║
║                                                              ║
║   Un simulateur moderne d'estimation de travaux avec IA     ║
║                    Next.js 14 + TypeScript                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## 🎯 Qu'est-ce que RenovAI ?

Une application web qui permet aux particuliers d'obtenir **instantanément** une estimation détaillée de leurs travaux de rénovation grâce à l'IA.

### ✨ Les Points Forts

```
🤖 IA INTÉGRÉE          📱 MOBILE-FIRST         ⚡ ULTRA-RAPIDE
   Claude API              Design moderne           < 5 secondes
   Estimations               100% responsive         d'estimation
   précises                  
```

## 📦 Ce Que Tu Reçois

### 📚 Documentation Complète (5 fichiers)
```
├─ 📘 GETTING_STARTED.md    → Commence ici ! ⭐
├─ 📘 PROJECT_SPECS.md      → Vision complète
├─ 📘 SETUP_GUIDE.md        → Guide d'installation
├─ 📘 MVP_PLAN.md           → Plan de dev 4 semaines
└─ 📘 README.md             → Doc officielle
```

### ⚙️ Configuration Prête (5 fichiers)
```
├─ ⚙️ .cursorrules          → Règles Cursor ⭐
├─ ⚙️ package.json          → Dépendances
├─ ⚙️ .env.example          → Variables env
├─ ⚙️ .prettierrc           → Formatage
└─ ⚙️ quick-start.sh        → Setup auto
```

### 💻 Code Fonctionnel (11 fichiers)
```
├─ 📦 Types (2)
│  ├─ work-types.ts         → 15+ types de travaux
│  └─ questionnaire.ts      → Questions & estimation
│
├─ 📊 Données (1)
│  └─ questionnaires-data.ts → 3 questionnaires complets
│
├─ 🎨 Composants (3)
│  ├─ Hero.tsx              → Landing page moderne
│  ├─ Features.tsx          → Section avantages
│  └─ HowItWorks.tsx        → Explication du process
│
└─ 🤖 IA (3)
   ├─ estimator.ts          → Logique estimation ⭐
   ├─ prompts.ts            → Prompts Claude ⭐
   └─ api/route.ts          → API endpoint
```

## 🎨 Stack Technique

```
┌─────────────────────────────────────────────────┐
│  Frontend                                       │
│  ├─ Next.js 14 (App Router)                   │
│  ├─ TypeScript (strict mode)                  │
│  ├─ Tailwind CSS                               │
│  ├─ shadcn/ui (composants)                    │
│  ├─ Framer Motion (animations)                │
│  └─ React Hook Form + Zod                     │
│                                                 │
│  Backend & IA                                   │
│  ├─ Next.js API Routes                        │
│  ├─ Claude API (Anthropic)                    │
│  └─ jsPDF (génération PDF)                    │
│                                                 │
│  Future (Phase 2)                               │
│  └─ Supabase (auth + database)                │
└─────────────────────────────────────────────────┘
```

## 🚀 Démarrage en 3 Étapes

### Étape 1 : Setup Initial (5 minutes)
```bash
# Option A : Automatique
chmod +x quick-start.sh
./quick-start.sh

# Option B : Manuel
npx create-next-app@latest renovai --typescript --tailwind --app
cd renovai
pnpm install [dépendances]
```

### Étape 2 : Configuration (5 minutes)
```bash
# Copier les fichiers
cp .cursorrules renovai/
cp .env.example renovai/.env.local
# Ajouter ANTHROPIC_API_KEY dans .env.local

# Copier le code source
cp work-types.ts renovai/src/types/
cp questionnaire.ts renovai/src/types/
[etc.]
```

### Étape 3 : Lancement (1 minute)
```bash
cd renovai
pnpm dev
# Ouvrir http://localhost:3000
```

## 📅 Planning de Développement

```
Semaine 1   │ ████████░░░░░░░░░░░░░░░░ │ Landing Page
Semaine 2   │ ████████████░░░░░░░░░░░░ │ Sélection + Questionnaire
Semaine 3   │ ████████████████░░░░░░░░ │ IA + Résultats
Semaine 4   │ ████████████████████████ │ PDF + Deploy
            └──────────────────────────┘
            MVP COMPLET ! 🎉
```

### Ce Qui Est Inclus dans le MVP
```
✅ Landing page attractive
✅ Sélection de 15+ types de travaux
✅ Questionnaire dynamique
✅ Estimation par IA (Claude)
✅ Résultat détaillé
✅ Génération PDF
✅ 100% responsive
```

### Ce Qui Vient Après
```
📌 Phase 2 : Auth + Historique (Supabase)
📌 Phase 3 : Photos + Comparateur
📌 Phase 4 : Marketplace artisans
```

## 🎯 Fonctionnalités Clés

### Pour l'Utilisateur
```
1. Choisit son type de travaux
2. Répond à 10-15 questions simples
3. Obtient une estimation en < 5 secondes
4. Télécharge un PDF professionnel
```

### Types de Travaux Disponibles
```
🎨 Peinture & Revêtements     🔌 Électricité
   • Intérieur                   • Rénovation
   • Extérieur                   • Domotique
   • Papier peint

🔲 Sols & Carrelage           🪟 Menuiserie
   • Carrelage                   • Fenêtres
   • Parquet                     • Portes

💧 Plomberie                  🏠 Isolation
   • Salle de bain               • Combles
   • Cuisine                     • Murs
   • Chaudière                   • Pompe à chaleur
```

## 🤖 Puissance de l'IA

### Ce Que Claude Analyse
```
✓ Type et surface des travaux
✓ État actuel du bien
✓ Qualité souhaitée (standard/premium)
✓ Localisation (coefficient régional)
✓ Complexité et contraintes
✓ Délais et urgence
```

### Ce Que Tu Obtiens
```
💰 Fourchette de prix (min/max/moyen)
📊 Détail des postes de dépenses
🎯 Facteurs influençant le prix
⏱️ Délai estimé
💡 Conseils personnalisés
🎁 Aides financières possibles
```

## 📊 Métriques de Succès

### Technique
```
⚡ Lighthouse Score     > 90
🚀 First Paint          < 1.5s
📱 Mobile-friendly      100%
♿ Accessibilité        WCAG AA
```

### Utilisateur (Post-Launch)
```
🎯 Taux de complétion   > 70%
⏱️ Temps moyen         < 3 min
⭐ Satisfaction        > 4/5
```

## 🛠️ Développement

### Commandes Essentielles
```bash
pnpm dev          # Dev server
pnpm build        # Build production
pnpm lint         # Linting
pnpm format       # Formatage auto
pnpm type-check   # Vérif TypeScript
```

### Architecture
```
renovai/
├── src/
│   ├── app/              # Pages & API routes
│   ├── components/       # Composants React
│   │   ├── ui/          # shadcn/ui
│   │   ├── landing/     # Landing page
│   │   ├── simulator/   # Questionnaire
│   │   └── result/      # Résultats
│   ├── lib/             # Logique métier
│   │   ├── ai/         # IA & prompts
│   │   └── pdf/        # Génération PDF
│   ├── types/           # Types TypeScript
│   └── data/            # Configuration
└── public/              # Assets statiques
```

## 💡 Points d'Attention

### Avant de Démarrer
```
⚠️ Node.js >= 18 requis
⚠️ Clé API Anthropic nécessaire
⚠️ Suivre .cursorrules pour le code
⚠️ Lire GETTING_STARTED.md en premier
```

### Bonnes Pratiques
```
✅ TypeScript strict (pas de 'any')
✅ Server Components par défaut
✅ Tailwind pour le CSS
✅ Commits conventionnels
✅ Tests manuels réguliers
```

## 📈 Évolution du Projet

### MVP Actuel
```
Objectif : Validation du concept
Durée   : 3-4 semaines
Public  : Early adopters
```

### Phase 2 (1-2 mois)
```
+ Authentification Supabase
+ Sauvegarde des estimations
+ Historique utilisateur
+ Dashboard personnel
```

### Phase 3 (2-3 mois)
```
+ Upload & analyse de photos
+ Comparateur de devis
+ Suggestions d'artisans
+ Système de notation
```

### Phase 4 (3-6 mois)
```
+ Marketplace complète
+ Profils professionnels
+ Gestion de projets
+ Paiement intégré
```

## 🎓 Ressources

### Documentation Officielle
```
📖 Next.js      → nextjs.org/docs
📖 Tailwind     → tailwindcss.com/docs
📖 shadcn/ui    → ui.shadcn.com
📖 Anthropic    → docs.anthropic.com
📖 TypeScript   → typescriptlang.org/docs
```

### Support
```
💬 Questions code     → .cursorrules
💬 Setup              → SETUP_GUIDE.md
💬 Planning           → MVP_PLAN.md
💬 Problèmes          → GETTING_STARTED.md
```

## 🏆 Objectif Final

```
┌─────────────────────────────────────────┐
│                                         │
│   Créer LA référence en France pour    │
│   l'estimation de travaux en ligne     │
│                                         │
│   • Précision maximale                  │
│   • Expérience utilisateur parfaite    │
│   • Technologie de pointe              │
│   • Évolutivité assurée                │
│                                         │
└─────────────────────────────────────────┘
```

## 🎉 Tu es Prêt !

```
┌──────────────────────────────────┐
│                                  │
│   📦 20 fichiers fournis        │
│   📚 Documentation complète      │
│   💻 Code prêt à l'emploi       │
│   🤖 IA intégrée                │
│   🎨 Design moderne             │
│   🚀 MVP en 3-4 semaines        │
│                                  │
│   → Commence par                 │
│     GETTING_STARTED.md          │
│                                  │
└──────────────────────────────────┘
```

---

**Créé avec ❤️ pour GoPaaS**

*Questions ? Consulte les docs ou demande de l'aide !*
