// Configuration des questionnaires pour chaque type de travaux

import { type Questionnaire, type WorkTypeId } from '@/types/questionnaire'

export const QUESTIONNAIRES: Record<WorkTypeId, Questionnaire> = {
  'painting-interior': {
    workTypeId: 'painting-interior',
    steps: [
      {
        id: 'surface',
        title: 'Surface à peindre',
        description: 'Informations sur la surface',
        questions: [
          {
            id: 'room-type',
            type: 'select',
            label: 'Type de pièce',
            required: true,
            options: [
              { value: 'living-room', label: 'Salon / Séjour' },
              { value: 'bedroom', label: 'Chambre' },
              { value: 'kitchen', label: 'Cuisine' },
              { value: 'bathroom', label: 'Salle de bain' },
              { value: 'hallway', label: 'Couloir / Entrée' },
              { value: 'multiple', label: 'Plusieurs pièces' },
            ],
          },
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface totale',
            description: 'Surface au sol des pièces à peindre',
            placeholder: 'Ex: 25',
            unit: 'm²',
            required: true,
            min: 5,
            max: 500,
            validation: {
              min: 5,
              max: 500,
              message: 'La surface doit être entre 5 et 500 m²',
            },
          },
          {
            id: 'ceiling-height',
            type: 'select',
            label: 'Hauteur sous plafond',
            required: true,
            options: [
              { value: 'standard', label: 'Standard (2,4 - 2,7m)' },
              { value: 'high', label: 'Haute (>2,7m)', priceImpact: 'medium' },
              {
                value: 'very-high',
                label: 'Très haute (>3,5m)',
                priceImpact: 'high',
              },
            ],
          },
          {
            id: 'paint-walls',
            type: 'checkbox',
            label: 'Surfaces à peindre',
            required: true,
            options: [
              { value: 'walls', label: 'Murs' },
              { value: 'ceiling', label: 'Plafond', priceImpact: 'medium' },
              { value: 'woodwork', label: 'Boiseries', priceImpact: 'low' },
            ],
          },
        ],
      },
      {
        id: 'condition',
        title: 'État actuel',
        description: 'État des surfaces à peindre',
        questions: [
          {
            id: 'current-state',
            type: 'radio',
            label: 'État des murs',
            required: true,
            options: [
              {
                value: 'good',
                label: 'Bon état',
                description: 'Murs lisses, quelques retouches',
              },
              {
                value: 'medium',
                label: 'État moyen',
                description: 'Quelques trous et fissures à reboucher',
                priceImpact: 'low',
              },
              {
                value: 'poor',
                label: 'Mauvais état',
                description: 'Nombreuses réparations nécessaires',
                priceImpact: 'high',
              },
            ],
          },
          {
            id: 'prep-work',
            type: 'checkbox',
            label: 'Travaux de préparation nécessaires',
            required: false,
            options: [
              { value: 'strip-wallpaper', label: 'Décoller papier peint' },
              { value: 'fill-holes', label: 'Reboucher trous et fissures' },
              { value: 'sand', label: 'Poncer les surfaces' },
              { value: 'primer', label: 'Appliquer une sous-couche' },
            ],
          },
        ],
      },
      {
        id: 'finish',
        title: 'Type de finition',
        description: 'Qualité et type de peinture souhaités',
        questions: [
          {
            id: 'paint-quality',
            type: 'radio',
            label: 'Qualité de peinture',
            required: true,
            options: [
              {
                value: 'standard',
                label: 'Standard',
                description: 'Bonne qualité, rapport qualité-prix',
              },
              {
                value: 'premium',
                label: 'Premium',
                description: 'Haut de gamme, longue durée',
                priceImpact: 'medium',
              },
              {
                value: 'luxury',
                label: 'Luxe',
                description: 'Marques premium, finitions exceptionnelles',
                priceImpact: 'high',
              },
            ],
          },
          {
            id: 'paint-finish',
            type: 'select',
            label: 'Type de finition',
            required: true,
            options: [
              { value: 'matte', label: 'Mat' },
              { value: 'satin', label: 'Satin' },
              { value: 'glossy', label: 'Brillant' },
            ],
          },
          {
            id: 'number-coats',
            type: 'radio',
            label: 'Nombre de couches',
            required: true,
            options: [
              { value: '1', label: '1 couche (rafraîchissement)' },
              { value: '2', label: '2 couches (standard)' },
              { value: '3', label: '3 couches (couverture maximale)' },
            ],
          },
        ],
      },
      {
        id: 'location',
        title: 'Localisation',
        description: 'Informations sur le lieu des travaux',
        questions: [
          {
            id: 'postal-code',
            type: 'text',
            label: 'Code postal',
            placeholder: '75001',
            required: true,
            validation: {
              pattern: '^[0-9]{5}$',
              message: 'Code postal invalide',
            },
          },
          {
            id: 'property-type',
            type: 'select',
            label: 'Type de bien',
            required: true,
            options: [
              { value: 'apartment', label: 'Appartement' },
              { value: 'house', label: 'Maison' },
              { value: 'office', label: 'Local commercial' },
            ],
          },
          {
            id: 'access',
            type: 'radio',
            label: 'Accès au chantier',
            required: true,
            options: [
              { value: 'easy', label: 'Facile (RDC ou ascenseur)' },
              {
                value: 'medium',
                label: 'Moyen (étages sans ascenseur)',
                priceImpact: 'low',
              },
              {
                value: 'difficult',
                label: 'Difficile (accès complexe)',
                priceImpact: 'medium',
              },
            ],
          },
          {
            id: 'timeline',
            type: 'select',
            label: 'Délai souhaité',
            required: true,
            options: [
              {
                value: 'urgent',
                label: 'Urgent (< 2 semaines)',
                priceImpact: 'high',
              },
              { value: 'normal', label: 'Normal (2-4 semaines)' },
              { value: 'flexible', label: 'Flexible (> 1 mois)' },
            ],
          },
        ],
      },
    ],
  },

  'bathroom-renovation': {
    workTypeId: 'bathroom-renovation',
    steps: [
      {
        id: 'scope',
        title: 'Étendue des travaux',
        questions: [
          {
            id: 'bathroom-size',
            type: 'number',
            label: 'Surface de la salle de bain',
            unit: 'm²',
            required: true,
            min: 2,
            max: 30,
          },
          {
            id: 'renovation-type',
            type: 'radio',
            label: 'Type de rénovation',
            required: true,
            options: [
              {
                value: 'refresh',
                label: 'Rafraîchissement',
                description: 'Peinture, petits équipements',
              },
              {
                value: 'partial',
                label: 'Partielle',
                description: 'Remplacement de certains éléments',
                priceImpact: 'medium',
              },
              {
                value: 'complete',
                label: 'Complète',
                description: 'Rénovation totale',
                priceImpact: 'high',
              },
            ],
          },
          {
            id: 'elements',
            type: 'checkbox',
            label: 'Éléments à rénover',
            required: true,
            options: [
              { value: 'shower', label: 'Douche' },
              { value: 'bathtub', label: 'Baignoire' },
              { value: 'sink', label: 'Vasque/Lavabo' },
              { value: 'toilet', label: 'WC' },
              { value: 'tiles', label: 'Carrelage' },
              { value: 'furniture', label: 'Meubles' },
              { value: 'lighting', label: 'Éclairage' },
              { value: 'ventilation', label: 'VMC/Ventilation' },
            ],
          },
        ],
      },
      {
        id: 'quality',
        title: 'Qualité des équipements',
        questions: [
          {
            id: 'equipment-range',
            type: 'radio',
            label: 'Gamme des équipements',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'mid-range', label: 'Milieu de gamme' },
              { value: 'premium', label: 'Premium' },
              { value: 'luxury', label: 'Haut de gamme' },
            ],
          },
          {
            id: 'custom-work',
            type: 'checkbox',
            label: 'Travaux spécifiques',
            required: false,
            options: [
              { value: 'pmr', label: 'Adaptation PMR' },
              { value: 'custom-furniture', label: 'Meubles sur-mesure' },
              { value: 'underfloor-heating', label: 'Chauffage au sol' },
              { value: 'steam-shower', label: 'Douche hammam' },
            ],
          },
        ],
      },
      {
        id: 'location',
        title: 'Localisation',
        questions: [
          {
            id: 'postal-code',
            type: 'text',
            label: 'Code postal',
            required: true,
          },
          {
            id: 'timeline',
            type: 'select',
            label: 'Délai souhaité',
            required: true,
            options: [
              { value: 'urgent', label: 'Urgent (< 1 mois)' },
              { value: 'normal', label: 'Normal (1-3 mois)' },
              { value: 'flexible', label: 'Flexible (> 3 mois)' },
            ],
          },
        ],
      },
    ],
  },

  'tile-floor': {
    workTypeId: 'tile-floor',
    steps: [
      {
        id: 'surface',
        title: 'Surface à carreler',
        questions: [
          {
            id: 'room-type',
            type: 'select',
            label: 'Type de pièce',
            required: true,
            options: [
              { value: 'bathroom', label: 'Salle de bain' },
              { value: 'kitchen', label: 'Cuisine' },
              { value: 'living', label: 'Séjour' },
              { value: 'terrace', label: 'Terrasse' },
              { value: 'multiple', label: 'Plusieurs pièces' },
            ],
          },
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface à carreler',
            unit: 'm²',
            required: true,
            min: 2,
            max: 200,
          },
          {
            id: 'current-floor',
            type: 'select',
            label: 'Revêtement actuel',
            required: true,
            options: [
              { value: 'concrete', label: 'Béton/Chape' },
              { value: 'old-tile', label: 'Ancien carrelage' },
              { value: 'parquet', label: 'Parquet' },
              { value: 'vinyl', label: 'Lino/Vinyle' },
            ],
          },
        ],
      },
      {
        id: 'tile-choice',
        title: 'Choix du carrelage',
        questions: [
          {
            id: 'tile-type',
            type: 'select',
            label: 'Type de carrelage',
            required: true,
            options: [
              { value: 'ceramic', label: 'Céramique' },
              { value: 'porcelain', label: 'Grès cérame' },
              { value: 'natural-stone', label: 'Pierre naturelle' },
              { value: 'terracotta', label: 'Terre cuite' },
            ],
          },
          {
            id: 'tile-size',
            type: 'select',
            label: 'Format des carreaux',
            required: true,
            options: [
              { value: 'small', label: 'Petit (< 30x30cm)' },
              { value: 'medium', label: 'Moyen (30x60cm)' },
              { value: 'large', label: 'Grand (60x60cm ou +)' },
              { value: 'mixed', label: 'Formats mixtes' },
            ],
          },
          {
            id: 'tile-quality',
            type: 'radio',
            label: 'Gamme de carrelage',
            required: true,
            options: [
              { value: 'standard', label: 'Standard (15-30€/m²)' },
              { value: 'mid-range', label: 'Milieu de gamme (30-60€/m²)' },
              { value: 'premium', label: 'Premium (60€+/m²)' },
            ],
          },
        ],
      },
      {
        id: 'preparation',
        title: 'Préparation du sol',
        questions: [
          {
            id: 'floor-condition',
            type: 'radio',
            label: 'État du sol actuel',
            required: true,
            options: [
              { value: 'good', label: 'Bon (plat et propre)' },
              {
                value: 'medium',
                label: 'Moyen (quelques irrégularités)',
              },
              {
                value: 'poor',
                label: 'Mauvais (ragréage nécessaire)',
              },
            ],
          },
          {
            id: 'removal',
            type: 'radio',
            label: 'Dépose existante',
            required: true,
            options: [
              { value: 'none', label: 'Pas de dépose' },
              { value: 'simple', label: 'Dépose simple' },
              { value: 'complex', label: 'Dépose complexe' },
            ],
          },
        ],
      },
      {
        id: 'location',
        title: 'Localisation',
        questions: [
          {
            id: 'postal-code',
            type: 'text',
            label: 'Code postal',
            required: true,
          },
          {
            id: 'timeline',
            type: 'select',
            label: 'Délai souhaité',
            required: true,
            options: [
              { value: 'urgent', label: 'Urgent (< 2 semaines)' },
              { value: 'normal', label: 'Normal (2-4 semaines)' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },
}

// Helper pour récupérer un questionnaire
export function getQuestionnaire(workTypeId: WorkTypeId): Questionnaire {
  return (
    QUESTIONNAIRES[workTypeId] || {
      workTypeId,
      steps: [],
    }
  )
}

// Calculer le nombre total de questions
export function getTotalQuestions(questionnaire: Questionnaire): number {
  return questionnaire.steps.reduce(
    (total, step) => total + step.questions.length,
    0
  )
}
