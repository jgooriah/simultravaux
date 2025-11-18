#!/bin/bash

# Script de démarrage rapide pour RenovAI
# Usage: ./quick-start.sh

echo "🏗️  RenovAI - Script de démarrage rapide"
echo "========================================"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez Node.js 18+ d'abord."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ requise. Version actuelle: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"

# Vérifier pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installation de pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm -v) prêt"
echo ""

# Créer le projet
echo "🚀 Création du projet Next.js..."
npx create-next-app@latest renovai \
    --typescript \
    --tailwind \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --no-git

cd renovai || exit

echo ""
echo "📦 Installation des dépendances..."

# UI & Styling
pnpm add class-variance-authority clsx tailwind-merge lucide-react framer-motion

# Forms
pnpm add react-hook-form zod @hookform/resolvers/zod

# IA
pnpm add @anthropic-ai/sdk

# PDF
pnpm add jspdf jspdf-autotable

# Dev dependencies
pnpm add -D prettier prettier-plugin-tailwindcss

echo ""
echo "🎨 Configuration de shadcn/ui..."
npx shadcn-ui@latest init -y

echo "📦 Installation des composants shadcn/ui..."
npx shadcn-ui@latest add button card input label select radio-group progress separator badge dialog toast

echo ""
echo "📁 Création de la structure des dossiers..."
mkdir -p src/components/{ui,landing,simulator,result}
mkdir -p src/lib/{ai,pdf}
mkdir -p src/types
mkdir -p src/data
mkdir -p src/app/api/{estimate,pdf}
mkdir -p src/app/{simulator,result}
mkdir -p public/images

echo ""
echo "✅ Setup terminé !"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. cd renovai"
echo "   2. Copier les fichiers du projet dans les dossiers appropriés"
echo "   3. Créer .env.local et ajouter ANTHROPIC_API_KEY"
echo "   4. pnpm dev"
echo ""
echo "📚 Voir GETTING_STARTED.md pour les instructions détaillées"
echo ""
echo "🎉 Bon développement !"
