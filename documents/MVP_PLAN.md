# 🎯 Plan de Développement MVP - RenovAI

## Vue d'ensemble du MVP

Le MVP se concentre sur la fonctionnalité core : permettre à un utilisateur d'estimer le coût de ses travaux via un questionnaire intelligent et obtenir une estimation par IA.

## 📋 Fonctionnalités du MVP

### ✅ Ce qui est inclus dans le MVP

1. **Landing Page**
   - Hero avec CTA principal
   - Section features (6 avantages)
   - Section "Comment ça marche" (4 étapes)
   - Footer avec liens

2. **Simulateur de Travaux**
   - Page de sélection du type de travaux (grille de cards)
   - Questionnaire progressif avec stepper
   - Questions dynamiques basées sur le type sélectionné
   - Validation en temps réel
   - Navigation avant/arrière

3. **Estimation par IA**
   - Intégration Claude API
   - Analyse des réponses
   - Génération d'estimation détaillée
   - Calcul automatique min/max/moyen
   - Détail des postes de dépenses

4. **Page Résultat**
   - Affichage de l'estimation
   - Breakdown des coûts
   - Facteurs influençant le prix
   - Conseils personnalisés
   - Génération et téléchargement PDF

### ❌ Ce qui n'est PAS dans le MVP

- Authentification utilisateur
- Sauvegarde des estimations
- Upload de photos
- Comparaison de devis
- Base de données
- Backend complexe
- Mise en relation artisans

## 🗓️ Planning de Développement (3-4 semaines)

### Semaine 1 : Foundation & Landing

#### Jour 1-2 : Setup Initial
- [x] Initialiser projet Next.js 14
- [x] Configuration TypeScript
- [x] Setup Tailwind CSS
- [x] Installation shadcn/ui
- [x] Configuration environnement
- [x] Structure des dossiers
- [x] Git setup

#### Jour 3-5 : Landing Page
- [ ] Composant Hero avec animations
- [ ] Section Features
- [ ] Section "Comment ça marche"
- [ ] Footer
- [ ] Navigation responsive
- [ ] Animations Framer Motion
- [ ] Optimisation images

**Livrable S1** : Landing page complète et responsive

---

### Semaine 2 : Core Features

#### Jour 1-2 : Types & Data
- [ ] Finaliser tous les types TypeScript
- [ ] Créer les données des types de travaux
- [ ] Créer tous les questionnaires (15 types)
- [ ] Fonctions utilitaires
- [ ] Tests des types

#### Jour 3-4 : Page Sélection
- [ ] Composant TypeSelector (grille de cards)
- [ ] Filtres par catégorie
- [ ] Recherche
- [ ] Animations hover
- [ ] Routing vers questionnaire

#### Jour 5 : Questionnaire - Structure
- [ ] Layout questionnaire
- [ ] Composant Stepper
- [ ] Barre de progression
- [ ] Navigation step par step
- [ ] État du formulaire (React Hook Form)

**Livrable S2** : Sélection + structure questionnaire

---

### Semaine 3 : IA & Résultats

#### Jour 1-2 : Questions Dynamiques
- [ ] Composant pour chaque type de question
  - TextField
  - NumberField
  - Select
  - Radio
  - Checkbox
  - Range
- [ ] Validation Zod
- [ ] Messages d'erreur
- [ ] Questions conditionnelles

#### Jour 3-4 : Intégration IA
- [ ] Configuration Claude API
- [ ] Création des prompts
- [ ] Fonction d'estimation
- [ ] API Route `/api/estimate`
- [ ] Gestion des erreurs
- [ ] Loading states
- [ ] Tests de l'API

#### Jour 5 : Page Résultat
- [ ] Layout résultat
- [ ] Composant PriceCard
- [ ] Breakdown des coûts
- [ ] Facteurs et conseils
- [ ] Actions (nouvelle estimation, PDF)

**Livrable S3** : Questionnaire complet + estimation IA fonctionnelle

---

### Semaine 4 : Polish & Deploy

#### Jour 1-2 : Génération PDF
- [ ] Configuration jsPDF
- [ ] Template PDF professionnel
- [ ] Inclusion logo et branding
- [ ] Génération du devis
- [ ] API Route `/api/pdf`
- [ ] Bouton téléchargement

#### Jour 3 : Optimisations
- [ ] Performance (lazy loading, optimization)
- [ ] SEO basique (meta tags, sitemap)
- [ ] Accessibilité (WCAG AA)
- [ ] Tests manuels
- [ ] Corrections de bugs

#### Jour 4 : Déploiement
- [ ] Configuration Vercel
- [ ] Variables d'environnement production
- [ ] Build et test
- [ ] Déploiement
- [ ] Tests en production
- [ ] Configuration domaine

#### Jour 5 : Documentation
- [ ] README complet
- [ ] Documentation API
- [ ] Guide de maintenance
- [ ] Analytics setup (Google Analytics)

**Livrable S4** : Application complète déployée en production

## 🎨 Design System

### Couleurs
```typescript
primary: {
  50: '#eff6ff',
  500: '#2563eb',  // Blue principal
  600: '#1d4ed8',
}
accent: {
  500: '#f97316',  // Orange accent
  600: '#ea580c',
}
```

### Typographie
- **Headings**: Inter Bold (ou Poppins)
- **Body**: Inter Regular (ou System fonts)
- **Sizes**: text-sm, text-base, text-lg, text-xl, text-2xl, text-4xl, text-6xl

### Spacing
- Utiliser scale Tailwind: 4, 8, 12, 16, 20, 24, 32, 48, 64px
- Container max-width: 1280px
- Section padding: py-20 (desktop), py-12 (mobile)

## 🔧 Architecture Technique

### Composants Réutilisables à Créer

```
components/
├── ui/                      # shadcn/ui components
├── landing/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   └── Footer.tsx
├── simulator/
│   ├── TypeSelector.tsx     # Grille de sélection
│   ├── CategoryFilter.tsx   # Filtre catégories
│   ├── WorkTypeCard.tsx     # Card type de travaux
│   ├── Stepper.tsx          # Indicateur de progression
│   ├── ProgressBar.tsx      # Barre de progression
│   ├── QuestionStep.tsx     # Container step
│   ├── questions/
│   │   ├── TextField.tsx
│   │   ├── NumberField.tsx
│   │   ├── SelectField.tsx
│   │   ├── RadioField.tsx
│   │   ├── CheckboxField.tsx
│   │   └── RangeField.tsx
│   ├── Navigation.tsx       # Boutons précédent/suivant
│   └── EstimateLoader.tsx   # Loading pendant estimation
└── result/
    ├── PriceCard.tsx        # Card prix principal
    ├── PriceRange.tsx       # Fourchette min-max
    ├── BreakdownTable.tsx   # Détail postes
    ├── FactorsList.tsx      # Facteurs influençant
    ├── AdviceSection.tsx    # Conseils
    ├── AidesSection.tsx     # Aides financières
    └── ActionButtons.tsx    # Télécharger PDF, nouveau
```

### API Routes

```
app/api/
├── estimate/
│   └── route.ts            # POST - Génère estimation
└── pdf/
    └── route.ts            # POST - Génère PDF
```

### État et Data Flow

1. **Sélection type** → State local (workTypeId)
2. **Questionnaire** → React Hook Form (answers)
3. **Soumission** → POST /api/estimate
4. **Estimation** → Redirect /result?id=xxx avec state
5. **PDF** → POST /api/pdf avec estimation data

## 🤖 Prompt Engineering pour Claude

### Structure du Prompt d'Estimation

```typescript
const prompt = `
Tu es un expert en estimation de travaux de rénovation.

Type de travaux : ${workTypeName}
Localisation : ${postalCode}

Réponses du client :
${JSON.stringify(answers, null, 2)}

Analyse ces informations et fournis une estimation détaillée.

RÉPONSE ATTENDUE (JSON uniquement) :
{
  "estimation": {
    "min": number,
    "max": number,
    "moyen": number
  },
  "details": [
    {
      "poste": string,
      "montant": number,
      "description": string
    }
  ],
  "facteurs": [string],
  "delai": string,
  "conseils": [string],
  "aides": [
    {
      "nom": string,
      "montant": string,
      "conditions": string
    }
  ]
}

IMPORTANT : Réponds UNIQUEMENT avec le JSON, aucun texte avant ou après.
`
```

## 🚀 Déploiement

### Checklist Pre-Deploy

- [ ] Variables environnement configurées
- [ ] Build réussit sans erreur
- [ ] Tous les types TypeScript valides
- [ ] Images optimisées
- [ ] Pas de console.log en production
- [ ] Gestion erreurs API
- [ ] Rate limiting considéré
- [ ] Meta tags SEO
- [ ] Favicon
- [ ] robots.txt
- [ ] sitemap.xml

### Plateforme : Vercel

```bash
# Installation Vercel CLI
pnpm add -g vercel

# Premier déploiement
vercel

# Déploiement production
vercel --prod
```

## 📊 Métriques de Succès MVP

### Technique
- ✅ Lighthouse Score > 90
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Pas d'erreurs TypeScript
- ✅ 0 erreurs console

### Fonctionnel
- ✅ 100% des questionnaires fonctionnels
- ✅ Estimation IA < 5 secondes
- ✅ PDF généré correctement
- ✅ Responsive sur mobile/tablette/desktop
- ✅ Accessible (WCAG AA)

### Business (Post-Launch)
- 🎯 Taux de complétion > 70%
- 🎯 Temps moyen par estimation < 3 minutes
- 🎯 Satisfaction utilisateur > 4/5

## 🔄 Après le MVP

Une fois le MVP validé, on pourra ajouter :

### Phase 2 - Authentification & Historique
1. Intégration Supabase
2. Système d'authentification
3. Sauvegarde des estimations
4. Dashboard utilisateur
5. Export de l'historique

### Phase 3 - Features Avancées
1. Upload et analyse de photos par IA
2. Comparateur de devis
3. Suggestions d'artisans locaux
4. Système de notation

### Phase 4 - Marketplace
1. Inscription artisans
2. Profils professionnels
3. Matching automatique
4. Gestion de projets
5. Paiement intégré

## 📞 Support & Questions

Pour toute question pendant le développement :
1. Vérifier `.cursorrules`
2. Consulter `PROJECT_SPECS.md`
3. Lire le `SETUP_GUIDE.md`
4. Consulter la doc Next.js / shadcn

---

🚀 **Objectif** : MVP fonctionnel en 3-4 semaines, prêt pour les premiers utilisateurs !
