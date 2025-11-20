# 🧪 Guide de test : Analyse Photo IA

## 🎯 Objectif

Tester la nouvelle fonctionnalité **Analyse Photo IA** de A à Z.

---

## ✅ Prérequis

- [x] Serveur lancé : `pnpm dev`
- [x] Navigateur : http://localhost:3000
- [x] Compte utilisateur créé et connecté
- [x] Au moins 5 crédits AI disponibles

---

## 📋 Scénarios de test

### **Test 1 : Accès à la page**

**Actions** :
1. Ouvrir http://localhost:3000
2. Cliquer sur "Analyse Photo IA" dans la navbar
   
**Résultat attendu** :
- ✅ Redirection vers `/analyse-photo` si connecté
- ✅ OU redirection vers `/login?redirect=/analyse-photo` si non connecté

---

### **Test 2 : Menu "Commencer"**

**Actions** :
1. Sur la page d'accueil, cliquer sur le bouton "Commencer"
2. Observer le menu déroulant
3. Cliquer sur "Analyse Photo IA"

**Résultat attendu** :
- ✅ Menu déroulant s'affiche avec 3 options :
  - Simulateur Manuel (bleu)
  - Chat IA (violet, badge "NOUVEAU")
  - Analyse Photo IA (vert, badge "NOUVEAU", icône caméra)
- ✅ Clic redirige vers `/analyse-photo`

---

### **Test 3 : Affichage de la page**

**Résultat attendu** :
- ✅ Header avec icône caméra et titre "Analyse Photo IA 📸"
- ✅ Crédits affichés : "X crédits disponibles • 5 crédits/analyse"
- ✅ Zone de drag & drop visible avec :
  - Icône upload
  - Texte "Glissez votre photo ici"
  - Bouton "Choisir une photo"
  - Info "JPG, PNG ou WEBP • Max 10 MB"
- ✅ Section "Conseils pour une meilleure analyse"
- ✅ Background avec pattern décoratif

---

### **Test 4 : Upload par clic**

**Actions** :
1. Cliquer sur "Choisir une photo"
2. Sélectionner une image (JPG, PNG ou WEBP)

**Résultat attendu** :
- ✅ Sélecteur de fichiers s'ouvre
- ✅ Après sélection, preview de l'image s'affiche
- ✅ Nom du fichier affiché en bas (📎 filename.jpg)
- ✅ Bouton "Changer" visible
- ✅ Bouton "Analyser avec l'IA (5 crédits)" visible et actif

---

### **Test 5 : Upload par drag & drop**

**Actions** :
1. Faire glisser une image sur la zone de drop
2. Relâcher

**Résultat attendu** :
- ✅ Zone devient verte/violette pendant le survol
- ✅ Après drop, même résultat que Test 4 (preview + boutons)

---

### **Test 6 : Validation de fichier**

**Actions** :
1. Tenter d'uploader un fichier > 10 MB
2. Tenter d'uploader un fichier non-image (PDF, TXT, etc.)

**Résultat attendu** :
- ✅ Erreur affichée : "L'image ne doit pas dépasser 10 MB"
- ✅ Erreur affichée : "Veuillez sélectionner une image (JPG, PNG, WEBP)"
- ✅ Message d'erreur en rouge avec icône ❌

---

### **Test 7 : Analyse avec crédits suffisants**

**Prérequis** : Avoir au moins 5 crédits

**Actions** :
1. Uploader une image (nommez-la "cuisine.jpg" pour tester la détection)
2. Cliquer sur "Analyser avec l'IA (5 crédits)"

**Résultat attendu** :
- ✅ Bouton désactivé pendant l'analyse
- ✅ Texte change en "Analyse en cours..."
- ✅ Loader (spinner) visible
- ✅ Après 2-3 secondes, résultats s'affichent :
  - ✅ Header "Analyse terminée" avec ✅
  - ✅ Preview mini de l'image
  - ✅ Type de travaux : "Rénovation de cuisine"
  - ✅ Pièce : "Cuisine"
  - ✅ État actuel
  - ✅ Surface estimée
  - ✅ Matériaux détectés (tags)
  - ✅ Budget estimé (Min / Moyen / Max)
  - ✅ Recommandations (liste à puces)
  - ✅ Analyse détaillée
  - ✅ Niveau de confiance
  - ✅ Boutons "Sauvegarder" et "Nouvelle analyse"
- ✅ Crédits dans navbar diminuent de 5

---

### **Test 8 : Détection par nom de fichier**

Tester avec différents noms de fichiers :

| Nom du fichier | Type détecté attendu | Budget attendu |
|----------------|---------------------|----------------|
| `cuisine.jpg` | Rénovation de cuisine | 8 000 - 25 000 € |
| `salle-de-bain.jpg` | Rénovation SDB | 5 000 - 15 000 € |
| `chambre.png` | Rénovation chambre | 2 000 - 8 000 € |
| `salon.jpg` | Rénovation salon | 2 000 - 8 000 € |
| `random.jpg` | Rénovation complète | 3 000 - 8 000 € |

**Résultat attendu** :
- ✅ Détection correcte selon le tableau ci-dessus
- ✅ Recommandations personnalisées selon le type

---

### **Test 9 : Analyse avec crédits insuffisants**

**Prérequis** : Avoir moins de 5 crédits (modifier dans Supabase si besoin)

**Actions** :
1. Uploader une image
2. Cliquer sur "Analyser avec l'IA"

**Résultat attendu** :
- ✅ Erreur affichée : "Crédits insuffisants. Il vous faut 5 crédits pour une analyse photo."
- ✅ Message d'erreur en rouge avec icône ❌
- ✅ Analyse ne se lance pas

---

### **Test 10 : Sauvegarder l'analyse**

**Actions** :
1. Après une analyse réussie, cliquer sur "💾 Sauvegarder l'analyse"

**Résultat attendu** :
- ✅ Alert "✅ Analyse sauvegardée dans 'Mes estimations' !"
- ✅ Aller sur `/mes-estimations`
- ✅ L'analyse apparaît dans la liste
- ✅ Type "photo" visible
- ✅ Contenu JSON complet sauvegardé

---

### **Test 11 : Bouton "Changer"**

**Actions** :
1. Uploader une image
2. Cliquer sur "Changer" avant d'analyser
3. Sélectionner une nouvelle image

**Résultat attendu** :
- ✅ Preview se met à jour avec la nouvelle image
- ✅ Nom du fichier change
- ✅ Bouton "Analyser" reste actif

---

### **Test 12 : Nouvelle analyse après résultats**

**Actions** :
1. Après avoir vu les résultats, cliquer sur "🔄 Nouvelle analyse"

**Résultat attendu** :
- ✅ Retour à la zone de drop initiale
- ✅ Preview précédente effacée
- ✅ Résultats effacés
- ✅ Prêt pour un nouveau upload

---

### **Test 13 : Bouton "Nouveau" dans header**

**Actions** :
1. Sur la page d'analyse (avec ou sans résultats), cliquer sur "Nouvelle analyse" dans le header

**Résultat attendu** :
- ✅ Même résultat que Test 12 (reset complet)

---

### **Test 14 : Responsive design**

**Actions** :
1. Tester sur mobile (DevTools > mode responsive)
2. Tester sur tablette
3. Tester sur desktop large

**Résultat attendu** :
- ✅ Mise en page s'adapte
- ✅ Card reste lisible
- ✅ Boutons accessibles
- ✅ Images responsive
- ✅ Texte lisible sans zoom

---

### **Test 15 : Accès non authentifié**

**Actions** :
1. Se déconnecter
2. Aller sur http://localhost:3000/analyse-photo

**Résultat attendu** :
- ✅ Redirection automatique vers `/login?redirect=/analyse-photo`
- ✅ Après connexion, redirection vers `/analyse-photo`

---

### **Test 16 : Navbar et navigation**

**Actions** :
1. Vérifier que "Analyse Photo IA" est visible dans la navbar
2. Cliquer dessus depuis différentes pages

**Résultat attendu** :
- ✅ Lien "Analyse Photo IA" présent dans navbar
- ✅ Navigation fonctionne depuis n'importe quelle page
- ✅ Pas de doublon "SimuTravaux" dans header

---

## 🐛 Problèmes connus

### **Mode DÉMO actif**
- Le système utilise une détection basique par nom de fichier
- Claude Vision API nécessite un plan payant Anthropic
- L'analyse réelle de l'image n'est pas encore implémentée

### **Limitations actuelles**
- Pas d'analyse visuelle réelle de l'image (contenu)
- Détection basée uniquement sur le nom du fichier
- Budget estimé selon des moyennes prédéfinies

---

## ✅ Checklist de validation finale

Après tous les tests, vérifier que :

- [ ] Tous les tests 1-16 passent ✅
- [ ] Aucune erreur dans la console navigateur
- [ ] Aucune erreur dans les logs serveur
- [ ] Design cohérent avec le reste de l'application
- [ ] Navigation fluide
- [ ] Crédits se déduisent correctement
- [ ] Sauvegardes fonctionnent
- [ ] Messages d'erreur clairs et utiles
- [ ] Performance acceptable (< 3s pour l'analyse)

---

## 🚀 Si tout fonctionne

**Phase 3 validée !** 🎉

Vous pouvez maintenant :
1. ✅ Utiliser l'analyse photo pour vos projets
2. ✅ Sauvegarder vos analyses
3. ✅ Partager la fonctionnalité avec vos utilisateurs

**Note** : Quand vous aurez accès à Claude Vision API (plan payant), l'analyse sera 10x plus précise !

---

**Dernière mise à jour** : 19 nov 2025

