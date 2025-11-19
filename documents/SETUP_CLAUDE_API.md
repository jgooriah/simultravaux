# 🤖 Configuration de Claude API pour RenovAI

## 📋 Pourquoi utiliser Claude API ?

Actuellement, le chat IA fonctionne en **mode démo** avec des réponses scriptées limitées.

Avec **Claude API** (Anthropic), vous obtenez :
- ✅ Réponses **beaucoup plus naturelles** et intelligentes
- ✅ Compréhension **contextuelle avancée**
- ✅ Adaptation aux **demandes complexes**
- ✅ Gestion de **tous les types de rénovation**
- ✅ Conversations **vraiment fluides**

---

## 🔑 Obtenir une clé API Claude

### Étape 1 : Créer un compte Anthropic

1. Allez sur https://console.anthropic.com/
2. Créez un compte (email + mot de passe)
3. Confirmez votre email

### Étape 2 : Obtenir des crédits

- **5$ gratuits** pour tester
- Ensuite : environ **15$/mois** pour un usage normal
- Claude Sonnet 4.5 : **~0.003$/1K tokens** (très abordable)

### Étape 3 : Créer une clé API

1. Dans la console Anthropic, allez dans **"API Keys"**
2. Cliquez sur **"Create Key"**
3. Donnez un nom (ex: "RenovAI Chat")
4. Copiez la clé (format : `sk-ant-api03-...`)

⚠️ **IMPORTANT** : Copiez immédiatement la clé, elle ne sera plus visible après !

---

## ⚙️ Installation dans RenovAI

### Méthode 1 : Fichier .env.local (RECOMMANDÉ)

1. Ouvrez le fichier `renovai/.env.local`
2. Ajoutez votre clé API :

```bash
ANTHROPIC_API_KEY=sk-ant-api03-VOTRE_CLE_ICI
```

3. Sauvegardez et redémarrez le serveur :

```bash
cd renovai
pnpm dev
```

### Méthode 2 : Variables d'environnement

**Windows PowerShell** :
```powershell
$env:ANTHROPIC_API_KEY="sk-ant-api03-VOTRE_CLE_ICI"
cd renovai
pnpm dev
```

**Linux/Mac** :
```bash
export ANTHROPIC_API_KEY="sk-ant-api03-VOTRE_CLE_ICI"
cd renovai
pnpm dev
```

---

## ✅ Vérifier que ça fonctionne

1. Lancez `pnpm dev`
2. Regardez les logs dans la console :
   - ✅ **"CLAUDE API ACTIVÉE"** = Tout fonctionne !
   - ⚠️ **"MODE DÉMO"** = Clé API non trouvée

3. Testez le chat sur http://localhost:3000/chat
4. Posez une question complexe, l'IA doit répondre naturellement

---

## 🆚 Comparaison Mode Démo vs Claude API

| Fonctionnalité | Mode Démo | Claude API |
|---|---|---|
| **Prix** | Gratuit | ~15$/mois |
| **Qualité** | ⭐⭐ Basique | ⭐⭐⭐⭐⭐ Excellent |
| **Compréhension** | Limitée (mots-clés) | Contextuelle avancée |
| **Types de travaux** | 12 types prédéfinis | Illimité |
| **Flexibilité** | Scriptée | Totalement adaptative |
| **Conversations** | Rigide | Naturelle |

---

## 💰 Coûts estimés

Pour **RenovAI** avec un trafic normal :

- **Test/Développement** : 5$ gratuits suffisent
- **100 conversations/jour** : ~3-5$/mois
- **500 conversations/jour** : ~15-25$/mois
- **1000 conversations/jour** : ~30-50$/mois

Claude Sonnet 4.5 est **très économique** :
- Input : $3/million tokens
- Output : $15/million tokens
- Une conversation = ~500-1000 tokens = **0.01-0.02$**

---

## 🚀 Migration Progressive

Vous pouvez garder le **mode démo** en production et activer Claude API uniquement en développement/staging :

```bash
# .env.local (développement)
ANTHROPIC_API_KEY=sk-ant-api03-...

# .env.production (production)
# ANTHROPIC_API_KEY=
# (vide = mode démo)
```

---

## 🐛 Dépannage

### Erreur "API Key Invalid"
- Vérifiez que la clé commence par `sk-ant-api03-`
- Vérifiez qu'elle est dans `.env.local` ET que le serveur a redémarré

### Erreur "Rate Limit"
- Vous avez dépassé votre quota gratuit
- Ajoutez des crédits sur https://console.anthropic.com/

### Le chat reste en mode démo
- Vérifiez les logs : `pnpm dev`
- La clé doit être dans `ANTHROPIC_API_KEY=...`
- Redémarrez le serveur avec `Ctrl+C` puis `pnpm dev`

---

## 📞 Support

- Documentation Anthropic : https://docs.anthropic.com/
- Console Anthropic : https://console.anthropic.com/
- Pricing : https://www.anthropic.com/pricing

---

## 🎯 Recommandation

Pour une **expérience optimale** :
1. Utilisez le **mode démo** pendant le développement initial
2. Testez avec Claude API (5$ gratuits)
3. Si satisfait, passez en production avec Claude API
4. Coût prévisible : **~15-30$/mois** pour 200-500 utilisateurs/jour

**Le mode démo est suffisant pour tester, mais Claude API est INDISPENSABLE pour une vraie expérience professionnelle !** 🚀

