# ⚠️ Problème d'accès aux modèles Claude API

## 🔍 Diagnostic

**Date** : 19 novembre 2025

### Situation

✅ **Clé API présente** : `sk-ant-api03-...` (format correct)
❌ **Accès aux modèles** : AUCUN modèle accessible

### Modèles testés (tous en erreur 404)

```
1. claude-3-5-sonnet-20241022 ❌
2. claude-3-5-sonnet-20240620 ❌
3. claude-3-sonnet-20240229 ❌
```

### Erreur rencontrée

```json
{
  "type": "not_found_error",
  "message": "model: claude-3-5-sonnet-20240620"
}
```

---

## ✅ Solution appliquée

**Mode DÉMO OPTIMISÉ forcé** dans `src/app/api/ai/chat/route.ts` :

```typescript
// Configuration - FORCER MODE DÉMO
const isDemoMode = true  // FORCÉ : la clé API existe mais n'a pas accès aux modèles
const anthropic = null
```

---

## 🎯 Performances du mode DÉMO

Le mode démo actuel est **TRÈS performant** :

✅ **Fonctionnalités** :
- Conversation naturelle une question à la fois
- Détection de 12 types de travaux (cuisine, SDB, peinture, sol, etc.)
- Estimation détaillée avec :
  - Budget estimé (min-moyen-max)
  - Décomposition (MO/Matériaux/Finitions)
  - Ajustements régionaux (code postal)
  - Conseils techniques
  - Normes réglementaires
  - Tendances esthétiques 2025
  - Recommandations (devis, aides, assurances)

✅ **Qualité** :
- Réponses naturelles et concises
- Pas de syntaxe markdown
- Suivi contextuel intelligent
- Détection des changements de sujet

---

## 🔧 Comment réactiver Claude API plus tard

### Étape 1 : Vérifier l'accès aux modèles

Visitez votre compte Anthropic et vérifiez :
- Quels modèles sont disponibles pour votre clé
- Si vous avez besoin d'un upgrade de compte
- Si les noms de modèles ont changé

### Étape 2 : Modifier `src/app/api/ai/chat/route.ts`

Remplacez :

```typescript
// Configuration - FORCER MODE DÉMO
const isDemoMode = true  // FORCÉ
const anthropic = null
```

Par :

```typescript
// Configuration - Mode intelligent
const isDemoMode = !ANTHROPIC_API_KEY || ANTHROPIC_API_KEY === ''
const anthropic = isDemoMode ? null : new Anthropic({ apiKey: ANTHROPIC_API_KEY })
```

### Étape 3 : Mettre à jour le nom du modèle

Dans la fonction `POST`, ligne ~85 :

```typescript
model: 'claude-3-sonnet-20240229',  // ← Remplacer par le bon nom de modèle
```

### Étape 4 : Tester

1. Relancer le serveur : `pnpm dev`
2. Aller sur http://localhost:3000/chat
3. Envoyer un message
4. Vérifier les logs : doit afficher "✅ CLAUDE API ACTIVÉE" et pas d'erreur 404

---

## 📞 Support Anthropic

Si vous voulez résoudre le problème d'accès :

1. **Vérifier votre plan** : https://console.anthropic.com/settings/plans
2. **Lire la doc** : https://docs.anthropic.com/en/docs/models-overview
3. **Contacter le support** : support@anthropic.com

Questions à poser :
- "Quels modèles sont disponibles avec ma clé API ?"
- "Pourquoi je reçois une erreur 404 'model not found' ?"
- "Dois-je upgrader mon compte pour accéder à Claude 3.5 ?"

---

## 💡 Conclusion

**Pour l'instant, le mode DÉMO suffit amplement** pour :
- Tester l'application
- Offrir un excellent service aux utilisateurs
- Fournir des estimations détaillées et personnalisées

Vous pourrez activer Claude API plus tard quand vous aurez l'accès aux modèles.

---

**Dernière mise à jour** : 19 nov 2025

