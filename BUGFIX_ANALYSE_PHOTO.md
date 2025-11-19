# 🐛 Bugfix : Analyse Photo IA - Error 500

**Date** : 19 novembre 2025  
**Statut** : ✅ **CORRIGÉ**

---

## 🔴 Erreur rencontrée

### **Console navigateur**
```
POST http://localhost:3000/api/ai/analyze-photo 500 (Internal Server Error)

Uncaught (in promise) Error: Cannot read properties of undefined (reading 'getUser')
at reader.onloadend (page.tsx:146:17)
```

### **Comportement**
- Upload de photo fonctionne ✅
- Clic sur "Analyser avec l'IA" déclenche l'erreur ❌
- Erreur 500 de l'API
- Message d'erreur affiché côté client

---

## 🔍 Cause du problème

**Fichier** : `renovai/src/app/api/ai/analyze-photo/route.ts`

**Code incorrect** :
```typescript
export async function POST(request: NextRequest) {
  try {
    // ❌ PROBLÈME ICI : manque le await
    const supabase = createClient()  // Retourne une Promise
    const { data: { user } } = await supabase.auth.getUser()  // supabase est undefined !
    // ...
  }
}
```

**Explication** :
- Dans les **API routes Next.js**, `createClient()` est une fonction **asynchrone**
- Elle retourne une **Promise** qui doit être **attendue** avec `await`
- Sans `await`, `supabase` est une Promise non résolue (= `undefined`)
- Donc `supabase.auth.getUser()` échoue avec "Cannot read properties of undefined"

---

## ✅ Solution appliquée

**Ajout du `await`** :
```typescript
export async function POST(request: NextRequest) {
  try {
    // ✅ CORRIGÉ : await ajouté
    const supabase = await createClient()  // Attend la résolution de la Promise
    const { data: { user } } = await supabase.auth.getUser()  // Maintenant ça marche !
    // ...
  }
}
```

**Référence** :
Le même pattern est utilisé dans `renovai/src/app/api/ai/credits/route.ts` :
```typescript
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()  // ← Avec await
    // ...
  }
}
```

---

## 🧪 Test de validation

### **Avant le fix**
```
1. Upload image
2. Clic "Analyser"
3. ❌ Erreur 500
4. ❌ Message "Cannot read properties of undefined"
```

### **Après le fix**
```
1. Upload image
2. Clic "Analyser"
3. ⏳ Loader pendant 2-3s
4. ✅ Résultats d'analyse affichés
5. ✅ Crédits déduits de 5
6. ✅ Tout fonctionne !
```

---

## 📚 Leçons apprises

### **Dans les API routes Next.js 14+**
Toujours utiliser `await` avec `createClient()` :

```typescript
// ✅ BON
const supabase = await createClient()

// ❌ MAUVAIS
const supabase = createClient()
```

### **Dans les Server Components**
Le comportement peut être différent (contexte automatique), mais `await` reste une bonne pratique.

### **Dans les Client Components**
Utiliser `createClient` de `@/lib/supabase/client` (pas de `await` nécessaire).

---

## 🔧 Fichiers modifiés

```diff
renovai/src/app/api/ai/analyze-photo/route.ts
───────────────────────────────────────────
- const supabase = createClient()
+ const supabase = await createClient()
```

---

## ✅ Checklist de validation

- [x] Erreur 500 corrigée
- [x] `await` ajouté sur `createClient()`
- [x] Test d'upload et analyse réussi
- [x] Crédits déduits correctement
- [x] Résultats affichés
- [x] Aucune erreur dans la console
- [x] Aucune erreur dans les logs serveur

---

## 📖 Documentation

**Supabase + Next.js API Routes** :
- https://supabase.com/docs/guides/auth/server-side/nextjs
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers

**Pattern correct** :
```typescript
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()  // ← TOUJOURS avec await
  const { data: { user } } = await supabase.auth.getUser()
  // ...
}
```

---

**Dernière mise à jour** : 19 nov 2025  
**Correction par** : Assistant IA

