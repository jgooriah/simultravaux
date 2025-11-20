# 🐛 Debug Erreur 500 - API /estimate

**Erreur** : `Failed to load resource: the server responded with a status of 500 (Internal Server Error)`

---

## 🔍 Comment débugger

### **Étape 1 : Vérifier les logs du serveur**

Dans votre terminal où tourne `pnpm dev`, vous devriez voir des logs comme :

```
=== API /estimate appelée ===
1. Parsing du body...
Body reçu: { ... }
2. Validation des données...
❌ ERREUR API /estimate: [L'ERREUR ICI]
```

**Copiez l'erreur exacte que vous voyez après `❌ ERREUR API /estimate:`**

---

### **Étape 2 : Vérifier que le serveur tourne**

```bash
# Dans le terminal
cd renovai
pnpm dev
```

Vous devriez voir :
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

---

### **Étape 3 : Tester l'API manuellement**

Ouvrir dans le navigateur :
```
http://localhost:3000/api/estimate
```

**Résultat attendu** : Un JSON avec `"status": "ready"`

---

## 🔧 Erreurs possibles

### **1. Type de travaux non trouvé**

**Erreur dans les logs** :
```
[DEMO] Type de travaux non trouvé: xxx
```

**Solution** : Le `workTypeId` envoyé n'existe pas.

**Vérifier** : `src/types/work-types.ts`

---

### **2. Réponses invalides**

**Erreur dans les logs** :
```
Validation échouée: { ... }
```

**Solution** : Le format des `answers` est incorrect.

**Format attendu** :
```json
{
  "workTypeId": "painting-interior",
  "answers": {
    "surface-area": 25,
    "paint-quality": "standard",
    "postal-code": "75000",
    "timeline": "normal"
  }
}
```

---

### **3. Erreur dans calculatePrice (peut-être supprimé)**

**Erreur dans les logs** :
```
calculatePrice is not defined
```

**Solution** : Peut-être que l'ancienne fonction `calculatePrice` a été supprimée.

**Vérifier** : `src/lib/ai/estimator.ts`

---

## 🧪 Test rapide

### **Test 1 : GET /api/estimate**

```bash
# Dans un nouveau terminal
curl http://localhost:3000/api/estimate
```

**Résultat attendu** :
```json
{
  "success": true,
  "status": "ready",
  "instructions": "..."
}
```

---

### **Test 2 : POST /api/estimate (simple)**

```bash
curl -X POST http://localhost:3000/api/estimate \
  -H "Content-Type: application/json" \
  -d '{
    "workTypeId": "painting-interior",
    "answers": {
      "surface-area": 25
    }
  }'
```

**Résultat attendu** :
```json
{
  "success": true,
  "data": {
    "id": "est_...",
    "estimation": {
      "min": 2000,
      "max": 3000,
      "moyen": 2500
    }
  }
}
```

---

## 📋 Checklist de vérification

- [ ] Le serveur tourne (`pnpm dev`)
- [ ] Pas d'erreurs de compilation TypeScript
- [ ] GET `/api/estimate` fonctionne
- [ ] Les logs du serveur affichent l'erreur exacte
- [ ] Le `workTypeId` est valide
- [ ] Le format des `answers` est correct

---

## 💡 Si l'erreur persiste

**Envoyez-moi** :
1. Les logs exacts du serveur
2. Le `workTypeId` que vous testez
3. Les `answers` envoyées

**Je corrigerai le problème précisément !**

