# 🔄 Intégration OpenAI API

**Date** : 19 novembre 2025

## ⚠️ Sécurité de la clé API

**IMPORTANT** : La clé OpenAI a été partagée publiquement. 

### Actions à faire IMMÉDIATEMENT :
1. Aller sur https://platform.openai.com/api-keys
2. Révoquer la clé actuelle
3. Générer une nouvelle clé
4. L'ajouter dans `.env.local` (JAMAIS dans le code)

---

## 🔄 Changement : Claude → OpenAI

### Avant (Claude API)
- API : Anthropic Claude
- Clé : `sk-ant-api03-...`
- Modèle : `claude-3-5-sonnet-20240620`
- Problème : Erreur 404 (modèle non accessible)

### Après (OpenAI API)
- API : OpenAI GPT
- Clé : `sk-proj-...` (à regénérer pour sécurité)
- Modèles : 
  - Chat : `gpt-4o` ou `gpt-3.5-turbo`
  - Vision : `gpt-4o` (pour analyse photo)
- Avantage : Fonctionne immédiatement

---

## 📦 Installation

```bash
cd renovai
pnpm add openai
```

---

## ⚙️ Configuration

### Fichier `.env.local`
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxgtlazadodithrjsfxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon

# OpenAI (à la place de Claude)
OPENAI_API_KEY=sk-proj-VOTRE_NOUVELLE_CLE_ICI
```

---

## 🔧 Fichiers à modifier

1. **Chat IA** : `src/app/api/ai/chat/route.ts`
   - Remplacer Anthropic par OpenAI
   - Utiliser GPT-4o pour les conversations

2. **Analyse Photo** : `src/app/api/ai/analyze-photo/route.ts`
   - Utiliser GPT-4 Vision pour l'analyse d'images
   - Analyse réelle des photos (pas juste le nom de fichier)

3. **Estimation avancée** : `src/app/api/ai/estimate-advanced/route.ts`
   - Utiliser GPT-4o pour les estimations

---

## 💰 Coûts OpenAI

### Chat IA (GPT-4o)
- Input : $2.50 / 1M tokens
- Output : $10.00 / 1M tokens
- **≈ 0.01€ par conversation** (10-20 messages)

### Analyse Photo (GPT-4 Vision)
- Input : $2.50 / 1M tokens
- Output : $10.00 / 1M tokens
- Image : ~85 tokens par image
- **≈ 0.005€ par analyse photo**

**Très raisonnable pour un MVP !**

---

## 🎯 Avantages d'OpenAI

✅ **Conversations naturelles** : GPT-4 excelle en français
✅ **Analyse photo réelle** : GPT-4 Vision analyse vraiment l'image
✅ **Fiabilité** : Service stable et rapide
✅ **Documentation** : Excellente documentation
✅ **Coûts maîtrisés** : Pay-as-you-go

---

## 🚀 Prochaines étapes

1. ✅ Révoquer l'ancienne clé OpenAI
2. ✅ Générer une nouvelle clé
3. ✅ Installer `openai` package
4. ✅ Configurer `.env.local`
5. ✅ Modifier les API routes
6. ✅ Tester le chat IA
7. ✅ Tester l'analyse photo

---

**Dernière mise à jour** : 19 nov 2025

