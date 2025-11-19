# 🔧 Dépannage - Erreur 404 Chat IA

## ❌ **Erreur Rencontrée**

```
❌ Erreur de connexion
Erreur de connexion (404). Vérifiez votre connexion internet.
```

## 🔍 **Cause**

La route `/api/ai/chat` n'était pas accessible car :
1. Le cache Next.js était corrompu (`.next` folder)
2. Le serveur n'avait pas recompilé correctement après les changements

## ✅ **Solution Appliquée**

1. ✅ **Cache supprimé** : Dossier `.next` effacé
2. ✅ **Serveurs arrêtés** : Tous les processus Node nettoyés
3. ✅ **Serveur relancé** : `pnpm dev` redémarré proprement

---

## ⏱️ **ATTENDEZ 30-60 SECONDES**

Le serveur est en train de :
1. Compiler toutes les pages
2. Enregistrer toutes les routes API
3. Générer le cache optimisé

**Indicateurs que c'est prêt** :
```bash
✓ Compiled successfully
○ Local: http://localhost:3000
```

---

## 🧪 **COMMENT TESTER**

### **1. Vérifiez que le serveur est prêt**

Ouvrez la console/terminal et vérifiez que vous voyez :
```
  ▲ Next.js 14.2.33
  - Local:        http://localhost:3000

✓ Ready in Xs
```

### **2. Rafraîchissez la page**

Appuyez sur **`Ctrl + Shift + R`** (rechargement forcé) pour :
- Vider le cache du navigateur
- Recharger complètement la page

### **3. Testez le chat**

1. Allez sur : `http://localhost:3000/chat`
2. Ouvrez la console (F12)
3. Tapez : "Je veux rénover ma cuisine"
4. Appuyez sur Entrée

**Vous devriez voir dans la console** :
```
🔵 [Chat Client] Envoi de 2 messages
📡 [Chat Client] Réponse reçue, status: 200
📖 [Chat Client] Lecture du stream...
✅ [Chat Client] Message complet reçu
```

---

## 🔄 **Si Ça Ne Marche Toujours Pas**

### **Solution 1 : Reset Complet**

Ouvrez PowerShell dans le dossier `renovai` :

```powershell
# Arrêter tous les serveurs
Get-Process -Name node | Stop-Process -Force

# Supprimer le cache
Remove-Item -Path ".next" -Recurse -Force
Remove-Item -Path "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue

# Relancer
pnpm dev
```

Attendez 1 minute, puis testez.

---

### **Solution 2 : Vérifier le Port**

Le serveur pourrait être sur un autre port.

**Cherchez dans le terminal** :
```
Local: http://localhost:3001  ← Peut être 3001 au lieu de 3000
```

Puis ouvrez le bon port dans votre navigateur.

---

### **Solution 3 : Vérifier les Logs**

Ouvrez la console (F12) et cherchez :
- ❌ **Erreurs en rouge** : Problèmes de compilation
- ⚠️ **Warnings en jaune** : Avertissements

Si vous voyez des erreurs, envoyez-les pour qu'on puisse les corriger !

---

## 📊 **Logs à Surveiller**

### **Dans le Terminal (Backend)**
```
🎭 [Chat API Config] Mode DÉMO FORCÉ - Chat gratuit activé  ← Bon signe
🔵 [Chat API] Requête reçue                                  ← API appelée
📩 [Chat API] Messages reçus: 2                              ← Messages reçus
🎭 [Chat API] Mode DÉMO activé                               ← Mode démo OK
✅ [Chat API] Réponse démo envoyée                           ← Réponse envoyée
```

### **Dans la Console (Frontend - F12)**
```
🔵 [Chat Client] Envoi de 2 messages       ← Envoi
📡 [Chat Client] Réponse reçue, status: 200  ← Réception OK
📖 [Chat Client] Lecture du stream...       ← Lecture
✅ [Chat Client] Message complet reçu       ← Succès !
```

---

## 🎯 **Checklist de Diagnostic**

Cochez au fur et à mesure :

### **Backend (Terminal)**
- [ ] Le serveur affiche "✓ Ready in Xs"
- [ ] Aucune erreur rouge dans le terminal
- [ ] Le port est indiqué (ex: "Local: http://localhost:3000")

### **Frontend (Navigateur)**
- [ ] La page `/chat` se charge sans erreur
- [ ] Le champ de saisie est visible
- [ ] Pas d'erreur 404 dans la console (F12)
- [ ] L'historique (menu ≡) s'ouvre correctement

### **API**
- [ ] Quand vous envoyez un message, vous voyez le loader
- [ ] La réponse de l'IA apparaît
- [ ] Pas d'erreur 404 dans Network (F12 > Network)

---

## 🚨 **Erreurs Courantes**

### **Erreur 1 : Port déjà utilisé**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution** :
```powershell
Get-Process -Name node | Stop-Process -Force
pnpm dev
```

---

### **Erreur 2 : Module introuvable**
```
Module not found: Can't resolve '@/components/...'
```

**Solution** :
```powershell
pnpm install
pnpm dev
```

---

### **Erreur 3 : Cache corrompu**
```
[Fast Refresh] rebuilding
[Fast Refresh] done
Error: Cannot find module...
```

**Solution** :
```powershell
Remove-Item -Path ".next" -Recurse -Force
pnpm dev
```

---

## 📞 **Aide Supplémentaire**

Si rien ne fonctionne, partagez :

1. **Screenshot du terminal** (là où tourne `pnpm dev`)
2. **Console du navigateur** (F12 → onglet Console)
3. **Network errors** (F12 → onglet Network → filtrer les erreurs)

Cela permettra de diagnostiquer précisément le problème !

---

## ✅ **Statut Actuel**

- ✅ Cache supprimé
- ✅ Serveur relancé
- ⏳ En attente de compilation (30-60s)

**Prochaine étape** : Attendez 1 minute, puis rafraîchissez avec `Ctrl + Shift + R`

---

## 🎉 **Une Fois que Ça Marche**

Vous devriez pouvoir :
1. ✅ Ouvrir le chat (`/chat`)
2. ✅ Voir la sidebar d'historique (menu ≡)
3. ✅ Envoyer des messages et recevoir des réponses
4. ✅ Sauvegarder des estimations
5. ✅ Voir "Mes estimations" (`/mes-estimations`)

**Bon courage !** 🚀

