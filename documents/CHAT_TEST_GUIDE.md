# 🧪 Guide de Test - Chat IA

## ✅ Comment tester le chat

### 1️⃣ **Démarrer le serveur**
```bash
cd renovai
pnpm dev
```

### 2️⃣ **Ouvrir la console du navigateur**
- Chrome/Edge : `F12` ou `Ctrl+Shift+I`
- Firefox : `F12`
- Safari : `Cmd+Option+I`

### 3️⃣ **Accéder au chat**
- Cliquez sur le bouton **"Chat IA"** (violet) dans la navbar
- OU allez sur : `http://localhost:3000/chat`

### 4️⃣ **Tester un message**
Envoyez une question simple comme :
- "Bonjour"
- "Combien coûte une rénovation de cuisine ?"
- "Quelles aides financières sont disponibles ?"

### 5️⃣ **Vérifier les logs**

#### Dans la **Console du navigateur** (F12) :
Vous devriez voir :
```
🔵 [Chat Client] Envoi de 2 messages
📡 [Chat Client] Réponse reçue, status: 200
📖 [Chat Client] Lecture du stream...
✅ [Chat Client] Stream terminé
🏁 [Chat Client] Signal DONE reçu
✅ [Chat Client] Message complet reçu
```

#### Dans le **Terminal du serveur** (PowerShell) :
Vous devriez voir :
```
🔵 [Chat API] Requête reçue
📩 [Chat API] Messages reçus: 2
🎭 [Chat API] Mode DÉMO activé
💬 [Chat API] Réponse démo générée: Bonjour ! 👋 Je suis votre assistant IA spécial...
✅ [Chat API] Réponse démo envoyée
```

---

## 🐛 En cas d'erreur

### Erreur : "Impossible de lire la réponse"
**Solution** : Le serveur n'est pas démarré ou l'API route a un problème
```bash
# Redémarrer le serveur
Ctrl+C (pour arrêter)
pnpm dev
```

### Erreur : "Erreur HTTP: 500"
**Solution** : Vérifier les logs du serveur (terminal PowerShell)
- Chercher les messages commençant par `❌`
- Vérifier que `.env.local` existe

### Le message n'apparaît pas
**Solution** : 
1. Ouvrir la console (F12)
2. Chercher les erreurs en rouge
3. Vérifier les logs `[Chat Client]`
4. Essayer de rafraîchir la page (F5)

### Le streaming ne fonctionne pas
**Solution** :
- Vérifier que vous êtes bien en mode DÉMO (voir les logs)
- Le mode DÉMO envoie caractère par caractère avec 20ms de délai
- Si c'est trop lent, vous pouvez modifier `timeout` dans `/api/ai/chat/route.ts`

---

## 🎯 Comportement attendu

### Mode DÉMO (sans clé API Claude)
- ✅ Réponses instantanées et intelligentes
- ✅ Streaming caractère par caractère (effet "typing")
- ✅ Réponses contextuelles basées sur les mots-clés
- ✅ Gratuit et illimité

### Mode IA Claude (avec clé API)
- ✅ Réponses encore plus précises via Claude
- ✅ Streaming en temps réel
- ✅ Mémoire de conversation complète
- ✅ Conseils d'expert personnalisés

---

## 📋 Checklist de test

- [ ] Le bouton "Chat IA" est visible dans la navbar (violet)
- [ ] Le bouton fonctionne sur mobile ET desktop
- [ ] La page `/chat` se charge correctement
- [ ] Le message de bienvenue de l'IA s'affiche
- [ ] L'input textarea est focusé automatiquement
- [ ] Les questions suggérées s'affichent au début
- [ ] Envoyer un message avec Enter fonctionne
- [ ] Le spinner "L'IA réfléchit..." apparaît pendant le chargement
- [ ] La réponse s'affiche en streaming (lettre par lettre)
- [ ] Le scroll automatique fonctionne vers le bas
- [ ] Les avatars (Bot + User) s'affichent correctement
- [ ] Les messages sont bien alignés (user à droite, bot à gauche)
- [ ] Shift+Enter permet un retour à la ligne
- [ ] Plusieurs messages successifs fonctionnent
- [ ] Les logs apparaissent dans la console

---

## 🚀 Tests avancés

### Test 1 : Questions contextuelles
1. "Combien coûte une rénovation de cuisine ?"
2. Attendre la réponse
3. "Et pour une salle de bain ?"
4. Vérifier que l'IA répond de manière cohérente

### Test 2 : Questions suggérées
1. Cliquer sur une question suggérée
2. Vérifier qu'elle remplit l'input
3. Envoyer et vérifier la réponse

### Test 3 : Streaming
1. Envoyer "Donne-moi un long conseil sur la rénovation"
2. Observer le texte apparaître progressivement
3. Vérifier qu'il n'y a pas de lag

### Test 4 : Messages multiples
1. Envoyer 5 messages rapidement
2. Vérifier que tous reçoivent une réponse
3. Vérifier l'ordre des messages

---

## 📞 Support

Si le chat ne fonctionne toujours pas après ces tests :
1. Partagez les logs de la console (F12)
2. Partagez les logs du terminal PowerShell
3. Indiquez le message d'erreur exact

**Status actuel** : Chat FONCTIONNEL en mode DÉMO 🎉

