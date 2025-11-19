# ⚡ Déploiement Rapide - 5 Minutes

Guide ultra-rapide pour déployer SimuTravaux en ligne **GRATUITEMENT**.

---

## 🎯 Option 1 : Vercel (RECOMMANDÉ)

**Temps estimé : 5 minutes**

### Étape 1 : Compte Vercel (1 min)

1. 👉 Allez sur : **https://vercel.com/signup**
2. Cliquez sur **"Continue with GitHub"**
3. Autorisez Vercel

### Étape 2 : Importer le projet (2 min)

1. Cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez **"simultravaux"** (votre repo GitHub)
3. Cliquez sur **"Import"**
4. **Root Directory** : Sélectionnez `renovai`

### Étape 3 : Variables d'environnement (1 min)

Ajoutez ces 2 variables obligatoires :

```
NEXT_PUBLIC_SUPABASE_URL = https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = (votre clé - voir ci-dessous)
```

**Où trouver ces valeurs ?**
1. https://supabase.com/dashboard
2. Votre projet → **Settings** → **API**
3. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Étape 4 : Déployer ! (1 min)

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes ⏱️
3. ✅ **C'EST EN LIGNE !** 🎉

### Étape 5 : Configurer Supabase

Dans Supabase Dashboard :
1. **Authentication** → **URL Configuration**
2. **Site URL** : `https://votre-projet.vercel.app`
3. **Redirect URLs** : `https://votre-projet.vercel.app/**`

---

## 🚀 Option 2 : Netlify (ALTERNATIF)

**Temps estimé : 5 minutes**

### Étape 1 : Compte Netlify

1. 👉 https://app.netlify.com/signup
2. **"Sign up with GitHub"**

### Étape 2 : Importer

1. **"Add new site"** → **"Import an existing project"**
2. Sélectionnez **"simultravaux"**
3. **Base directory** : `renovai`
4. **Build command** : `pnpm build` (ou `npm run build`)
5. **Publish directory** : `.next`

### Étape 3 : Variables

**Site settings** → **Environment variables** → **Add a variable**

```
NEXT_PUBLIC_SUPABASE_URL = https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = (votre clé anon)
```

### Étape 4 : Déployer

1. Cliquez sur **"Deploy site"**
2. Attendez 3-4 minutes
3. ✅ En ligne sur : `https://votre-site.netlify.app`

---

## 🌩️ Option 3 : Cloudflare Pages

**Temps estimé : 5 minutes**

### Étape 1 : Compte Cloudflare

1. 👉 https://dash.cloudflare.com/sign-up
2. Créez un compte (email + mot de passe)
3. **Pages** → **Create a project**

### Étape 2 : Connecter GitHub

1. **"Connect to Git"**
2. Autorisez Cloudflare
3. Sélectionnez **"simultravaux"**

### Étape 3 : Configuration

- **Project name** : `simultravaux`
- **Production branch** : `main`
- **Build directory** : `renovai`
- **Build command** : `pnpm build`
- **Output directory** : `.next`
- **Framework preset** : `Next.js`

### Étape 4 : Variables d'environnement

Avant de déployer, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL = https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = (votre clé)
```

### Étape 5 : Déployer

1. **"Save and Deploy"**
2. ✅ En ligne : `https://simultravaux.pages.dev`

---

## 📊 Comparaison des plateformes

| Plateforme | Gratuit | Vitesse déploiement | Support Next.js | Recommandation |
|------------|---------|---------------------|-----------------|----------------|
| **Vercel** | ✅ Oui | ⚡ 2-3 min | ⭐⭐⭐⭐⭐ | **🏆 MEILLEUR** |
| **Netlify** | ✅ Oui | ⚡ 3-4 min | ⭐⭐⭐⭐ | Très bon |
| **Cloudflare** | ✅ Oui | ⚡ 3-4 min | ⭐⭐⭐⭐ | Excellent |

---

## 🎁 Avantages de chaque plateforme

### Vercel (RECOMMANDÉ)
- ✅ Créateurs de Next.js (support optimal)
- ✅ Déploiement automatique sur chaque push
- ✅ Preview deployments (branches)
- ✅ Analytics inclus
- ✅ Edge functions
- ✅ Image optimization

### Netlify
- ✅ Interface très simple
- ✅ Formulaires intégrés
- ✅ Split testing A/B
- ✅ Deploy previews

### Cloudflare Pages
- ✅ CDN ultra-rapide mondial
- ✅ Bande passante illimitée
- ✅ DDoS protection
- ✅ Workers (serverless)

---

## ⚡ Commandes utiles

### Vercel CLI

```bash
# Installer
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd renovai
vercel --prod

# Voir les logs
vercel logs
```

### Netlify CLI

```bash
# Installer
npm i -g netlify-cli

# Se connecter
netlify login

# Déployer
cd renovai
netlify deploy --prod

# Voir les logs
netlify logs
```

---

## 🐛 Problèmes fréquents

### Build échoue

**Solution :**
```bash
# Tester le build localement
cd renovai
pnpm build

# Si ça marche localement, vérifier :
# 1. Root directory est "renovai"
# 2. Build command est "pnpm build" ou "npm run build"
# 3. Node version dans package.json
```

### Variables d'environnement non détectées

**Solution :**
1. Vérifiez qu'elles commencent par `NEXT_PUBLIC_`
2. Redéployez après les avoir ajoutées
3. Clear cache + Redeploy

### Authentification Supabase ne fonctionne pas

**Solution :**
1. Ajoutez l'URL de votre site dans Supabase
2. **Authentication** → **URL Configuration**
3. **Redirect URLs** : `https://votre-site.com/**`

---

## ✅ Checklist rapide

Avant de déployer :

- [ ] Code poussé sur GitHub
- [ ] Clés Supabase récupérées
- [ ] Compte Vercel/Netlify/Cloudflare créé
- [ ] Projet importé
- [ ] Variables d'environnement ajoutées
- [ ] **Deploy** cliqué !

Après le déploiement :

- [ ] URL Vercel/Netlify/Cloudflare ajoutée dans Supabase
- [ ] Authentification testée
- [ ] Chat IA testé
- [ ] Estimations testées

---

## 🎉 C'EST EN LIGNE !

**Votre site est maintenant accessible partout dans le monde !** 🌍

**Partagez le lien :**
```
https://votre-projet.vercel.app
```

---

## 📱 Tester sur mobile

1. Ouvrez l'URL sur votre téléphone
2. Testez la navigation
3. Testez l'inscription
4. Testez une estimation

---

## 🔄 Mises à jour automatiques

À chaque fois que vous faites un `git push`, votre site se met à jour automatiquement ! 🚀

```bash
# Développer
pnpm dev

# Pousser
git add .
git commit -m "feat: Nouvelle fonctionnalité"
git push

# ✅ Automatiquement redéployé en 2-3 minutes !
```

---

## 🆘 Besoin d'aide ?

- **Vercel** : https://vercel.com/support
- **Netlify** : https://www.netlify.com/support/
- **Cloudflare** : https://community.cloudflare.com/

---

**Bon déploiement ! 🚀**

