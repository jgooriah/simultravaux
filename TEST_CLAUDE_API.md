# 🧪 TEST Claude API - Guide rapide

## 📋 Checklist de vérification

### 1️⃣ **Vérifiez que le serveur tourne**
- Ouvrez le terminal où `pnpm dev` tourne
- Vous devriez voir :
```
✓ Compiled /api/ai/chat in XXXms
```

### 2️⃣ **Vérifiez les logs au démarrage**
Cherchez cette ligne :
```
🤖 [Chat API Config] ✅ CLAUDE API ACTIVÉE
```

**SI VOUS VOYEZ** `⚠️ MODE DÉMO` = La clé n'est PAS détectée

**Solution** :
1. Arrêtez le serveur (Ctrl+C)
2. Vérifiez `.env.local` : `ANTHROPIC_API_KEY=sk-ant-...`
3. Relancez : `pnpm dev`

### 3️⃣ **Testez le chat**
1. Allez sur : http://localhost:3000/chat
2. Tapez : "Je veux rénover ma cuisine"
3. Envoyez (Enter ou cliquer Envoyer)

**Attendez 5-10 secondes** (Claude prend du temps)

### 4️⃣ **Regardez les logs pendant que vous testez**
Dans le terminal, vous devriez voir :
```
🔵 [Chat API] Requête reçue
✅ [Claude API] Appel à Claude...
📡 [Claude API] Stream démarré
✅ [Claude API] Réponse complète
```

**SI VOUS VOYEZ** `⚠️ [Chat API] Mode DÉMO` = Clé API non activée

---

## 🐛 Problèmes courants

### Problème : Pas de réponse du tout
**Symptômes** :
- Vous tapez un message
- Rien ne se passe
- Pas de loader, pas de réponse

**Solutions** :
1. **Ouvrez la console du navigateur** (F12)
2. Regardez l'onglet "Console" pour voir les erreurs JavaScript
3. Regardez l'onglet "Network" pour voir si la requête `/api/ai/chat` est envoyée

**Si vous voyez** une erreur 500 ou 404 :
```bash
# Redémarrez le serveur
Ctrl+C
pnpm dev
```

### Problème : Erreur "Invalid API Key"
**Symptômes** :
```
❌ [Claude API] ERREUR: AuthenticationError
```

**Solutions** :
1. Vérifiez que votre clé commence par `sk-ant-api03-`
2. Allez sur https://console.anthropic.com/settings/keys
3. Vérifiez que la clé est active
4. Créez une nouvelle clé si nécessaire
5. Mettez-la dans `.env.local`
6. Redémarrez : `pnpm dev`

### Problème : "Rate Limit" ou "Insufficient Credits"
**Symptômes** :
```
❌ [Claude API] ERREUR: RateLimitError
```

**Solutions** :
1. Vous avez épuisé vos crédits gratuits (5$)
2. Allez sur https://console.anthropic.com/settings/billing
3. Ajoutez des crédits (minimum 5$)

### Problème : Le chat répond en "mode basique"
**Symptômes** :
- Réponses courtes et scriptées
- Pas de conseils personnalisés
- L'IA demande juste "Quelle surface ?"

**Cause** : Mode démo encore actif

**Solution** :
```bash
# 1. Arrêtez le serveur
Ctrl+C

# 2. Vérifiez .env.local
notepad .env.local
# Cherchez : ANTHROPIC_API_KEY=sk-ant-api03-...
# Si vide ou absent, ajoutez votre clé

# 3. Redémarrez
pnpm dev

# 4. Vérifiez les logs
# Vous devez voir : ✅ CLAUDE API ACTIVÉE
```

---

## 🎯 Test de qualité

Pour vérifier que Claude API fonctionne vraiment, testez avec une question complexe :

**Question test** :
> "Je veux rénover le parquet de toute ma maison, environ 150m², j'hésite entre du stratifié et du vrai parquet, qu'est-ce que vous me conseillez ?"

**Si Claude API fonctionne**, vous devriez recevoir :
- ✅ Une réponse détaillée et personnalisée
- ✅ Comparaison stratifié vs parquet
- ✅ Avantages/inconvénients de chaque
- ✅ Prix estimés pour chaque option
- ✅ Conseils adaptés à votre situation

**Si mode démo**, vous recevrez :
- ❌ "Super ! Pour votre projet de sol/parquet, quelle est la surface ?"

---

## 📊 Monitoring usage

Pour surveiller votre utilisation de crédits :
https://console.anthropic.com/settings/usage

Vous verrez :
- 💰 Crédits restants
- 📊 Utilisation par jour
- 💬 Nombre de requêtes

---

## 🚀 Script de redémarrage rapide

Si vous avez des problèmes, utilisez :
```
RESTART_SERVER.bat
```

Ce script :
1. ✅ Arrête tous les serveurs Node.js
2. ✅ Nettoie le cache Next.js
3. ✅ Redémarre avec la clé API
4. ✅ Affiche les logs pour vérifier

---

## 💡 Astuce développement

Pour déboguer facilement, gardez 2 fenêtres ouvertes :
1. **Terminal** avec `pnpm dev` (voir les logs)
2. **Navigateur** avec F12 ouvert (Console + Network)

Comme ça, vous voyez TOUT ce qui se passe ! 👀

---

## 🆘 Aide supplémentaire

Si rien ne fonctionne :
1. Partagez les logs du terminal
2. Partagez les erreurs de la console (F12)
3. Vérifiez que `.env.local` contient bien la clé
4. Vérifiez sur https://console.anthropic.com/ que la clé est active

---

**Bon test ! 🚀**

