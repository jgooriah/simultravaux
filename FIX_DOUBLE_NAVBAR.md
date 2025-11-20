# ✅ Fix : Double Navbar supprimée

**Date** : 20 novembre 2025

---

## 🐛 Problème

**"Il y a deux nav"** - L'utilisateur a remarqué que "SimuTravaux" apparaissait **deux fois** en haut de la page du questionnaire.

---

## 🔍 Cause

Le composant `QuestionnaireForm` avait son **propre header** avec "SimuTravaux" (lignes 122-135), mais la page était aussi dans le `RootLayout` qui inclut déjà la **Navbar globale**.

**Résultat** :
```
┌─────────────────────────────────┐
│ SimuTravaux (Navbar du layout)  │ ← Ligne 19 du layout.tsx
├─────────────────────────────────┤
│ SimuTravaux (Header du Form)    │ ← Lignes 122-135 du QuestionnaireForm.tsx
└─────────────────────────────────┘
```

---

## 🔧 Solution appliquée

### **Fichier modifié :**
- `src/components/simulator/QuestionnaireForm.tsx`

### **Changements :**

#### **1. Suppression du header dupliqué**

**Avant** ❌
```tsx
return (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-semibold text-gray-900">
          SimuTravaux  {/* ❌ DOUBLON */}
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowLeft className="h-4 w-4" />
          Changer de type de travaux
        </Link>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12">
```

**Après** ✅
```tsx
return (
  <div className="min-h-screen bg-gray-50">
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <div className="mb-6 flex justify-end">
          <Link href="/select-work" className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            Changer de type de travaux  {/* ✅ Gardé mais déplacé */}
          </Link>
        </div>
```

---

## 📊 Résultat

| Élément | Avant | Après |
|---------|-------|-------|
| **Headers** | 2 (layout + form) | 1 (layout seulement) ✅ |
| **"SimuTravaux" affiché** | 2 fois ❌ | 1 fois ✅ |
| **Lien "Changer de type"** | Dans header form | En haut du contenu ✅ |

---

## 🎨 Design final

```
┌────────────────────────────────────────────┐
│ SimuTravaux    [Commencer ▼] [User Menu]  │ ← Navbar (layout)
├────────────────────────────────────────────┤
│                                            │
│              [← Changer de type]           │ ← Lien de retour
│                                            │
│   Question 1 sur 5         0% complété     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                            │
│   Peinture extérieure                      │
│                                            │
│   Surface de façade à peindre *           │
│   [________________] m²                    │
│                                            │
│   [← Précédent]           [Suivant →]     │
│                                            │
└────────────────────────────────────────────┘
```

---

## 🎯 Avantages

### ✅ **Plus propre**
- Un seul "SimuTravaux" visible
- Layout cohérent avec le reste de l'app

### ✅ **Navigation gardée**
- Lien "Changer de type de travaux" toujours accessible
- Positionné en haut à droite du contenu

### ✅ **Moins de code**
- Header dupliqué supprimé
- Simplification du composant

---

## 🧪 Test

```
1. http://localhost:3000/simulateur
2. Cliquer sur "Simulateur Manuel"
3. Choisir "Peinture extérieure"
```

**✅ Résultat attendu :**
- ✅ **Un seul "SimuTravaux"** en haut (navbar)
- ✅ Lien "← Changer de type de travaux" visible en haut à droite
- ✅ Questionnaire s'affiche normalement

---

## ✅ Checklist

- [x] Header dupliqué supprimé
- [x] Lien "Changer de type" gardé et repositionné
- [x] Pas d'erreurs de linting
- [x] Un seul "SimuTravaux" affiché
- [x] Navigation fonctionnelle

---

**🎉 PLUS DE DOUBLE NAVBAR ! 🎉**

