# 🐛 Debug Chat - Guide Rapide

## ✅ Ce que vous devez voir maintenant

### **Terminal PowerShell (là où vous avez lancé `pnpm dev`)**

Au démarrage, vous devez voir :
```
🔧 [Chat API Config] API Key présente: true/false
🔧 [Chat API Config] API Key longueur: XX
🔧 [Chat API Config] API Key commence par sk-: true/false
🔧 [Chat API Config] Mode DÉMO activé: true
```

**Si "Mode DÉMO activé: false"**, cela signifie que le système essaie d'utiliser Claude mais la clé est invalide. **C'est probablement votre problème !**

### **Quand vous envoyez un message "Bonjour"**

Dans le **terminal PowerShell**, vous devez voir :
```
🔵 [Chat API] Requête reçue
📩 [Chat API] Messages reçus: 2
🎭 [Chat API] Mode DÉMO activé
💬 [Chat API] Réponse démo générée: Bonjour ! 👋...
✅ [Chat API] Réponse démo envoyée
```

Dans la **Console du navigateur (F12)**, vous devez voir :
```
🔵 [Chat Client] Envoi de 2 messages
📡 [Chat Client] Réponse reçue, status: 200
📖 [Chat Client] Lecture du stream...
✅ [Chat Client] Stream terminé
✅ [Chat Client] Message complet reçu
```

---

## 🔴 Si vous voyez encore l'erreur

### **Problème : Mode DÉMO activé: false**

Cela signifie que votre `.env.local` contient une clé API Anthropic, mais elle est invalide.

**Solution 1** : Commentez la clé pour forcer le mode démo
```bash
# Dans renovai/.env.local
# ANTHROPIC_API_KEY=votre_clé_ici
```

**Solution 2** : Mettez explicitement "demo"
```bash
# Dans renovai/.env.local
ANTHROPIC_API_KEY=demo
```

Puis **redémarrez le serveur** :
```bash
Ctrl+C  (pour arrêter)
pnpm dev  (pour redémarrer)
```

### **Problème : ❌ [Chat API] ERREUR dans le terminal**

Si vous voyez une erreur rouge dans le terminal après `❌ [Chat API] ERREUR:`, **copiez toute l'erreur** et envoyez-la moi.

### **Problème : Le message ne s'affiche pas**

1. **Vérifiez que vous voyez** `✅ [Chat API] Réponse démo envoyée` dans le terminal
2. **Vérifiez que vous voyez** `✅ [Chat Client] Message complet reçu` dans la console
3. Si les deux sont présents mais le message ne s'affiche pas, c'est un problème d'affichage React

---

## 🧪 Test Simple

### **1. Redémarrer le serveur proprement**
```bash
# Dans PowerShell
Ctrl+C  # Arrêter complètement
pnpm dev  # Redémarrer
```

### **2. Vérifier les logs de config**
Au démarrage, dans le terminal, cherchez :
```
🔧 [Chat API Config] Mode DÉMO activé: ???
```

- Si `true` → ✅ Parfait !
- Si `false` → ❌ Problème de clé API

### **3. Tester le chat**
1. Ouvrir `http://localhost:3000/chat`
2. Ouvrir la console (F12)
3. Envoyer "Bonjour"
4. Regarder les logs

---

## 📋 Checklist de Debug

Cochez ce que vous voyez :

**Au démarrage du serveur** :
- [ ] `🔧 [Chat API Config] Mode DÉMO activé: true`

**Quand vous envoyez "Bonjour"** :
- [ ] `🔵 [Chat API] Requête reçue` (terminal)
- [ ] `🎭 [Chat API] Mode DÉMO activé` (terminal)
- [ ] `✅ [Chat API] Réponse démo envoyée` (terminal)
- [ ] `🔵 [Chat Client] Envoi de 2 messages` (console F12)
- [ ] `📡 [Chat Client] Réponse reçue, status: 200` (console F12)
- [ ] `✅ [Chat Client] Message complet reçu` (console F12)
- [ ] La réponse s'affiche dans le chat

---

## 🚨 Erreurs Courantes

### Erreur : "Mode DÉMO activé: false" + "Client Anthropic non initialisé"
**Cause** : Clé API présente mais invalide  
**Solution** : Commentez `ANTHROPIC_API_KEY` dans `.env.local` et redémarrez

### Erreur : "❌ [Chat Client] Erreur parsing"
**Cause** : Format du stream incorrect  
**Solution** : Vérifiez les logs du terminal pour voir l'erreur exacte

### Erreur : "Erreur HTTP: 500"
**Cause** : Erreur côté serveur  
**Solution** : Regardez les logs du terminal PowerShell

---

## 📞 Que m'envoyer si ça ne marche pas

1. **Logs du terminal au démarrage** (les lignes `🔧 [Chat API Config]`)
2. **Logs du terminal après avoir envoyé un message**
3. **Logs de la console (F12) après avoir envoyé un message**
4. **Screenshot de l'erreur si visible**

---

## ✅ Solution Rapide (90% des cas)

```bash
# 1. Arrêter le serveur
Ctrl+C

# 2. Éditer .env.local
# Commentez ou supprimez ANTHROPIC_API_KEY

# 3. Redémarrer
pnpm dev

# 4. Vérifier dans le terminal
# Vous devez voir : Mode DÉMO activé: true

# 5. Tester le chat
# Ouvrir http://localhost:3000/chat
# Envoyer "Bonjour"
```

**Si après ça, ça ne marche toujours pas, envoyez-moi TOUS les logs !** 🔍

