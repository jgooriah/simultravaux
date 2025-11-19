# 🚀 Guide de Déploiement - SimuTravaux

Guide complet pour déployer SimuTravaux en ligne **GRATUITEMENT** avec Vercel et Supabase.

---

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Préparation du projet](#préparation-du-projet)
3. [Déploiement sur Vercel (GRATUIT)](#déploiement-sur-vercel)
4. [Configuration Supabase Production](#configuration-supabase)
5. [Variables d'environnement](#variables-denvironnement)
6. [Domaine personnalisé (optionnel)](#domaine-personnalisé)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Prérequis

Avant de commencer, assurez-vous d'avoir :

✅ Un compte GitHub (gratuit)
✅ Votre code poussé sur GitHub (déjà fait !)
✅ Un compte Supabase (gratuit - déjà créé)
✅ Votre clé API Claude (optionnel - pour l'IA)

---

## 🔧 Préparation du projet

### Étape 1 : Vérifier le fichier `.gitignore`

Assurez-vous que `.env.local` est bien dans `.gitignore` :

```bash
# Dans le terminal
cd renovai
cat .gitignore
```

Devrait contenir :
```
.env*.local
.env
node_modules/
.next/
```

### Étape 2 : Créer un fichier `.env.example`

Créez un modèle pour les variables d'environnement :

```bash
# Copier .env.local en .env.example
cp .env.local .env.example
```

Puis **remplacez toutes les valeurs sensibles** par des placeholders dans `.env.example` :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Claude API (optionnel)
ANTHROPIC_API_KEY=sk-ant-api03-xxx
```

### Étape 3 : Pousser sur GitHub

```bash
git add .env.example
git commit -m "docs: Ajout du fichier .env.example pour le déploiement"
git push origin main
```

---

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement via le site Vercel (RECOMMANDÉ)

#### 1. Créer un compte Vercel

👉 Allez sur : **https://vercel.com/signup**

- Cliquez sur **"Continue with GitHub"**
- Autorisez Vercel à accéder à vos repos GitHub

#### 2. Importer votre projet

Une fois connecté :

1. Cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez votre repo **"simultravaux"**
3. Cliquez sur **"Import"**

#### 3. Configurer le projet

Vercel détecte automatiquement Next.js. Configurez :

**Build & Development Settings** (laissez par défaut) :
- Framework Preset : `Next.js`
- Build Command : `pnpm build` (ou `npm run build`)
- Output Directory : `.next`
- Install Command : `pnpm install` (ou `npm install`)

**Root Directory** : 
- Cliquez sur "Edit"
- Sélectionnez `renovai` (votre sous-dossier)

#### 4. Ajouter les variables d'environnement

Dans la section **"Environment Variables"**, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL = https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = (votre clé anon depuis Supabase)
ANTHROPIC_API_KEY = (votre clé Claude API - optionnel)
```

**Comment obtenir vos clés Supabase :**
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **API**
4. Copiez :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 5. Déployer !

- Cliquez sur **"Deploy"**
- Attendez 2-3 minutes ⏱️
- ✅ Votre site sera disponible sur : `https://votre-projet.vercel.app`

---

### Option 2 : Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer depuis le dossier renovai
cd renovai
vercel

# Suivre les instructions :
# - Set up and deploy ? Yes
# - Which scope ? Votre compte
# - Link to existing project ? No
# - Project name ? simultravaux
# - In which directory is your code ? ./
# - Override settings ? No

# Une fois déployé, ajouter les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ANTHROPIC_API_KEY

# Redéployer avec les variables
vercel --prod
```

---

## 🗄️ Configuration Supabase Production

### 1. Configurer les URL autorisées

Dans Supabase Dashboard :

1. **Authentication** → **URL Configuration**
2. Ajoutez votre URL Vercel dans **"Site URL"** :
   ```
   https://votre-projet.vercel.app
   ```

3. Ajoutez dans **"Redirect URLs"** :
   ```
   https://votre-projet.vercel.app/auth/callback
   https://votre-projet.vercel.app/**
   ```

### 2. Vérifier les migrations

Les migrations Supabase sont déjà appliquées via MCP. Vérifiez :

```bash
# Lister les migrations appliquées
# (utiliser l'outil MCP dans Cursor)
```

### 3. Activer RLS (Row Level Security)

Vérifiez que RLS est activé sur toutes les tables :
- `estimations` ✅
- `user_ai_credits` ✅
- `ai_estimations` ✅

---

## 🔐 Variables d'environnement

### Variables requises (Production)

```env
# Supabase (OBLIGATOIRE)
NEXT_PUBLIC_SUPABASE_URL=https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Claude API (OPTIONNEL - mode démo par défaut)
ANTHROPIC_API_KEY=sk-ant-api03-xxx
```

### Ajouter/Modifier les variables

**Via le Dashboard Vercel :**
1. Projet → **Settings** → **Environment Variables**
2. Cliquez sur **"Add New"**
3. Name : `NEXT_PUBLIC_SUPABASE_URL`
4. Value : `https://xxgtlazadodithrjsfxc.supabase.co`
5. Environment : **Production, Preview, Development**
6. Cliquez sur **"Save"**

**Via CLI :**
```bash
vercel env add VARIABLE_NAME
```

**⚠️ Important** : Après avoir modifié les variables, **redéployez** :
```bash
vercel --prod
```

Ou sur le Dashboard : **Deployments** → **...** → **Redeploy**

---

## 🌐 Domaine personnalisé

### Option 1 : Sous-domaine Vercel (GRATUIT)

Par défaut : `https://simultravaux.vercel.app`

Pour personnaliser :
1. **Settings** → **Domains**
2. Ajoutez : `simultravaux.vercel.app` (disponible si libre)

### Option 2 : Domaine personnalisé (Payant)

Si vous avez un domaine (ex: `simultravaux.com`) :

1. **Settings** → **Domains**
2. Cliquez sur **"Add"**
3. Entrez votre domaine : `simultravaux.com`
4. Suivez les instructions pour configurer les DNS :
   - **Type A** : `76.76.21.21`
   - **Type CNAME** : `cname.vercel-dns.com`

5. Attendez la propagation DNS (5-30 minutes)

---

## 🐛 Troubleshooting

### Problème : Build échoue

**Erreur : `Module not found`**

Solution :
```bash
# Vérifier package.json
cd renovai
cat package.json

# S'assurer que toutes les dépendances sont présentes
pnpm install
git add package.json pnpm-lock.yaml
git commit -m "fix: Mise à jour des dépendances"
git push
```

**Erreur : `Type error`**

Solution :
```bash
# Vérifier les erreurs TypeScript localement
pnpm run build

# Corriger les erreurs, puis pousser
git add .
git commit -m "fix: Correction des erreurs TypeScript"
git push
```

### Problème : Variables d'environnement non détectées

Solution :
1. Vérifiez que les variables commencent par `NEXT_PUBLIC_` pour être accessibles côté client
2. Redéployez après avoir ajouté les variables
3. Vérifiez dans **Deployments** → **Details** → **Environment Variables**

### Problème : Erreurs d'authentification Supabase

Solution :
1. Vérifiez que l'URL Vercel est dans **Supabase** → **Authentication** → **URL Configuration**
2. Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont corrects
3. Redéployez

### Problème : Chat IA ne fonctionne pas

C'est normal ! Le mode démo est activé par défaut.

Pour activer Claude API :
1. Ajoutez `ANTHROPIC_API_KEY` dans les variables Vercel
2. Redéployez
3. Si l'erreur `404 model not found` persiste, le mode démo restera actif (voir `src/app/api/ai/chat/route.ts`)

### Problème : Images ou CSS ne chargent pas

Solution :
```bash
# Vérifier next.config.js
cat next.config.js

# S'assurer qu'il contient :
# images: { domains: ['xxgtlazadodithrjsfxc.supabase.co'] }
```

---

## ✅ Checklist finale

Avant de lancer en production :

- [ ] Code poussé sur GitHub
- [ ] `.env.local` dans `.gitignore`
- [ ] `.env.example` créé et poussé
- [ ] Projet importé sur Vercel
- [ ] Variables d'environnement ajoutées
- [ ] URL Vercel ajoutée dans Supabase
- [ ] Premier déploiement réussi
- [ ] Authentification testée
- [ ] Chat IA testé (mode démo OK)
- [ ] Analyse Photo testée
- [ ] Mes estimations testé

---

## 🎉 Félicitations !

Votre site est maintenant en ligne ! 🚀

**URL de production** : https://simultravaux.vercel.app (ou votre domaine)

**Prochaines étapes :**
- Partager le lien avec vos utilisateurs
- Monitorer les erreurs sur Vercel Dashboard
- Ajouter un domaine personnalisé (optionnel)
- Configurer Google Analytics (optionnel)

---

## 📊 Monitoring et Analytics

### Vercel Analytics (GRATUIT)

Activez les analytics Vercel :
1. Projet → **Analytics**
2. Cliquez sur **"Enable"**
3. Suivez les instructions

### Logs en temps réel

```bash
# Voir les logs en temps réel
vercel logs https://votre-projet.vercel.app

# Voir les logs d'un déploiement spécifique
vercel logs [deployment-url]
```

---

## 🔄 Mises à jour futures

À chaque fois que vous faites des modifications :

```bash
# Développer localement
pnpm dev

# Tester
# ...

# Pousser sur GitHub
git add .
git commit -m "feat: Nouvelle fonctionnalité"
git push origin main
```

**Vercel redéploiera automatiquement** votre site à chaque push ! 🎯

---

## 💰 Limites du plan gratuit Vercel

**Plan Hobby (Gratuit) inclut :**
- ✅ Déploiements illimités
- ✅ 100 GB de bande passante / mois
- ✅ SSL automatique (HTTPS)
- ✅ Domaine personnalisé
- ✅ Analytics basiques
- ✅ Preview deployments (branches)

**Limitations :**
- ⏱️ Timeout de 10 secondes par fonction serverless
- 📦 4,5 MB maximum par fonction
- 🔄 Pas de déploiement commercial

Pour plus : https://vercel.com/pricing

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Support Vercel](https://vercel.com/support)

---

**Besoin d'aide ?** Posez vos questions ! 😊

