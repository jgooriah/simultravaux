# 🎯 Guide Rapide Cursor - RenovAI

## Configuration Cursor pour RenovAI

### 1. Ouvrir le Projet dans Cursor

```bash
# Après avoir créé le projet
cd renovai
cursor .
```

### 2. Copier .cursorrules

Le fichier `.cursorrules` DOIT être à la racine du projet :
```bash
cp path/to/.cursorrules ./
```

### 3. Activer les Fonctionnalités Cursor

Dans Cursor, vérifie que :
- ✅ Cursor Rules est activé (Settings > Features)
- ✅ AI Chat est disponible
- ✅ Cmd+K pour édition inline

## 🚀 Commandes Cursor Utiles

### Génération de Composants

**Créer un nouveau composant :**
```
CMD+K : "Créer un composant TypeSelector qui affiche une grille de 
cards pour sélectionner le type de travaux. Utiliser shadcn/ui Card, 
suivre les conventions du projet."
```

**Ajouter des fonctionnalités :**
```
CMD+K : "Ajouter un système de filtrage par catégorie à ce composant"
```

### Utilisation du Chat

**Pour créer un composant complexe :**
```
Chat : "Crée-moi le composant QuestionStep.tsx qui :
- Affiche les questions du step actuel
- Gère la validation avec React Hook Form
- Supporte tous les types de questions (text, number, select, etc.)
- Suit les conventions du projet (.cursorrules)
- Utilise shadcn/ui pour les inputs"
```

**Pour débugger :**
```
Chat : "J'ai une erreur TypeScript sur ce composant, peux-tu l'analyser 
et proposer une solution ?"
```

## 📝 Prompts Recommandés par Phase

### Phase 1 : Landing Page

```
"Crée un Footer avec 3 colonnes :
- À propos (logo, description)
- Liens rapides (Fonctionnalités, Comment ça marche, Contact)
- Légal (CGU, Mentions légales)
Utilise Tailwind, responsive, style moderne."
```

### Phase 2 : Sélecteur de Travaux

```
"Crée le composant TypeSelector.tsx qui :
1. Affiche tous les types de travaux dans une grille
2. Permet de filtrer par catégorie (boutons en haut)
3. Chaque card montre : icône, nom, description, prix moyen
4. Au clic, redirige vers /simulator/[workTypeId]
5. Utilise les données de work-types.ts
6. Animation hover sur les cards"
```

### Phase 3 : Questionnaire

```
"Crée le système de questionnaire complet avec :
- Stepper horizontal montrant la progression
- Navigation précédent/suivant
- Validation en temps réel
- Questions conditionnelles
- Toutes les implémentations des types de questions
Suis .cursorrules pour la structure."
```

### Phase 4 : Intégration IA

```
"Aide-moi à améliorer le prompt d'estimation pour que l'IA :
- Soit plus précise sur les prix
- Prenne mieux en compte la localisation
- Génère des conseils plus pertinents
- Améliore le détail des postes"
```

### Phase 5 : Résultats

```
"Crée la page de résultats /result qui :
- Affiche la fourchette de prix avec design attractif
- Montre le breakdown des coûts dans un tableau
- Liste les facteurs influençant le prix
- Propose des conseils personnalisés
- Bouton pour télécharger le PDF
- Bouton pour faire une nouvelle estimation"
```

## 💡 Astuces Cursor

### Édition Multi-fichiers

1. Sélectionne plusieurs fichiers dans l'explorateur
2. CMD+K sur la sélection
3. "Refactor ces composants pour utiliser un hook partagé"

### Auto-complétion Intelligente

Cursor apprend de ton code. Plus tu codes, plus il devient précis :
- Laisse-le suggérer les imports
- Accepte les suggestions de structure
- Utilise Tab pour accepter

### Context Awareness

Cursor comprend :
- Les conventions du projet (.cursorrules)
- Les types TypeScript
- La structure des composants existants
- Les dépendances installées

### Refactoring

```
CMD+K sur un composant : "Extraire la logique métier dans un hook 
personnalisé useSomething"
```

## 🎨 Exemples de Prompts Spécifiques

### Créer un Composant de Question

```
Chat : "Crée TextField.tsx qui :
- Props : question (Question type), value, onChange, error
- Utilise shadcn/ui Input
- Affiche label, description, placeholder
- Gère la validation avec affichage d'erreur
- Type TypeScript strict
- Export named component"
```

### Styliser un Composant

```
CMD+K : "Améliore le design de ce composant :
- Ajoute des animations Framer Motion
- Rends-le plus moderne
- Améliore les hover states
- Garde le code propre"
```

### Créer une API Route

```
Chat : "Crée l'API route /api/pdf/route.ts qui :
- Reçoit les données d'estimation en POST
- Génère un PDF avec jsPDF
- Template professionnel avec logo
- Retourne le PDF en base64
- Gère les erreurs
- Valide avec Zod"
```

### Ajouter des Tests

```
Chat : "Crée des tests pour le composant TypeSelector :
- Test du rendu initial
- Test du filtrage
- Test de la navigation
- Utilise Testing Library"
```

## 🔧 Debugging avec Cursor

### Erreur TypeScript

```
CMD+K sur l'erreur : "Explique cette erreur TypeScript et propose une fix"
```

### Bug de Logique

```
Chat : "Ce composant ne met pas à jour l'état correctement. 
Voici le code : [coller le code]. Qu'est-ce qui ne va pas ?"
```

### Performance

```
Chat : "Ce composant re-render trop souvent. Comment l'optimiser ?"
```

## 📚 Ressources Cursor

### Shortcuts Essentiels

```
CMD+K         → Édition inline
CMD+L         → Chat AI
CMD+I         → Composer (multi-fichiers)
CMD+Shift+K   → Terminal AI
```

### Commandes Chat Utiles

```
"/edit"       → Édite le fichier actuel
"/fix"        → Corrige les erreurs
"/explain"    → Explique le code sélectionné
"/docs"       → Cherche dans la documentation
```

## 🎯 Best Practices

### 1. Sois Spécifique
❌ "Crée un formulaire"
✅ "Crée un formulaire de questionnaire avec React Hook Form, validation Zod, et shadcn/ui inputs"

### 2. Donne du Contexte
Mentionne toujours :
- Les fichiers liés
- Les conventions à suivre
- Les contraintes spécifiques

### 3. Itère Progressivement
- Commence simple
- Ajoute les features une par une
- Teste entre chaque ajout

### 4. Utilise .cursorrules
Les règles sont automatiquement prises en compte :
```
"Crée un composant suivant les règles du projet"
→ Cursor appliquera automatiquement .cursorrules
```

## 🚀 Workflow Recommandé

### 1. Planification
```
Chat : "Je veux créer [feature]. Quelle est la meilleure approche 
en suivant l'architecture du projet ?"
```

### 2. Implémentation
```
CMD+K ou Chat : Création du composant/feature
```

### 3. Refactoring
```
CMD+K : "Améliore la structure de ce code"
```

### 4. Tests
```
Chat : "Crée les tests pour ce composant"
```

### 5. Documentation
```
Chat : "Ajoute des JSDoc comments à ces fonctions"
```

## 💎 Pro Tips

### Use Case : Créer une Feature Complète

```
1. Chat : "Explique-moi l'architecture nécessaire pour [feature]"
2. Crée les types TypeScript
3. CMD+K : Génère les composants un par un
4. Chat : "Intègre ces composants ensemble"
5. CMD+K : Ajoute les animations
6. Test manuel
7. Chat : "Quelles optimisations possibles ?"
```

### Use Case : Debugging

```
1. Sélectionne le code problématique
2. CMD+L : "Qu'est-ce qui ne va pas ici ?"
3. Applique la solution suggérée
4. Si ça ne marche pas : "Cette solution ne fonctionne pas, 
   voici l'erreur : [erreur]. Autre approche ?"
```

### Use Case : Apprentissage

```
Chat : "Explique-moi comment fonctionne [concept] dans le contexte 
de ce projet. Donne-moi des exemples avec notre code."
```

## 🎓 Formation Continue

Au fur et à mesure du projet :

1. **Observe les suggestions** - Cursor apprend de tes patterns
2. **Améliore les prompts** - Plus précis = meilleurs résultats
3. **Explore le Chat** - Pose des questions sur l'architecture
4. **Utilise @fichier** - Référence des fichiers spécifiques dans le chat

---

**Rappel** : .cursorrules contient toutes les conventions du projet. 
Cursor les applique automatiquement, mais tu peux aussi les mentionner 
explicitement dans tes prompts pour plus de précision.

**Bon développement avec Cursor ! 🚀**
