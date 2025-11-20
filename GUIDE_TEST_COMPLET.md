# 🧪 Guide de Test Complet - SimuTravaux

**Date** : 20 novembre 2025  
**Status** : ✅ Tous les bugs corrigés

---

## 🎯 Objectif

Tester les **3 méthodes d'estimation** et vérifier que :
1. ✅ Les estimations se sauvegardent dans **Supabase**
2. ✅ Le **budget moyen** s'affiche dans "Mes estimations"
3. ✅ La **surface** et les **détails** s'affichent correctement
4. ✅ Pas d'erreur 500

---

## 🚀 Prérequis

### **1. Serveur en cours d'exécution**
```powershell
cd "C:\Users\Julian\OneDrive - Ecole IPSSI\Bureau\simulateur\renovai"
pnpm dev
```

✅ Vérifier : `http://localhost:3000`

### **2. Compte utilisateur créé**
```
- Email : votre.email@example.com
- Mot de passe : ********
```

✅ Si pas encore créé : `http://localhost:3000/signup`

### **3. Connexion Supabase active**
```
- Dashboard : https://supabase.com/dashboard
- Projet : votre-projet-renovai
```

---

## 📋 TEST 1 : Simulateur Manuel

### **Étapes**

#### **1. Accéder au simulateur**
```
http://localhost:3000/simulateur
```

#### **2. Choisir "Simulateur Manuel"**
- Cliquer sur la carte bleue **"Simulateur Manuel"**
- Bouton : **"Démarrer le questionnaire"**

#### **3. Sélectionner un type de travaux**
- Exemple : **"Peinture intérieure"**
- Cliquer sur **"Choisir ce type de travaux"**

#### **4. Répondre au questionnaire (5 questions)**

| Question | Réponse exemple |
|----------|----------------|
| Surface à peindre | **15** m² |
| Type de façade | **Lisse** |
| État actuel | **Bon** |
| Code postal | **75000** |
| Délai souhaité | **Normal** |

#### **5. Obtenir l'estimation**
- Cliquer sur **"Obtenir mon estimation"**
- ✅ Page de résultats s'affiche

#### **6. Vérifier les résultats**
```
✅ Type : "Peinture intérieure"
✅ Surface : "15m²"
✅ Budget estimé :
   - Min : 1 500 €
   - Moyen : 2 000 €
   - Max : 2 500 €
✅ Délai : "2-3 jours"
```

#### **7. Sauvegarder l'estimation**
- Se connecter si nécessaire
- Cliquer sur **"Sauvegarder"**
- ✅ Message : **"Estimation sauvegardée avec succès"**

#### **8. Vérifier dans "Mes estimations"**
- Menu utilisateur (en haut à droite)
- Cliquer sur **"Mes estimations"**
- ✅ Carte affichée :
  ```
  📊 Peinture intérieure
  📐 Surface : 15m²
  💰 Budget moyen : 2 000 €
  📅 Date : Aujourd'hui
  ```

#### **9. Voir les détails**
- Cliquer sur **"Voir détails"**
- ✅ Modal affichant :
  - Type de travaux : **"Peinture intérieure"**
  - Surface : **"15m²"**
  - Budget min : **1 500 €**
  - Budget moyen : **2 000 €**
  - Budget max : **2 500 €**
  - Qualité : **"Standard"**
  - Code postal : **"75000"**
  - Délai : **"2-3 jours"**

---

## 💬 TEST 2 : Chat IA

### **Étapes**

#### **1. Accéder au Chat IA**
```
http://localhost:3000/chat
```

#### **2. Envoyer un message**
Exemple de message :
```
Je veux rénover ma salle de bain de 15m² en qualité standard. Mon code postal est 75000.
```

#### **3. Attendre la réponse de l'IA**
- L'IA analyse votre demande
- ✅ Réponse affichée avec :
  - Type de travaux
  - Surface
  - Budget estimé
  - Délai
  - Conseils

#### **4. Vérifier le bouton "Sauvegarder"**
- ✅ Bouton **"💾 Sauvegarder"** apparaît si :
  - Message contient un budget
  - Message > 200 caractères

#### **5. Sauvegarder l'estimation**
- Cliquer sur **"💾 Sauvegarder"**
- Se connecter si nécessaire (redirection automatique)
- ✅ Message : **"Estimation sauvegardée dans 'Mes estimations' !"**

#### **6. Vérifier dans "Mes estimations"**
- Menu utilisateur → **"Mes estimations"**
- ✅ Carte affichée :
  ```
  💬 Rénovation Salle de Bain
  📐 Surface : 15m²
  💰 Budget moyen : 2 500 €
  📅 Date : Aujourd'hui
  ```

#### **7. Voir les détails**
- Cliquer sur **"Voir détails"**
- ✅ Modal affichant :
  - Type de travaux : **"Rénovation Salle de Bain"**
  - Surface : **"15m²"**
  - Budget min : **2 000 €**
  - Budget moyen : **2 500 €**
  - Budget max : **3 000 €**
  - Qualité : **"Standard"**
  - Code postal : **"75000"**
  - Délai : **"2-3 jours"**

---

## 📸 TEST 3 : Analyse Photo IA

### **Étapes**

#### **1. Se connecter (OBLIGATOIRE)**
```
http://localhost:3000/login
```
- Email : votre.email@example.com
- Mot de passe : ********

#### **2. Accéder à l'Analyse Photo**
```
http://localhost:3000/analyse-photo
```

#### **3. Uploader une photo**
- Cliquer sur **"Choisir une photo"** ou glisser-déposer
- Sélectionner une photo de salle de bain, cuisine, etc.
- ✅ Aperçu de la photo affiché

#### **4. Analyser la photo**
- Cliquer sur **"Analyser avec l'IA"**
- Attendre l'analyse (quelques secondes)
- ✅ Résultats affichés :
  ```
  🏠 Type de pièce : Salle de bain
  🔧 Type de travaux : Rénovation complète
  📐 Surface estimée : 12m²
  💰 Budget estimé :
     - Min : 3 000 €
     - Moyen : 4 000 €
     - Max : 5 000 €
  ⚙️ État actuel : Bon
  🛠️ Matériaux détectés : carrelage, plomberie
  💡 Recommandations : ...
  ```

#### **5. Sauvegarder l'analyse**
- Cliquer sur **"💾 Sauvegarder l'analyse"**
- ✅ Message : **"Analyse sauvegardée dans 'Mes estimations' !"**

#### **6. Vérifier dans "Mes estimations"**
- Menu utilisateur → **"Mes estimations"**
- ✅ Carte affichée :
  ```
  📸 Rénovation complète
  📐 Surface : 12m²
  💰 Budget moyen : 4 000 €
  📅 Date : Aujourd'hui
  ```

#### **7. Voir les détails**
- Cliquer sur **"Voir détails"**
- ✅ Modal affichant :
  - Type de travaux : **"Rénovation complète"**
  - Surface : **"12m²"**
  - Budget min : **3 000 €**
  - Budget moyen : **4 000 €**
  - Budget max : **5 000 €**
  - Type de pièce : **"Salle de bain"**
  - État actuel : **"Bon"**

---

## 🗄️ TEST 4 : Vérification Supabase

### **Étapes**

#### **1. Accéder au Dashboard Supabase**
```
https://supabase.com/dashboard
```

#### **2. Ouvrir votre projet**
- Sélectionner votre projet RenovAI

#### **3. Ouvrir Table Editor**
- Menu gauche : **Table Editor**
- Table : **estimations**

#### **4. Vérifier les données**

##### **Colonnes à vérifier**
| Colonne | Valeur attendue |
|---------|----------------|
| `id` | UUID unique |
| `user_id` | Votre UUID utilisateur |
| `work_type_name` | "Peinture intérieure" / "Rénovation Salle de Bain" / "Rénovation complète" |
| `estimation_min` | 1500 / 2000 / 3000 |
| `estimation_max` | 2500 / 3000 / 5000 |
| `estimation_moyen` | ✅ **2000 / 2500 / 4000** |
| `method_type` | ✅ **`simulateur_manuel` / `chat_ia` / `analyse_photo`** |
| `questionnaire_answers` | JSONB avec `surface-area`, `quality`, `postal-code` |
| `created_at` | Timestamp actuel |

##### **Vérification `method_type`**
✅ Vous devriez voir **3 lignes** avec :
1. `method_type` = **`simulateur_manuel`**
2. `method_type` = **`chat_ia`**
3. `method_type` = **`analyse_photo`**

#### **5. Vérifier `questionnaire_answers`**

**Simulateur Manuel** :
```json
{
  "surface-area": 15,
  "paint-quality": "standard",
  "postal-code": "75000"
}
```

**Chat IA** :
```json
{
  "surface-area": 15,
  "quality": "Standard",
  "postal-code": "75000",
  "chat_id": "chat_123..."
}
```

**Analyse Photo** :
```json
{
  "surface-area": 12,
  "room-type": "Salle de bain",
  "work-type": "Rénovation complète",
  "materials": ["carrelage", "plomberie"],
  "current-state": "Bon"
}
```

---

## ❌ Tests d'erreur

### **1. Sauvegarder sans connexion (Chat IA)**
```
1. Se déconnecter
2. Chat IA → Envoyer un message avec budget
3. Cliquer "Sauvegarder"
4. ✅ Message : "Vous devez être connecté pour sauvegarder"
5. ✅ Redirection vers /login
```

### **2. Analyse Photo sans connexion**
```
1. Se déconnecter
2. Accéder à /analyse-photo
3. ✅ Redirection automatique vers /login
```

### **3. Suppression d'estimation**
```
1. "Mes estimations" → Cliquer sur l'icône 🗑️
2. Confirmer la suppression
3. ✅ Estimation disparaît
4. Vérifier dans Supabase : ✅ Ligne supprimée
```

---

## 📊 Checklist finale

### **Simulateur Manuel** ✅
- [ ] Questionnaire complété
- [ ] Résultats affichés avec budget moyen
- [ ] Sauvegarde réussie
- [ ] Affichage dans "Mes estimations" avec surface et budget
- [ ] Détails complets dans la modal
- [ ] Ligne dans Supabase avec `method_type: simulateur_manuel`

### **Chat IA** ✅
- [ ] Message envoyé avec succès
- [ ] Réponse de l'IA affichée
- [ ] Bouton "Sauvegarder" visible
- [ ] Sauvegarde réussie (avec connexion)
- [ ] Affichage dans "Mes estimations" avec surface et budget
- [ ] Détails complets dans la modal
- [ ] Ligne dans Supabase avec `method_type: chat_ia`

### **Analyse Photo IA** ✅
- [ ] Connexion obligatoire
- [ ] Photo uploadée
- [ ] Analyse réussie
- [ ] Résultats affichés avec budget moyen
- [ ] Sauvegarde réussie
- [ ] Affichage dans "Mes estimations" avec surface et budget
- [ ] Détails complets dans la modal
- [ ] Ligne dans Supabase avec `method_type: analyse_photo`

### **Supabase** ✅
- [ ] 3 lignes dans la table `estimations`
- [ ] `estimation_moyen` rempli pour toutes
- [ ] `questionnaire_answers` avec `surface-area`
- [ ] `method_type` correct (`simulateur_manuel`, `chat_ia`, `analyse_photo`)
- [ ] Pas d'erreur de contrainte

### **Erreurs** ✅
- [ ] Pas d'erreur 500
- [ ] Redirection vers login si non connecté
- [ ] Suppression fonctionne

---

## 🎉 Résultat attendu

### **"Mes estimations" doit afficher** ✅

```
┌─────────────────────────────────────────────────────────┐
│ 📊 Peinture intérieure                                  │
│ 📐 Surface : 15m²                                       │
│ 💰 Budget moyen : 2 000 €                              │
│ 📅 Aujourd'hui                                          │
│ [Voir détails] [🗑️]                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 💬 Rénovation Salle de Bain                            │
│ 📐 Surface : 15m²                                       │
│ 💰 Budget moyen : 2 500 €                              │
│ 📅 Aujourd'hui                                          │
│ [Voir détails] [🗑️]                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📸 Rénovation complète                                  │
│ 📐 Surface : 12m²                                       │
│ 💰 Budget moyen : 4 000 €                              │
│ 📅 Aujourd'hui                                          │
│ [Voir détails] [🗑️]                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🐛 En cas de problème

### **Erreur 500**
1. Vérifier les logs du serveur (terminal)
2. Vérifier la console du navigateur (F12)
3. Vérifier les contraintes Supabase

### **Budget moyen = "?"**
1. Vérifier que `estimation_moyen` est bien rempli dans Supabase
2. Vérifier que `questionnaire_answers` contient `surface-area`

### **Pas de sauvegarde**
1. Vérifier que vous êtes connecté
2. Vérifier les logs de l'API (`/api/estimations/save-*`)
3. Vérifier les RLS policies dans Supabase

### **Commandes utiles**
```powershell
# Redémarrer le serveur
Ctrl+C
pnpm dev

# Nettoyer le cache Next.js
rm -r .next
pnpm dev

# Vérifier le port 3000
netstat -ano | findstr :3000
```

---

**🎊 TOUS LES TESTS DOIVENT PASSER ! 🎊**

**Si un test échoue, consultez les logs et la documentation associée.**

**Dernière mise à jour** : 20 novembre 2025

