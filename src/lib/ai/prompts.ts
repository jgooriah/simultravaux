// lib/ai/prompts.ts
// Prompts pour l'estimation par Claude

import { type WorkType } from '@/types/work-types'
import { type Answers } from '@/types/questionnaire'

export function buildEstimationPrompt(
  workType: WorkType,
  answers: Answers
): string {
  const answersText = formatAnswers(answers)
  const priceRange = workType.averagePriceRange

  return `Tu es un expert en estimation de travaux de rénovation en France avec 20 ans d'expérience.

TYPE DE TRAVAUX : ${workType.name}
Description : ${workType.description}
Fourchette moyenne marché : ${priceRange.min}-${priceRange.max} ${priceRange.unit}

INFORMATIONS DU CLIENT :
${answersText}

MISSION :
Analyse ces informations et fournis une estimation détaillée et réaliste.

CRITÈRES D'ESTIMATION :
1. Prends en compte la localisation pour ajuster les prix (coefficient régional)
2. Considère l'état actuel et la complexité des travaux
3. Ajuste selon la qualité des matériaux demandée
4. Inclus la main d'œuvre qualifiée
5. Ajoute une marge pour imprévus (5-10%)
6. Respecte les prix du marché actuel (2025)

AIDES FINANCIÈRES POSSIBLES :
- MaPrimeRénov' pour rénovation énergétique
- Éco-PTZ pour travaux d'économie d'énergie
- TVA à taux réduit (5,5% ou 10%)
- Aides locales selon région

INSTRUCTIONS STRICTES :
1. Fournis des montants réalistes basés sur le marché français 2025
2. La fourchette min-max ne doit pas dépasser un écart de 50%
3. Le montant moyen doit être équilibré (pas nécessairement au milieu)
4. Sois transparent sur les facteurs qui influencent le prix
5. Donne des conseils pratiques et actionnables

FORMAT DE RÉPONSE EXIGÉ (JSON uniquement, aucun texte avant ou après) :

{
  "estimation": {
    "min": <montant minimum en euros>,
    "max": <montant maximum en euros>,
    "moyen": <montant moyen le plus probable en euros>
  },
  "details": [
    {
      "poste": "Main d'œuvre",
      "montant": <montant en euros>,
      "description": "Description du poste avec détails"
    },
    {
      "poste": "Matériaux et fournitures",
      "montant": <montant en euros>,
      "description": "Types de matériaux inclus"
    },
    {
      "poste": "Préparation du chantier",
      "montant": <montant en euros>,
      "description": "Travaux préparatoires nécessaires"
    },
    {
      "poste": "Finitions",
      "montant": <montant en euros>,
      "description": "Travaux de finition"
    },
    {
      "poste": "Évacuation et nettoyage",
      "montant": <montant en euros>,
      "description": "Gestion des déchets et nettoyage final"
    }
  ],
  "facteurs": [
    "Liste des facteurs qui ont influencé l'estimation",
    "Ex: Surface importante, Accès difficile, Qualité premium demandée"
  ],
  "delai": "Délai estimé en semaines ou jours (ex: '2-3 semaines', '5-7 jours')",
  "conseils": [
    "Conseil pratique 1 pour optimiser le projet",
    "Conseil pratique 2 pour réduire les coûts",
    "Conseil pratique 3 sur le timing ou la qualité"
  ],
  "aides": [
    {
      "nom": "Nom de l'aide financière",
      "montant": "Montant ou pourcentage (ex: 'Jusqu\\'à 2000€', '30% du montant')",
      "conditions": "Conditions d'éligibilité résumées"
    }
  ]
}

IMPORTANT : 
- Réponds UNIQUEMENT avec le JSON valide
- Pas de texte explicatif avant ou après le JSON
- Pas de markdown, pas de \`\`\`json
- Vérifie que tous les montants sont cohérents
- Les montants dans "details" doivent approximativement totaliser le montant "moyen"
`
}

function formatAnswers(answers: Answers): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(answers)) {
    // Formatage lisible de la clé
    const formattedKey = key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Formatage de la valeur
    let formattedValue: string
    if (Array.isArray(value)) {
      formattedValue = value.join(', ')
    } else if (typeof value === 'boolean') {
      formattedValue = value ? 'Oui' : 'Non'
    } else {
      formattedValue = String(value)
    }

    lines.push(`${formattedKey}: ${formattedValue}`)
  }

  return lines.join('\n')
}

// Prompt pour analyse de photos (Phase 2)
export function buildPhotoAnalysisPrompt(
  workType: WorkType,
  imageBase64: string
): string {
  return `Analyse cette photo liée à des travaux de ${workType.name}.

Identifie :
1. L'état actuel (bon, moyen, mauvais)
2. Les problèmes visibles (fissures, humidité, usure, etc.)
3. La surface approximative
4. Les contraintes particulières
5. Le niveau de complexité des travaux nécessaires

Fournis un résumé structuré de ton analyse.`
}

// Prompt pour génération de conseils personnalisés
export function buildAdvicePrompt(
  workType: WorkType,
  estimationResult: any
): string {
  return `Basé sur cette estimation de ${workType.name} :

Montant : ${estimationResult.estimation.moyen}€
Délai : ${estimationResult.delai}

Génère 5 conseils personnalisés pour :
1. Optimiser le budget
2. Choisir le bon moment pour les travaux
3. Sélectionner les bons artisans
4. Préparer le chantier
5. Assurer la qualité des travaux

Format JSON :
{
  "conseils": ["conseil 1", "conseil 2", ...]
}`
}
