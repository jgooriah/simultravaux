# 📋 DOCUMENTATION COMPLÈTE - SIMUTRAVAUX (RenovAI)

## 📌 VUE D'ENSEMBLE DU PROJET

**Nom du projet** : SimuTravaux (RenovAI)  
**Type** : Simulateur de travaux de rénovation avec intelligence artificielle  
**Technologie** : Next.js 14 (App Router) + TypeScript + Tailwind CSS + Claude AI  
**Public cible** : Particuliers souhaitant estimer le coût de leurs travaux de rénovation

---

## 🎨 IDENTITÉ VISUELLE & BRANDING

### Logo et Nom
- **Nom affiché** : SimuTravaux
- **Positionnement** : En haut à gauche de la navbar
- **Style** : Police semibold, taille 2xl, couleur gray-900

### Palette de couleurs
- **Couleur primaire** : Bleu (#2563EB - blue-600)
- **Couleur accent** : Orange (#F97316 - orange-500/600)
- **Couleurs de fond** :
  - Blanc pur (#FFFFFF)
  - Gris clair (#F9FAFB - gray-50)
- **Texte** :
  - Principal : gray-900
  - Secondaire : gray-600
  - Tertiaire : gray-500

### Typographie
- **Police principale** : System fonts (Inter-like)
- **Tailles** :
  - Hero : 5xl à 7xl (70px max)
  - Titres sections : 4xl (36px)
  - Sous-titres : 2xl-3xl
  - Corps de texte : base à lg

### Style général
- Design moderne, épuré, professionnel
- Coins arrondis (rounded-2xl, rounded-lg)
- Ombres douces (shadow-sm, shadow-lg)
- Transitions et effets hover subtils
- Badges avec backdrop-blur

---

## 🧭 STRUCTURE DE NAVIGATION

### Navbar (Sticky en haut)

**Position** : Fixe en haut de page (sticky top-0)  
**Fond** : Blanc semi-transparent avec backdrop-blur  
**Bordure** : border-b

**Liens de navigation (de gauche à droite)** :
1. **Logo "SimuTravaux"** → Lien vers `/` (accueil)
2. **Liens de navigation** (affichés en xl: uniquement) :
   - Accueil → `#hero`
   - Simulateur → `/simulator`
   - Estimation IA → `#estimation-ia`
   - Analyse Photo IA → `#analyse-photo`
   - Roadmap → `/roadmap`
   - Maquettes → `/maquettes`
   - Comment ça marche ? → `#comment-ca-marche`
   - FAQ → `#faq`

**Boutons d'action (à droite)** :
- Connexion (variant: ghost, size: sm) → `/login`
- Inscription (variant: outline, size: sm) → `/signup`
- Commencer (variant: default, size: sm, caché sur mobile) → `/simulator`

---

## 🏠 PAGE D'ACCUEIL (/)

### Structure complète de la page
1. Hero
2. WorkTypeGrid (Types de travaux)
3. Features (Fonctionnalités)
4. HowItWorks (Comment ça marche)
5. Testimonials (Témoignages)
6. FAQ

---

### 1️⃣ SECTION HERO

**Fond** : Dégradé bleu clair vers blanc (from-blue-50 to-white)  
**Décoration** : Cercle bleu flouté en arrière-plan (blur-3xl)

**Badges au sommet** :
- "100% Gratuit • Sans engagement" avec icône Sparkles
- "Estimation validée par IA"
- Style : fond blanc semi-transparent, texte bleu, uppercase

**Titre principal (H1)** :
```
Estimez vos travaux en moins de 3 minutes
```
- "moins de 3 minutes" en dégradé bleu-orange (from-blue-600 to-orange-500)

**Sous-titre** :
```
Obtenez une estimation précise, détaillée et basée sur les prix réels du marché français. 
Simple, rapide et totalement gratuit pour tous les projets de rénovation.
```

**Boutons CTA** :
1. **"Commencer mon estimation"** (primary) → `/simulator`
   - Avec icône ArrowRight
2. **"Comment ça marche ?"** (outline) → `#comment-ca-marche`

**Statistiques clés** (3 cartes blanches semi-transparentes) :
| Label | Valeur |
|-------|--------|
| Estimation immédiate | < 3 minutes |
| Basé sur le marché 2025 | Données France |
| Types de travaux couverts | 15+ |

---

### 2️⃣ SECTION WORKTYPEGRID (Types de travaux)

**Titre de section** :
```
Sélectionnez votre type de travaux
```

**Sous-titre** :
```
15+ types de rénovations couverts avec des questionnaires adaptés.
```

**Types de travaux affichés** (8 cartes) :

#### 1. Peinture intérieure
- **Catégorie** : Peinture & Revêtements
- **Description** : Peinture des murs et plafonds
- **Fourchette** : 20 - 40 €/m²
- **Bouton** : "Obtenir une estimation" → `/simulator?workType=painting-interior`

#### 2. Peinture extérieure
- **Catégorie** : Peinture & Revêtements
- **Description** : Peinture de façade
- **Fourchette** : 30 - 60 €/m²
- **Bouton** : → `/simulator?workType=painting-exterior`

#### 3. Papier peint
- **Catégorie** : Peinture & Revêtements
- **Description** : Pose de papier peint
- **Fourchette** : 25 - 50 €/m²
- **Bouton** : → `/simulator?workType=wallpaper`

#### 4. Carrelage sol
- **Catégorie** : Sols & Carrelage
- **Description** : Pose de carrelage au sol
- **Fourchette** : 40 - 80 €/m²
- **Bouton** : → `/simulator?workType=tile-floor`

#### 5. Carrelage mural
- **Catégorie** : Sols & Carrelage
- **Description** : Pose de carrelage mural
- **Fourchette** : 45 - 90 €/m²
- **Bouton** : → `/simulator?workType=tile-wall`

#### 6. Parquet
- **Catégorie** : Sols & Carrelage
- **Description** : Pose de parquet massif ou flottant
- **Fourchette** : 35 - 100 €/m²
- **Bouton** : → `/simulator?workType=parquet`

#### 7. Rénovation salle de bain
- **Catégorie** : Plomberie & Sanitaires
- **Description** : Rénovation complète salle de bain
- **Fourchette** : 5000 - 15000 €
- **Bouton** : → `/simulator?workType=bathroom-renovation`

#### 8. Installation cuisine
- **Catégorie** : Plomberie & Sanitaires
- **Description** : Plomberie et installation cuisine
- **Fourchette** : 3000 - 10000 €
- **Bouton** : → `/simulator?workType=kitchen-plumbing`

**Comportement au hover** :
- Translation vers le haut (-translate-y-1)
- Bordure bleue (border-blue-200)
- Ombre renforcée (shadow-lg)

---

### 3️⃣ SECTION FEATURES (Fonctionnalités)

**Fond** : gray-50

**Première sous-section : "Estimation IA"**

**Titre** :
```
Pourquoi choisir SimuTravaux ?
```

**Sous-titre** :
```
Une technologie fiable qui s'adapte à chaque projet de rénovation.
```

**3 cartes de fonctionnalités** :

#### Carte 1 : Estimation par IA
- **Icône** : Sparkles (bleu)
- **Titre** : Estimation par IA
- **Description** : Analyse poussée des réponses et des prix du marché 2025 pour un résultat ultra réaliste.

#### Carte 2 : Résultat instantané
- **Icône** : Clock (orange)
- **Titre** : Résultat instantané
- **Description** : Moins de 3 minutes pour recevoir une fourchette de prix détaillée et actionnable.

#### Carte 3 : 100% gratuit
- **Icône** : Shield (vert)
- **Titre** : 100% gratuit
- **Description** : Aucun paiement requis. Utilisez le simulateur autant de fois que nécessaire.

---

**Deuxième sous-section : "Analyse photo IA (bientôt)"**

**Titre** :
```
Préparez-vous à aller encore plus loin
```

**Sous-titre** :
```
Uploadez vos photos, laissez l'IA identifier l'état du chantier et ajuster automatiquement le devis.
```

**3 cartes supplémentaires** :

#### Carte 4 : Devis décomposé
- **Icône** : FileText (violet)
- **Titre** : Devis décomposé
- **Description** : Chaque poste est détaillé (main d'œuvre, matériaux, préparation, finitions).

#### Carte 5 : Facteurs clés identifiés
- **Icône** : TrendingUp (rouge)
- **Titre** : Facteurs clés identifiés
- **Description** : Comprenez ce qui influe le plus sur votre budget pour arbitrer sereinement.

#### Carte 6 : Comparaison facilitée
- **Icône** : Users (cyan)
- **Titre** : Comparaison facilitée
- **Description** : Servez-vous de l'estimation comme base solide pour challenger vos devis artisans.

---

### 4️⃣ SECTION HOW IT WORKS (Comment ça marche)

**Fond** : gray-50  
**ID d'ancre** : `#comment-ca-marche`

**Titre** :
```
Comment ça marche ?
```

**Sous-titre** :
```
Un processus simple en 4 étapes pour obtenir votre estimation
```

**3 étapes** (cartes blanches avec numéros) :

#### Étape 01 : Choisissez votre projet
- **Icône** : MousePointer
- **Description** : Sélectionnez le type de travaux parmi nos catégories (salle de bain, peinture, électricité...).

#### Étape 02 : Répondez au questionnaire
- **Icône** : MessageSquare
- **Description** : Surface, état actuel, qualité souhaitée... Quelques questions suffisent pour contextualiser votre besoin.

#### Étape 03 : Recevez votre estimation
- **Icône** : Brain
- **Description** : Notre IA calcule instantanément une fourchette de prix réaliste avec détails, facteurs et conseils.

**CTA final** :
- Bouton dégradé bleu-orange : "Commencer mon estimation" → `/simulator`

---

### 5️⃣ SECTION TESTIMONIALS (Témoignages)

**Fond** : Blanc

**Titre** :
```
Utilisé partout en France
```

**Sous-titre** :
```
Des milliers de particuliers ont déjà validé l'efficacité de SimuTravaux.
```

**3 témoignages** :

#### Témoignage 1
- **Nom** : Marie Dubois
- **Ville** : Paris
- **Projet** : Rénovation salle de bain
- **Avis** : "L'estimation était très proche du devis final de mon artisan. Outil idéal pour budgétiser avant de contacter les pros."

#### Témoignage 2
- **Nom** : Thomas Martin
- **Ville** : Lyon
- **Projet** : Rénovation cuisine
- **Avis** : "Simple, rapide et clair. J'ai pu comparer facilement avec trois devis et SimuTravaux était dans la moyenne."

#### Témoignage 3
- **Nom** : Sophie Bernard
- **Ville** : Toulouse
- **Projet** : Peinture intérieure
- **Avis** : "Excellente base de discussion avec les artisans. La décomposition des coûts m'a permis de négocier sereinement."

---

### 6️⃣ SECTION FAQ

**Fond** : gray-50  
**ID d'ancre** : `#faq`

**Titre** :
```
Tout ce que vous devez savoir
```

**Sous-titre** :
```
Une question ? Nous y répondons en toute transparence.
```

**Format** : Accordéon (élément `<details>`)

#### Question 1
**Q** : Est-ce vraiment gratuit ?  
**R** : Oui. SimuTravaux est totalement gratuit et sans engagement. Utilisez-le autant de fois que nécessaire.

#### Question 2
**Q** : Quelle est la précision des estimations ?  
**R** : Nos fourchettes sont basées sur des données marché 2025 et les informations que vous fournissez. Elles servent de base solide avant les devis artisans.

#### Question 3
**Q** : Puis-je sauvegarder mes estimations ?  
**R** : La sauvegarde arrive bientôt. En attendant, vous pouvez exporter les résultats et les partager facilement.

#### Question 4
**Q** : Comment sont calculés les prix ?  
**R** : Nous combinons vos réponses, les coefficients régionaux et les tendances prix par type de travaux pour obtenir un résultat réaliste.

---

## 🎯 PAGE SIMULATEUR (/simulator)

**Statut actuel** : Page placeholder (questionnaire en développement)

**Titre** :
```
Arrivée imminente du questionnaire intelligent
```

**Description** :
```
Nous finalisons l'expérience interactive qui vous permettra d'obtenir votre estimation personnalisée en quelques minutes.
```

**3 cartes interactives** (clic pour activer) :

### Carte 1 : Questionnaire guidé
- **Icône** : ClipboardList
- **Description** : Chaque type de travaux aura son propre parcours avec validation en temps réel et étapes claires.
- **Détails** : Navigation step-by-step, validations React Hook Form + Zod, et sauvegarde automatique des réponses.
- **Action** : "Voir la roadmap" → `/roadmap`

### Carte 2 : Analyse IA
- **Icône** : Construction
- **Description** : Les réponses alimentent Claude pour générer une estimation fiable et un breakdown détaillé.
- **Détails** : Prompt optimisé, parsing JSON sécurisé et calcul de confiance pour chaque résultat.
- **Action** : "Tester l'API" → `/api/estimate`

### Carte 3 : Résultats actionnables
- **Icône** : Sparkles
- **Description** : Vous obtiendrez un récapitulatif complet, des conseils personnalisés et bientôt un PDF téléchargeable.
- **Détails** : Page résultat dédiée avec breakdown visuel, facteurs clés et génération PDF (coming soon).
- **Action** : "Découvrir les maquettes" → `/maquettes`

**Comportement** :
- Au clic sur une carte → elle devient active (bordure bleue)
- Zone de détails en dessous affiche les informations de la carte active

---

## 📊 PAGE ROADMAP (/roadmap)

**Titre** :
```
Plan de développement SimuTravaux
```

**Description** :
```
Inspiré du MVP plan fourni. Chaque semaine cible une étape clé pour livrer un simulateur complet et fiable.
```

**4 cartes de roadmap** :

### Semaine 1 — Fondation & Landing
**Focus** : Structure, Hero, sections principales

**Tâches** :
- ✅ Initialiser Next.js 14 + Tailwind + shadcn/ui
- ✅ Intégrer Hero, Features, How It Works
- ✅ Mettre en place la navigation et le branding

### Semaine 2 — Types & Simulateur
**Focus** : Données, questionnaires, navigation

**Tâches** :
- ✅ Définir les types de travaux et questionnaires dynamiques
- ✅ Créer le sélecteur de travaux (TypeSelector)
- ✅ Structurer le simulateur et la progression

### Semaine 3 — IA & Résultats
**Focus** : API Claude, intégration IA, page résultat

**Tâches** :
- ✅ Finaliser les prompts et la fonction d'estimation
- ✅ Implémenter /api/estimate et la gestion des erreurs
- ⏳ Concevoir la page résultats (fourchette, breakdown, conseils)

### Semaine 4 — PDF, polish & déploiement
**Focus** : Export PDF, optimisations, Vercel

**Tâches** :
- ⏳ Générer un PDF professionnel depuis l'estimation
- ⏳ Optimiser performance / accessibilité / SEO
- ⏳ Configurer Vercel et finaliser la documentation

---

## 🎨 PAGE MAQUETTES (/maquettes)

**Titre** :
```
Vision UI de SimuTravaux
```

**Description** :
```
Aperçu des sections clés en attendant les visuels haute fidélité. Chaque module est pensé pour maximiser la conversion et la clarté.
```

**3 cartes de maquettes** :

### Maquette 1 : Landing page
- **Icône** : Layout
- **Description** : Hero immersif, badges de confiance, grid de types de travaux et storytelling inspiré de la version v001.
- **Points clés** :
  - Hero réactif
  - Badges KPI
  - WorkType Grid

### Maquette 2 : Simulateur
- **Icône** : PanelsTopLeft
- **Description** : Cartes interactives, questionnaire guidé et future navigation step-by-step avec React Hook Form + Zod.
- **Points clés** :
  - Cartes interactives
  - CTA contextualisés
  - Placeholder futur Stepper

### Maquette 3 : Résultats & PDF
- **Icône** : Wand2
- **Description** : Design prévu pour afficher la fourchette, les facteurs clés et générer un PDF clair et partageable.
- **Points clés** :
  - Fourchette min/max/moyen
  - Conseils IA
  - Boutons action (PDF, nouvelle estimation)

---

## 📝 QUESTIONNAIRES DÉTAILLÉS

### Types de travaux disponibles (15 au total)

#### CATÉGORIE : Peinture & Revêtements
1. **painting-interior** - Peinture intérieure
2. **painting-exterior** - Peinture extérieure
3. **wallpaper** - Papier peint

#### CATÉGORIE : Sols & Carrelage
4. **tile-floor** - Carrelage sol
5. **tile-wall** - Carrelage mural
6. **parquet** - Parquet

#### CATÉGORIE : Plomberie & Sanitaires
7. **bathroom-renovation** - Rénovation salle de bain
8. **kitchen-plumbing** - Installation cuisine
9. **boiler** - Chaudière

#### CATÉGORIE : Électricité
10. **electrical-renovation** - Rénovation électrique
11. **home-automation** - Domotique

#### CATÉGORIE : Menuiserie
12. **windows** - Fenêtres
13. **interior-doors** - Portes intérieures

#### CATÉGORIE : Isolation & Chauffage
14. **attic-insulation** - Isolation combles
15. **wall-insulation** - Isolation murs
16. **heat-pump** - Pompe à chaleur

---

## 🔍 QUESTIONNAIRE DÉTAILLÉ : PEINTURE INTÉRIEURE

### ÉTAPE 1 : Surface à peindre

#### Question 1.1 : Type de pièce
- **Type** : Select (liste déroulante)
- **Label** : Type de pièce
- **Requis** : Oui
- **Options** :
  - `living-room` → Salon / Séjour
  - `bedroom` → Chambre
  - `kitchen` → Cuisine
  - `bathroom` → Salle de bain
  - `hallway` → Couloir / Entrée
  - `multiple` → Plusieurs pièces

#### Question 1.2 : Surface totale
- **Type** : Number (champ numérique)
- **Label** : Surface totale
- **Description** : Surface au sol des pièces à peindre
- **Placeholder** : Ex: 25
- **Unité** : m²
- **Requis** : Oui
- **Min** : 5
- **Max** : 500
- **Message de validation** : La surface doit être entre 5 et 500 m²

#### Question 1.3 : Hauteur sous plafond
- **Type** : Select
- **Label** : Hauteur sous plafond
- **Requis** : Oui
- **Options** :
  - `standard` → Standard (2,4 - 2,7m)
  - `high` → Haute (>2,7m) [Impact prix : MOYEN]
  - `very-high` → Très haute (>3,5m) [Impact prix : ÉLEVÉ]

#### Question 1.4 : Surfaces à peindre
- **Type** : Checkbox (cases à cocher multiples)
- **Label** : Surfaces à peindre
- **Requis** : Oui
- **Options** :
  - `walls` → Murs
  - `ceiling` → Plafond [Impact prix : MOYEN]
  - `woodwork` → Boiseries [Impact prix : FAIBLE]

---

### ÉTAPE 2 : État actuel

#### Question 2.1 : État des murs
- **Type** : Radio (choix unique)
- **Label** : État des murs
- **Requis** : Oui
- **Options** :
  - `good` → Bon état | _Murs lisses, quelques retouches_
  - `medium` → État moyen | _Quelques trous et fissures à reboucher_ [Impact prix : FAIBLE]
  - `poor` → Mauvais état | _Nombreuses réparations nécessaires_ [Impact prix : ÉLEVÉ]

#### Question 2.2 : Travaux de préparation nécessaires
- **Type** : Checkbox
- **Label** : Travaux de préparation nécessaires
- **Requis** : Non
- **Options** :
  - `strip-wallpaper` → Décoller papier peint
  - `fill-holes` → Reboucher trous et fissures
  - `sand` → Poncer les surfaces
  - `primer` → Appliquer une sous-couche

---

### ÉTAPE 3 : Type de finition

#### Question 3.1 : Qualité de peinture
- **Type** : Radio
- **Label** : Qualité de peinture
- **Requis** : Oui
- **Options** :
  - `standard` → Standard | _Bonne qualité, rapport qualité-prix_
  - `premium` → Premium | _Haut de gamme, longue durée_ [Impact prix : MOYEN]
  - `luxury` → Luxe | _Marques premium, finitions exceptionnelles_ [Impact prix : ÉLEVÉ]

#### Question 3.2 : Type de finition
- **Type** : Select
- **Label** : Type de finition
- **Requis** : Oui
- **Options** :
  - `matte` → Mat
  - `satin` → Satin
  - `glossy` → Brillant

#### Question 3.3 : Nombre de couches
- **Type** : Radio
- **Label** : Nombre de couches
- **Requis** : Oui
- **Options** :
  - `1` → 1 couche (rafraîchissement)
  - `2` → 2 couches (standard)
  - `3` → 3 couches (couverture maximale)

---

### ÉTAPE 4 : Localisation

#### Question 4.1 : Code postal
- **Type** : Text (champ texte)
- **Label** : Code postal
- **Placeholder** : 75001
- **Requis** : Oui
- **Validation** : Pattern regex `^[0-9]{5}$`
- **Message d'erreur** : Code postal invalide

#### Question 4.2 : Type de bien
- **Type** : Select
- **Label** : Type de bien
- **Requis** : Oui
- **Options** :
  - `apartment` → Appartement
  - `house` → Maison
  - `office` → Local commercial

#### Question 4.3 : Accès au chantier
- **Type** : Radio
- **Label** : Accès au chantier
- **Requis** : Oui
- **Options** :
  - `easy` → Facile (RDC ou ascenseur)
  - `medium` → Moyen (étages sans ascenseur) [Impact prix : FAIBLE]
  - `difficult` → Difficile (accès complexe) [Impact prix : MOYEN]

#### Question 4.4 : Délai souhaité
- **Type** : Select
- **Label** : Délai souhaité
- **Requis** : Oui
- **Options** :
  - `urgent` → Urgent (< 2 semaines) [Impact prix : ÉLEVÉ]
  - `normal` → Normal (2-4 semaines)
  - `flexible` → Flexible (> 1 mois)

---

## 🔍 QUESTIONNAIRE DÉTAILLÉ : RÉNOVATION SALLE DE BAIN

### ÉTAPE 1 : Étendue des travaux

#### Question 1.1 : Surface de la salle de bain
- **Type** : Number
- **Label** : Surface de la salle de bain
- **Unité** : m²
- **Requis** : Oui
- **Min** : 2
- **Max** : 30

#### Question 1.2 : Type de rénovation
- **Type** : Radio
- **Label** : Type de rénovation
- **Requis** : Oui
- **Options** :
  - `refresh` → Rafraîchissement | _Peinture, petits équipements_
  - `partial` → Partielle | _Remplacement de certains éléments_ [Impact prix : MOYEN]
  - `complete` → Complète | _Rénovation totale_ [Impact prix : ÉLEVÉ]

#### Question 1.3 : Éléments à rénover
- **Type** : Checkbox
- **Label** : Éléments à rénover
- **Requis** : Oui
- **Options** :
  - `shower` → Douche
  - `bathtub` → Baignoire
  - `sink` → Vasque/Lavabo
  - `toilet` → WC
  - `tiles` → Carrelage
  - `furniture` → Meubles
  - `lighting` → Éclairage
  - `ventilation` → VMC/Ventilation

---

### ÉTAPE 2 : Qualité des équipements

#### Question 2.1 : Gamme des équipements
- **Type** : Radio
- **Label** : Gamme des équipements
- **Requis** : Oui
- **Options** :
  - `standard` → Standard
  - `mid-range` → Milieu de gamme
  - `premium` → Premium
  - `luxury` → Haut de gamme

#### Question 2.2 : Travaux spécifiques
- **Type** : Checkbox
- **Label** : Travaux spécifiques
- **Requis** : Non
- **Options** :
  - `pmr` → Adaptation PMR
  - `custom-furniture` → Meubles sur-mesure
  - `underfloor-heating` → Chauffage au sol
  - `steam-shower` → Douche hammam

---

### ÉTAPE 3 : Localisation

#### Question 3.1 : Code postal
- **Type** : Text
- **Label** : Code postal
- **Requis** : Oui

#### Question 3.2 : Délai souhaité
- **Type** : Select
- **Label** : Délai souhaité
- **Requis** : Oui
- **Options** :
  - `urgent` → Urgent (< 1 mois)
  - `normal` → Normal (1-3 mois)
  - `flexible` → Flexible (> 3 mois)

---

## 🔍 QUESTIONNAIRE DÉTAILLÉ : CARRELAGE SOL

### ÉTAPE 1 : Surface à carreler

#### Question 1.1 : Type de pièce
- **Type** : Select
- **Label** : Type de pièce
- **Requis** : Oui
- **Options** :
  - `bathroom` → Salle de bain
  - `kitchen` → Cuisine
  - `living` → Séjour
  - `terrace` → Terrasse
  - `multiple` → Plusieurs pièces

#### Question 1.2 : Surface à carreler
- **Type** : Number
- **Label** : Surface à carreler
- **Unité** : m²
- **Requis** : Oui
- **Min** : 2
- **Max** : 200

#### Question 1.3 : Revêtement actuel
- **Type** : Select
- **Label** : Revêtement actuel
- **Requis** : Oui
- **Options** :
  - `concrete` → Béton/Chape
  - `old-tile` → Ancien carrelage
  - `parquet` → Parquet
  - `vinyl` → Lino/Vinyle

---

### ÉTAPE 2 : Choix du carrelage

#### Question 2.1 : Type de carrelage
- **Type** : Select
- **Label** : Type de carrelage
- **Requis** : Oui
- **Options** :
  - `ceramic` → Céramique
  - `porcelain` → Grès cérame
  - `natural-stone` → Pierre naturelle
  - `terracotta` → Terre cuite

#### Question 2.2 : Format des carreaux
- **Type** : Select
- **Label** : Format des carreaux
- **Requis** : Oui
- **Options** :
  - `small` → Petit (< 30x30cm)
  - `medium` → Moyen (30x60cm)
  - `large` → Grand (60x60cm ou +)
  - `mixed` → Formats mixtes

#### Question 2.3 : Gamme de carrelage
- **Type** : Radio
- **Label** : Gamme de carrelage
- **Requis** : Oui
- **Options** :
  - `standard` → Standard (15-30€/m²)
  - `mid-range` → Milieu de gamme (30-60€/m²)
  - `premium` → Premium (60€+/m²)

---

### ÉTAPE 3 : Préparation du sol

#### Question 3.1 : État du sol actuel
- **Type** : Radio
- **Label** : État du sol actuel
- **Requis** : Oui
- **Options** :
  - `good` → Bon (plat et propre)
  - `medium` → Moyen (quelques irrégularités)
  - `poor` → Mauvais (ragréage nécessaire)

#### Question 3.2 : Dépose existante
- **Type** : Radio
- **Label** : Dépose existante
- **Requis** : Oui
- **Options** :
  - `none` → Pas de dépose
  - `simple` → Dépose simple
  - `complex` → Dépose complexe

---

### ÉTAPE 4 : Localisation

#### Question 4.1 : Code postal
- **Type** : Text
- **Label** : Code postal
- **Requis** : Oui

#### Question 4.2 : Délai souhaité
- **Type** : Select
- **Label** : Délai souhaité
- **Requis** : Oui
- **Options** :
  - `urgent` → Urgent (< 2 semaines)
  - `normal` → Normal (2-4 semaines)
  - `flexible` → Flexible

---

## 🤖 API D'ESTIMATION (/api/estimate)

### Endpoint GET
**URL** : `/api/estimate`  
**Méthode** : GET  
**Réponse** : Documentation de l'API

**Exemple de réponse** :
```json
{
  "success": true,
  "status": "ready",
  "instructions": "Envoyez une requête POST avec workTypeId et answers (JSON) pour obtenir une estimation IA.",
  "sampleRequest": {
    "workTypeId": "painting-interior",
    "answers": {
      "surface-area": 25,
      "current-state": "medium",
      "postal-code": "75010"
    }
  },
  "sampleCurl": "curl -X POST http://localhost:3000/api/estimate -H \"Content-Type: application/json\" -d '{\"workTypeId\":\"painting-interior\",\"answers\":{\"surface-area\":25}}'"
}
```

---

### Endpoint POST
**URL** : `/api/estimate`  
**Méthode** : POST  
**Content-Type** : application/json

**Body de la requête** :
```json
{
  "workTypeId": "painting-interior",
  "answers": {
    "room-type": "living-room",
    "surface-area": 25,
    "ceiling-height": "standard",
    "paint-walls": ["walls", "ceiling"],
    "current-state": "medium",
    "prep-work": ["fill-holes", "sand"],
    "paint-quality": "premium",
    "paint-finish": "satin",
    "number-coats": "2",
    "postal-code": "75010",
    "property-type": "apartment",
    "access": "easy",
    "timeline": "normal"
  }
}
```

**Réponse en cas de succès (200)** :
```json
{
  "success": true,
  "data": {
    "id": "est_1234567890_abc123def",
    "workTypeId": "painting-interior",
    "workTypeName": "Peinture intérieure",
    "estimation": {
      "min": 2500,
      "max": 3500,
      "moyen": 3000
    },
    "details": [
      {
        "poste": "Main d'œuvre",
        "montant": 1500,
        "description": "Peinture professionnelle avec 2 couches"
      },
      {
        "poste": "Matériaux et fournitures",
        "montant": 1200,
        "description": "Peinture premium, rouleaux, bâches"
      },
      {
        "poste": "Préparation du chantier",
        "montant": 200,
        "description": "Rebouchage, ponçage"
      },
      {
        "poste": "Finitions",
        "montant": 80,
        "description": "Retouches finales"
      },
      {
        "poste": "Évacuation et nettoyage",
        "montant": 20,
        "description": "Nettoyage final"
      }
    ],
    "facteurs": [
      "Surface de 25m² (standard)",
      "Qualité premium demandée",
      "Préparation nécessaire (rebouchage, ponçage)",
      "Localisation Paris (coefficient 1.1)"
    ],
    "delai": "2-3 semaines",
    "conseils": [
      "Privilégiez les travaux hors saison pour de meilleurs tarifs",
      "Demandez plusieurs devis pour comparer",
      "Vérifiez les assurances des artisans"
    ],
    "aides": [
      {
        "nom": "TVA réduite",
        "montant": "10%",
        "conditions": "Logement de plus de 2 ans"
      }
    ],
    "metadata": {
      "createdAt": "2025-01-15T10:30:00.000Z",
      "questionnaire": {
        "workTypeId": "painting-interior",
        "answers": { ... }
      },
      "confidence": "high"
    }
  }
}
```

**Codes d'erreur** :
- **400** : Validation error (données invalides)
- **500** : Erreur serveur (clé API manquante)
- **503** : Erreur AI (problème avec l'API Claude)

---

## 🧠 SYSTÈME D'ESTIMATION IA

### Modèle utilisé
- **Provider** : Anthropic
- **Modèle** : claude-sonnet-4-20250514
- **Max tokens** : 2000
- **Temperature** : 0.3 (déterministe)

### Prompt d'estimation

Le système construit un prompt détaillé qui inclut :

1. **Rôle de l'IA** : Expert en estimation de travaux avec 20 ans d'expérience
2. **Type de travaux** : Nom, description, fourchette moyenne
3. **Informations du client** : Toutes les réponses du questionnaire formatées
4. **Critères d'estimation** :
   - Coefficient régional selon code postal
   - État actuel et complexité
   - Qualité des matériaux
   - Main d'œuvre qualifiée
   - Marge pour imprévus (5-10%)
   - Prix du marché 2025
5. **Aides financières possibles** :
   - MaPrimeRénov'
   - Éco-PTZ
   - TVA réduite (5,5% ou 10%)
   - Aides locales

### Format de réponse attendu

L'IA doit retourner un JSON structuré avec :
- **estimation** : min, max, moyen
- **details** : Array de postes (Main d'œuvre, Matériaux, Préparation, Finitions, Évacuation)
- **facteurs** : Array de facteurs influençant le prix
- **delai** : Délai estimé en texte (ex: "2-3 semaines")
- **conseils** : Array de conseils pratiques
- **aides** : Array d'aides financières possibles

### Calcul de confiance

Le système évalue automatiquement la confiance dans l'estimation :
- **HIGH** : Breakdown détaillé (≥3 postes) + Fourchette raisonnable (max/min ≤ 2)
- **MEDIUM** : L'une des deux conditions remplie
- **LOW** : Aucune condition remplie

---

## 🎨 COMPOSANTS UI (shadcn/ui)

### Button (Bouton)

**Variants** :
- `default` : Bleu primaire
- `outline` : Bordure avec fond transparent
- `ghost` : Transparent, hover subtil
- `secondary` : Gris secondaire
- `destructive` : Rouge pour actions destructives
- `link` : Style de lien souligné

**Sizes** :
- `sm` : Petit (h-9, px-3)
- `default` : Standard (h-10, px-4)
- `lg` : Large (h-11, px-8)
- `icon` : Carré (h-10, w-10)

**Propriété spéciale** :
- `asChild` : Permet de wrapper un composant enfant (ex: Link)

**Exemples d'usage** :
```tsx
<Button>Cliquez ici</Button>
<Button variant="outline" size="sm">Petit bouton</Button>
<Button asChild>
  <Link href="/simulator">Aller au simulateur</Link>
</Button>
```

---

### Card (Carte)

**Composants** :
- `Card` : Conteneur principal
- `CardHeader` : En-tête de la carte
- `CardTitle` : Titre (h3, text-2xl)
- `CardDescription` : Description (text-sm, muted)
- `CardContent` : Contenu principal
- `CardFooter` : Pied de carte (flex)

**Style par défaut** :
- Coins arrondis (rounded-xl)
- Bordure légère
- Ombre (shadow)
- Padding de 6 (p-6)

**Exemple d'usage** :
```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description optionnelle</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu de la carte</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## 🎨 DESIGN SYSTEM & TOKENS

### Variables CSS (dans globals.css via Tailwind)

**Couleurs sémantiques** :
- `--background` : Fond principal
- `--foreground` : Texte principal
- `--primary` : Couleur primaire (bleu)
- `--primary-foreground` : Texte sur fond primaire
- `--secondary` : Couleur secondaire
- `--muted` : Couleur atténuée
- `--accent` : Couleur d'accent
- `--destructive` : Couleur destructive (rouge)
- `--border` : Couleur des bordures
- `--input` : Couleur des champs
- `--ring` : Couleur du focus ring
- `--card` : Fond des cartes

### Animations Tailwind

**Animations personnalisées** :
- `accordion-down` : Ouverture d'accordéon (0.2s ease-out)
- `accordion-up` : Fermeture d'accordéon (0.2s ease-out)

### Breakpoints responsifs

- **sm** : 640px
- **md** : 768px
- **lg** : 1024px
- **xl** : 1280px
- **2xl** : 1400px (custom container)

---

## 📦 DÉPENDANCES & TECHNOLOGIES

### Framework & Core
- **next** : ^14.2.0 (App Router)
- **react** : ^18.3.0
- **react-dom** : ^18.3.0
- **typescript** : ^5

### Styling
- **tailwindcss** : ^3.4.0
- **tailwindcss-animate** : ^1.0.7
- **autoprefixer** : ^10.0.1
- **postcss** : ^8
- **class-variance-authority** : ^0.7.0 (CVA)
- **clsx** : ^2.1.0
- **tailwind-merge** : ^2.2.0

### UI Components
- **@radix-ui/react-slot** : ^1.2.4
- **lucide-react** : ^0.344.0 (icônes)
- **framer-motion** : ^11.0.0 (animations)

### Forms & Validation
- **react-hook-form** : ^7.50.0
- **@hookform/resolvers** : ^3.3.0
- **zod** : ^3.22.0

### AI & PDF
- **@anthropic-ai/sdk** : ^0.32.0
- **jspdf** : ^2.5.1
- **jspdf-autotable** : ^3.8.0

### Dev Tools
- **eslint** : ^8
- **eslint-config-next** : ^14.2.0
- **prettier** : ^3.2.0
- **prettier-plugin-tailwindcss** : ^0.5.0

---

## ⚙️ CONFIGURATION & ENVIRONNEMENT

### Variables d'environnement (.env.local)

```env
# API Claude (Anthropic)
ANTHROPIC_API_KEY=sk-ant-xxx...

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Scripts npm/pnpm

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
  "type-check": "tsc --noEmit"
}
```

### Configuration Next.js (next.config.mjs)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

### Configuration Tailwind (tailwind.config.ts)

- **Dark mode** : Class-based
- **Content paths** : pages, components, app, src
- **Container** : Centré, padding 2rem, max-width 1400px
- **Extend** : Couleurs personnalisées, animations

### Configuration PostCSS (postcss.config.cjs)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 📂 STRUCTURE DE FICHIERS COMPLÈTE

```
renovai/
├── .env.local                         # Variables d'environnement (non versionné)
├── .gitignore
├── next.config.mjs                    # Config Next.js
├── package.json                       # Dépendances
├── pnpm-lock.yaml                     # Lock file pnpm
├── postcss.config.cjs                 # Config PostCSS
├── tailwind.config.ts                 # Config Tailwind
├── tsconfig.json                      # Config TypeScript
├── README.md                          # Documentation projet
├── CURSOR_GUIDE.md                    # Guide pour Cursor AI
├── FILES_INDEX.md                     # Index des fichiers
├── GETTING_STARTED.md                 # Guide de démarrage
├── MVP_PLAN.md                        # Plan du MVP
├── PROJECT_OVERVIEW.md                # Vue d'ensemble
├── PROJECT_SPECS.md                   # Spécifications
├── SETUP_GUIDE.md                     # Guide de setup
├── public/
│   └── images/                        # Images statiques
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Layout racine (Navbar)
│   │   ├── page.tsx                   # Page d'accueil
│   │   ├── globals.css                # Styles globaux
│   │   ├── not-found.tsx              # Page 404
│   │   ├── simulator/
│   │   │   └── page.tsx               # Page simulateur (placeholder)
│   │   ├── roadmap/
│   │   │   └── page.tsx               # Page roadmap
│   │   ├── maquettes/
│   │   │   └── page.tsx               # Page maquettes
│   │   └── api/
│   │       └── estimate/
│   │           └── route.ts           # API estimation IA
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx               # Section Hero
│   │   │   ├── Features.tsx           # Section Features
│   │   │   ├── HowItWorks.tsx         # Section Comment ça marche
│   │   │   ├── Testimonials.tsx       # Section Témoignages
│   │   │   ├── FAQ.tsx                # Section FAQ
│   │   │   └── WorkTypeGrid.tsx       # Grille types de travaux
│   │   ├── layout/
│   │   │   └── Navbar.tsx             # Barre de navigation
│   │   ├── ui/
│   │   │   ├── button.tsx             # Composant Button (shadcn)
│   │   │   └── card.tsx               # Composant Card (shadcn)
│   │   ├── simulator/                 # Composants simulateur (à venir)
│   │   └── result/                    # Composants résultats (à venir)
│   ├── data/
│   │   └── questions.ts               # Questionnaires détaillés
│   ├── lib/
│   │   ├── utils.ts                   # Utilitaires (cn, etc.)
│   │   ├── ai/
│   │   │   ├── estimator.ts           # Fonction principale estimation
│   │   │   └── prompts.ts             # Construction des prompts
│   │   └── pdf/                       # Génération PDF (à venir)
│   └── types/
│       ├── questionnaire.ts           # Types questionnaire & estimation
│       └── work-types.ts              # Types travaux & catégories
└── node_modules/
```

---

## 🔄 FLUX UTILISATEUR COMPLET

### Parcours type : Estimation peinture intérieure

#### 1. Arrivée sur la landing page (/)
- Utilisateur voit le Hero avec titre principal
- Lecture des statistiques : "< 3 minutes", "15+ types de travaux"
- Clic sur **"Commencer mon estimation"** → Redirection `/simulator`

#### 2. Page Simulateur (/simulator)
- Affichage de 3 cartes explicatives (placeholder)
- Clic sur une carte → Elle devient active (bordure bleue)
- Zone de détails en dessous affiche les informations
- **Note** : Le questionnaire interactif est en développement

#### 3. Sélection du type de travaux (futur)
- Grille de cartes avec tous les types disponibles
- Clic sur "Peinture intérieure" → Lance le questionnaire

#### 4. Questionnaire (4 étapes)
- **Étape 1** : Surface à peindre (4 questions)
- **Étape 2** : État actuel (2 questions)
- **Étape 3** : Type de finition (3 questions)
- **Étape 4** : Localisation (4 questions)
- Barre de progression visible
- Boutons "Précédent" et "Suivant"
- Validation en temps réel avec React Hook Form + Zod

#### 5. Soumission et traitement
- Clic sur "Obtenir mon estimation"
- Loader animé avec message "Analyse en cours..."
- Appel POST à `/api/estimate` avec toutes les réponses
- Claude génère l'estimation (2-5 secondes)

#### 6. Page résultats (futur /result)
- Affichage de la fourchette (min, max, moyen)
- Breakdown détaillé par poste
- Liste des facteurs influençant le prix
- Délai estimé
- Conseils personnalisés
- Aides financières éligibles
- **Actions** :
  - Télécharger le PDF
  - Faire une nouvelle estimation
  - Partager le résultat

---

## 🎯 ACTIONS AU CLIC - RÉCAPITULATIF COMPLET

### PAGE D'ACCUEIL (/)

| Élément | Action | Destination |
|---------|--------|-------------|
| Logo "SimuTravaux" | Clic | `/` (accueil) |
| Lien "Accueil" (navbar) | Clic | `#hero` (ancre) |
| Lien "Simulateur" (navbar) | Clic | `/simulator` |
| Lien "Estimation IA" (navbar) | Clic | `#estimation-ia` (ancre) |
| Lien "Analyse Photo IA" (navbar) | Clic | `#analyse-photo` (ancre) |
| Lien "Roadmap" (navbar) | Clic | `/roadmap` |
| Lien "Maquettes" (navbar) | Clic | `/maquettes` |
| Lien "Comment ça marche ?" (navbar) | Clic | `#comment-ca-marche` (ancre) |
| Lien "FAQ" (navbar) | Clic | `#faq` (ancre) |
| Bouton "Connexion" (navbar) | Clic | `/login` |
| Bouton "Inscription" (navbar) | Clic | `/signup` |
| Bouton "Commencer" (navbar) | Clic | `/simulator` |
| Bouton "Commencer mon estimation" (Hero) | Clic | `/simulator` |
| Bouton "Comment ça marche ?" (Hero) | Clic | `#comment-ca-marche` |
| Carte type de travaux | Clic | `/simulator?workType=[id]` |
| Bouton "Obtenir une estimation" (carte) | Clic | `/simulator?workType=[id]` |
| Bouton "Commencer mon estimation" (HowItWorks) | Clic | `/simulator` |
| Accordéon FAQ | Clic | Ouvre/ferme le détail |

---

### PAGE SIMULATEUR (/simulator)

| Élément | Action | Destination |
|---------|--------|-------------|
| Bouton "Retour à l'accueil" | Clic | `/` |
| Carte interactive | Clic | Devient active (bordure bleue) |
| Bouton "Voir la roadmap" | Clic | `/roadmap` |
| Bouton "Tester l'API" | Clic | `/api/estimate` |
| Bouton "Découvrir les maquettes" | Clic | `/maquettes` |

---

### PAGE ROADMAP (/roadmap)

| Élément | Action | Destination |
|---------|--------|-------------|
| Bouton "Retour à l'accueil" | Clic | `/` |

---

### PAGE MAQUETTES (/maquettes)

| Élément | Action | Destination |
|---------|--------|-------------|
| Bouton "Retour à l'accueil" | Clic | `/` |

---

## 🎨 EFFETS & ANIMATIONS

### Hover effects

**Cartes** :
- Translation vers le haut : `hover:-translate-y-1`
- Bordure colorée : `hover:border-blue-200`
- Ombre renforcée : `hover:shadow-lg`

**Boutons** :
- Changement de couleur : `hover:bg-primary/90`
- Scale légère : `hover:scale-105` (CTA principal)

**Liens navbar** :
- Changement de couleur : `hover:text-gray-900`

### Transitions

- Toutes les transitions : `transition` ou `transition-colors`
- Durée par défaut : 150ms (Tailwind)

### Backdrop blur

- Navbar : `backdrop-blur-md`
- Badges Hero : `backdrop-blur`

---

## 📱 RESPONSIVE DESIGN

### Breakpoints utilisés

- **Mobile first** : Base styles pour mobile
- **sm (640px)** : Tablettes portrait
- **md (768px)** : Tablettes paysage
- **lg (1024px)** : Desktop petit
- **xl (1280px)** : Desktop standard
- **2xl (1400px)** : Desktop large

### Exemples d'adaptations

**Hero** :
- Titre : `text-5xl sm:text-6xl lg:text-[70px]`
- Statistiques : `grid gap-6 sm:grid-cols-3`

**WorkTypeGrid** :
- Grille : `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

**Features** :
- Grille : `sm:grid-cols-2 lg:grid-cols-3`

**HowItWorks** :
- Grille : `md:grid-cols-3`

**Navbar** :
- Liens : `hidden xl:flex` (masqués sur mobile)
- Bouton "Commencer" : `hidden md:inline-flex`

---

## 🔍 SEO & METADATA

### Metadata racine (layout.tsx)

```tsx
export const metadata = {
  title: 'RenovAI - Simulateur de travaux avec IA',
  description: 'Estimez le coût de vos travaux de rénovation grâce à l\'intelligence artificielle.'
}
```

### HTML lang

```tsx
<html lang="fr">
```

---

## 🚀 DÉPLOIEMENT & PRODUCTION

### Requirements

- **Node.js** : >= 18.0.0
- **pnpm** : >= 8.0.0

### Commandes de build

```bash
# Installation des dépendances
pnpm install

# Développement
pnpm dev

# Build production
pnpm build

# Démarrage production
pnpm start

# Linting
pnpm lint

# Formatage code
pnpm format

# Vérification types
pnpm type-check
```

### Variables d'environnement en production

```env
ANTHROPIC_API_KEY=sk-ant-xxx...
NEXT_PUBLIC_APP_URL=https://votredomaine.com
```

### Plateforme recommandée

- **Vercel** (déploiement automatique depuis GitHub)

---

## 📝 NOTES IMPORTANTES POUR RECRÉATION

### Points d'attention

1. **Installer toutes les dépendances** dans les versions spécifiées
2. **Configurer la clé API Claude** (ANTHROPIC_API_KEY) avant de tester l'API
3. **Utiliser pnpm** comme package manager (recommandé)
4. **Respecter la structure de fichiers** exacte pour Next.js App Router
5. **Les composants shadcn/ui** sont déjà intégrés (button, card)
6. **Les questionnaires** sont définis dans `src/data/questions.ts`
7. **L'API d'estimation** est fonctionnelle mais nécessite la clé API

### Fonctionnalités en développement

- ❌ Questionnaire interactif avec stepper
- ❌ Page de résultats détaillée
- ❌ Génération PDF
- ❌ Authentification utilisateur
- ❌ Sauvegarde des estimations
- ❌ Upload et analyse de photos

### Fonctionnalités complètes

- ✅ Landing page complète
- ✅ Navigation et routing
- ✅ Design system et composants UI
- ✅ API d'estimation IA
- ✅ Types et questionnaires définis
- ✅ Page roadmap
- ✅ Page maquettes
- ✅ Responsive design

---

## 📞 CONCLUSION

Ce document contient **TOUTES** les informations nécessaires pour recréer intégralement le site SimuTravaux :

✅ **Textes** : Tous les titres, descriptions, labels, boutons  
✅ **Actions** : Tous les clics, liens, redirections  
✅ **Questionnaires** : 3 questionnaires complets détaillés  
✅ **Structure** : Arborescence complète des fichiers  
✅ **Design** : Couleurs, typographie, animations  
✅ **Technologie** : Stack complète, dépendances, configuration  
✅ **API** : Endpoints, prompts, format de réponse  
✅ **Navigation** : Tous les liens et ancres  
✅ **Composants** : Props, variants, exemples d'usage  

**Total pages documentées** : 4 (Accueil, Simulateur, Roadmap, Maquettes)  
**Total questionnaires détaillés** : 3 (Peinture intérieure, Salle de bain, Carrelage)  
**Total types de travaux** : 15 disponibles dans le système

---

*Document généré le 18 novembre 2025*  
*Version : 1.0.0 - Documentation complète SimuTravaux*

