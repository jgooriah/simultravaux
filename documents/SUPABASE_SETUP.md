# 🚀 Configuration Supabase pour SimuTravaux

## ✅ Tables créées dans Supabase

Les tables suivantes ont été créées avec succès :

1. **`profiles`** - Profils utilisateurs
2. **`estimations`** - Estimations sauvegardées
3. **`shared_estimations`** - Partages d'estimations
4. **`contact_requests`** - Demandes de contact

Toutes les tables ont **Row Level Security (RLS)** activée pour la sécurité.

---

## 🔧 Configuration requise

### **Étape 1 : Mettre à jour le fichier `.env.local`**

Ouvrez le fichier `renovai/.env.local` et **ajoutez** ces lignes :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4Z3RsYXphZG9kaXRocmpzZnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NjAzNDksImV4cCI6MjA3OTAzNjM0OX0.l88Ck3cSysg4scExuA9931YY22Zeo_GpaP6j5MIuL3o
```

Le fichier `.env.local` complet devrait ressembler à :

```env
# Anthropic API (pour l'IA d'estimation)
ANTHROPIC_API_KEY=sk-ant-api03-remplacez-moi-par-votre-vraie-clé

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4Z3RsYXphZG9kaXRocmpzZnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NjAzNDksImV4cCI6MjA3OTAzNjM0OX0.l88Ck3cSysg4scExuA9931YY22Zeo_GpaP6j5MIuL3o
```

### **Étape 2 : Redémarrer le serveur de développement**

Après avoir modifié `.env.local`, **arrêtez** le serveur (`Ctrl+C`) et **relancez-le** :

```bash
cd renovai
pnpm dev
```

---

## 🎉 C'est tout !

Maintenant :

1. **Allez sur http://localhost:3000/signup**
2. **Créez un compte**
3. **Vérifiez dans Supabase** (Dashboard → Authentication → Users)

Vous devriez voir votre utilisateur apparaître ! 🚀

---

## 📋 Fonctionnalités activées

✅ Inscription avec Supabase Auth  
✅ Connexion avec Supabase Auth  
✅ Session persistante (cookies)  
✅ Profils utilisateurs automatiquement créés  
✅ Row Level Security (sécurité des données)  
✅ Middleware pour protéger les routes  

---

## 🔍 Vérifier les utilisateurs dans Supabase

### Via SQL :

```sql
SELECT id, email, created_at FROM auth.users;
```

### Via le Dashboard Supabase :

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Cliquez sur **Authentication** → **Users**

---

## 🛠️ Troubleshooting

### Erreur "Invalid API key" ou "Missing environment variables"

➡️ Vérifiez que `.env.local` contient bien les clés Supabase  
➡️ Redémarrez le serveur après modification

### L'inscription ne fonctionne pas

➡️ Ouvrez la console du navigateur (F12)  
➡️ Vérifiez s'il y a des erreurs réseau ou CORS

### Les utilisateurs n'apparaissent pas dans Supabase

➡️ Vérifiez que vous êtes connecté au bon projet Supabase  
➡️ Essayez d'actualiser la page du dashboard

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes, partagez les logs d'erreur !

