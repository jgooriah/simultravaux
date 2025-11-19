// Configuration des questionnaires pour chaque type de travaux

import { type Questionnaire, type WorkTypeId } from '@/types/questionnaire'

export const QUESTIONNAIRES: Record<WorkTypeId, Questionnaire> = {
  'painting-interior': {
    workTypeId: 'painting-interior',
    steps: [
      {
        id: 'main',
        title: 'Peinture intérieure',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface totale à peindre',
            description: 'Surface au sol des pièces',
            placeholder: 'Ex: 25',
            unit: 'm²',
            required: true,
            min: 5,
            max: 500,
          },
          {
            id: 'current-state',
            type: 'radio',
            label: 'État des murs',
            required: true,
            options: [
              { value: 'good', label: 'Bon état', description: 'Murs lisses' },
              {
                value: 'medium',
                label: 'État moyen',
                description: 'Quelques réparations',
                priceImpact: 'low',
              },
              {
                value: 'poor',
                label: 'Mauvais état',
                description: 'Nombreuses réparations',
                priceImpact: 'high',
              },
            ],
          },
          {
            id: 'paint-quality',
            type: 'radio',
            label: 'Qualité de peinture',
            required: true,
            options: [
              { value: 'standard', label: 'Standard', description: 'Bon rapport qualité-prix' },
              {
                value: 'premium',
                label: 'Premium',
                description: 'Haut de gamme',
                priceImpact: 'medium',
              },
            ],
          },
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
            id: 'timeline',
            type: 'select',
            label: 'Délai souhaité',
            required: true,
            options: [
              { value: 'urgent', label: 'Urgent (< 2 semaines)', priceImpact: 'high' },
              { value: 'normal', label: 'Normal (2-4 semaines)' },
              { value: 'flexible', label: 'Flexible (> 1 mois)' },
            ],
          },
        ],
      },
    ],
  },

  'painting-exterior': {
    workTypeId: 'painting-exterior',
    steps: [
      {
        id: 'main',
        title: 'Peinture extérieure',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface de façade à peindre',
            unit: 'm²',
            required: true,
            min: 10,
            max: 1000,
          },
          {
            id: 'facade-type',
            type: 'select',
            label: 'Type de façade',
            required: true,
            options: [
              { value: 'smooth', label: 'Lisse' },
              { value: 'rough', label: 'Crépi/Enduit' },
              { value: 'brick', label: 'Brique' },
            ],
          },
          {
            id: 'condition',
            type: 'radio',
            label: 'État de la façade',
            required: true,
            options: [
              { value: 'good', label: 'Bon état' },
              { value: 'medium', label: 'État moyen', priceImpact: 'low' },
              { value: 'poor', label: 'Mauvais état', priceImpact: 'high' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent (< 1 mois)', priceImpact: 'high' },
              { value: 'normal', label: 'Normal (1-2 mois)' },
              { value: 'flexible', label: 'Flexible (> 2 mois)' },
            ],
          },
        ],
      },
    ],
  },

  wallpaper: {
    workTypeId: 'wallpaper',
    steps: [
      {
        id: 'main',
        title: 'Papier peint',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface totale',
            unit: 'm²',
            required: true,
            min: 5,
            max: 200,
          },
          {
            id: 'wallpaper-type',
            type: 'select',
            label: 'Type de papier peint',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'vinyl', label: 'Vinyle' },
              { value: 'intisse', label: 'Intissé', priceImpact: 'low' },
              { value: 'textile', label: 'Textile', priceImpact: 'high' },
            ],
          },
          {
            id: 'removal',
            type: 'radio',
            label: 'Dépose ancien papier peint',
            required: true,
            options: [
              { value: 'no', label: 'Non, murs nus' },
              { value: 'yes', label: 'Oui, à décoller', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
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
        id: 'main',
        title: 'Rénovation salle de bain',
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
              { value: 'refresh', label: 'Rafraîchissement', description: 'Peinture, petits équipements' },
              {
                value: 'partial',
                label: 'Partielle',
                description: 'Certains éléments',
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
            id: 'equipment-range',
            type: 'radio',
            label: 'Gamme des équipements',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'mid-range', label: 'Milieu de gamme', priceImpact: 'low' },
              { value: 'premium', label: 'Premium', priceImpact: 'high' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent (< 1 mois)', priceImpact: 'high' },
              { value: 'normal', label: 'Normal (1-3 mois)' },
              { value: 'flexible', label: 'Flexible (> 3 mois)' },
            ],
          },
        ],
      },
    ],
  },

  'kitchen-plumbing': {
    workTypeId: 'kitchen-plumbing',
    steps: [
      {
        id: 'main',
        title: 'Installation cuisine',
        questions: [
          {
            id: 'kitchen-size',
            type: 'number',
            label: 'Surface de la cuisine',
            unit: 'm²',
            required: true,
            min: 4,
            max: 50,
          },
          {
            id: 'work-type',
            type: 'radio',
            label: 'Type de travaux',
            required: true,
            options: [
              { value: 'plumbing-only', label: 'Plomberie uniquement' },
              { value: 'full-install', label: 'Installation complète', priceImpact: 'high' },
            ],
          },
          {
            id: 'quality',
            type: 'select',
            label: 'Gamme souhaitée',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'premium', label: 'Premium', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  boiler: {
    workTypeId: 'boiler',
    steps: [
      {
        id: 'main',
        title: 'Chaudière',
        questions: [
          {
            id: 'boiler-type',
            type: 'select',
            label: 'Type de chaudière',
            required: true,
            options: [
              { value: 'gas', label: 'Gaz' },
              { value: 'electric', label: 'Électrique' },
              { value: 'condensation', label: 'Condensation', priceImpact: 'medium' },
            ],
          },
          {
            id: 'power',
            type: 'select',
            label: 'Puissance nécessaire',
            required: true,
            options: [
              { value: 'small', label: 'Petite (< 24 kW)' },
              { value: 'medium', label: 'Moyenne (24-35 kW)' },
              { value: 'large', label: 'Grande (> 35 kW)', priceImpact: 'medium' },
            ],
          },
          {
            id: 'installation-type',
            type: 'radio',
            label: 'Type d\'installation',
            required: true,
            options: [
              { value: 'replacement', label: 'Remplacement' },
              { value: 'new', label: 'Nouvelle installation', priceImpact: 'high' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
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
        id: 'main',
        title: 'Carrelage sol',
        questions: [
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
            id: 'tile-quality',
            type: 'radio',
            label: 'Gamme de carrelage',
            required: true,
            options: [
              { value: 'standard', label: 'Standard (15-30€/m²)' },
              { value: 'mid-range', label: 'Milieu de gamme (30-60€/m²)', priceImpact: 'low' },
              { value: 'premium', label: 'Premium (60€+/m²)', priceImpact: 'high' },
            ],
          },
          {
            id: 'floor-condition',
            type: 'radio',
            label: 'État du sol actuel',
            required: true,
            options: [
              { value: 'good', label: 'Bon (plat et propre)' },
              { value: 'medium', label: 'Moyen', priceImpact: 'low' },
              { value: 'poor', label: 'Mauvais (ragréage)', priceImpact: 'high' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'tile-wall': {
    workTypeId: 'tile-wall',
    steps: [
      {
        id: 'main',
        title: 'Carrelage mural',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface murale',
            unit: 'm²',
            required: true,
            min: 2,
            max: 150,
          },
          {
            id: 'room-type',
            type: 'select',
            label: 'Type de pièce',
            required: true,
            options: [
              { value: 'bathroom', label: 'Salle de bain' },
              { value: 'kitchen', label: 'Cuisine' },
              { value: 'other', label: 'Autre' },
            ],
          },
          {
            id: 'tile-quality',
            type: 'radio',
            label: 'Gamme',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'premium', label: 'Premium', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  parquet: {
    workTypeId: 'parquet',
    steps: [
      {
        id: 'main',
        title: 'Parquet',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface totale',
            unit: 'm²',
            required: true,
            min: 5,
            max: 300,
          },
          {
            id: 'parquet-type',
            type: 'select',
            label: 'Type de parquet',
            required: true,
            options: [
              { value: 'laminate', label: 'Stratifié' },
              { value: 'floating', label: 'Flottant' },
              { value: 'solid', label: 'Massif', priceImpact: 'high' },
            ],
          },
          {
            id: 'quality',
            type: 'radio',
            label: 'Gamme',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'premium', label: 'Premium', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'electrical-renovation': {
    workTypeId: 'electrical-renovation',
    steps: [
      {
        id: 'main',
        title: 'Rénovation électrique',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface du logement',
            unit: 'm²',
            required: true,
            min: 10,
            max: 500,
          },
          {
            id: 'renovation-type',
            type: 'radio',
            label: 'Type de rénovation',
            required: true,
            options: [
              { value: 'partial', label: 'Partielle' },
              { value: 'complete', label: 'Complète', priceImpact: 'high' },
            ],
          },
          {
            id: 'safety-compliance',
            type: 'radio',
            label: 'Mise aux normes',
            required: true,
            options: [
              { value: 'no', label: 'Non nécessaire' },
              { value: 'yes', label: 'Oui, mise aux normes', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'home-automation': {
    workTypeId: 'home-automation',
    steps: [
      {
        id: 'main',
        title: 'Domotique',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface du logement',
            unit: 'm²',
            required: true,
            min: 20,
            max: 500,
          },
          {
            id: 'system-type',
            type: 'select',
            label: 'Type de système',
            required: true,
            options: [
              { value: 'basic', label: 'Basique (éclairage, volets)' },
              { value: 'advanced', label: 'Avancé (chauffage, sécurité)', priceImpact: 'medium' },
              { value: 'complete', label: 'Complet (tout intégré)', priceImpact: 'high' },
            ],
          },
          {
            id: 'existing-install',
            type: 'radio',
            label: 'Installation existante',
            required: true,
            options: [
              { value: 'no', label: 'Non, nouvelle installation' },
              { value: 'yes', label: 'Oui, à compléter' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  windows: {
    workTypeId: 'windows',
    steps: [
      {
        id: 'main',
        title: 'Fenêtres',
        questions: [
          {
            id: 'window-count',
            type: 'number',
            label: 'Nombre de fenêtres',
            required: true,
            min: 1,
            max: 50,
          },
          {
            id: 'window-type',
            type: 'select',
            label: 'Type de fenêtres',
            required: true,
            options: [
              { value: 'pvc', label: 'PVC' },
              { value: 'alu', label: 'Aluminium', priceImpact: 'low' },
              { value: 'wood', label: 'Bois', priceImpact: 'medium' },
            ],
          },
          {
            id: 'double-glazing',
            type: 'radio',
            label: 'Vitrage',
            required: true,
            options: [
              { value: 'double', label: 'Double vitrage' },
              { value: 'triple', label: 'Triple vitrage', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'interior-doors': {
    workTypeId: 'interior-doors',
    steps: [
      {
        id: 'main',
        title: 'Portes intérieures',
        questions: [
          {
            id: 'door-count',
            type: 'number',
            label: 'Nombre de portes',
            required: true,
            min: 1,
            max: 30,
          },
          {
            id: 'door-type',
            type: 'select',
            label: 'Type de portes',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'sliding', label: 'Coulissantes', priceImpact: 'low' },
              { value: 'custom', label: 'Sur-mesure', priceImpact: 'high' },
            ],
          },
          {
            id: 'quality',
            type: 'radio',
            label: 'Gamme',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'premium', label: 'Premium', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'attic-insulation': {
    workTypeId: 'attic-insulation',
    steps: [
      {
        id: 'main',
        title: 'Isolation combles',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface des combles',
            unit: 'm²',
            required: true,
            min: 10,
            max: 300,
          },
          {
            id: 'attic-type',
            type: 'radio',
            label: 'Type de combles',
            required: true,
            options: [
              { value: 'lost', label: 'Perdus' },
              { value: 'converted', label: 'Aménagés', priceImpact: 'medium' },
            ],
          },
          {
            id: 'insulation-type',
            type: 'select',
            label: 'Type d\'isolation',
            required: true,
            options: [
              { value: 'wool', label: 'Laine minérale' },
              { value: 'blown', label: 'Soufflée' },
              { value: 'eco', label: 'Écologique', priceImpact: 'low' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'wall-insulation': {
    workTypeId: 'wall-insulation',
    steps: [
      {
        id: 'main',
        title: 'Isolation murs',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface des murs',
            unit: 'm²',
            required: true,
            min: 20,
            max: 500,
          },
          {
            id: 'insulation-method',
            type: 'radio',
            label: 'Méthode d\'isolation',
            required: true,
            options: [
              { value: 'interior', label: 'Par l\'intérieur' },
              { value: 'exterior', label: 'Par l\'extérieur', priceImpact: 'high' },
            ],
          },
          {
            id: 'material-quality',
            type: 'select',
            label: 'Qualité des matériaux',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'premium', label: 'Premium', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
              { value: 'flexible', label: 'Flexible' },
            ],
          },
        ],
      },
    ],
  },

  'heat-pump': {
    workTypeId: 'heat-pump',
    steps: [
      {
        id: 'main',
        title: 'Pompe à chaleur',
        questions: [
          {
            id: 'surface-area',
            type: 'number',
            label: 'Surface à chauffer',
            unit: 'm²',
            required: true,
            min: 30,
            max: 500,
          },
          {
            id: 'pump-type',
            type: 'select',
            label: 'Type de pompe',
            required: true,
            options: [
              { value: 'air-air', label: 'Air-Air' },
              { value: 'air-water', label: 'Air-Eau', priceImpact: 'medium' },
              { value: 'geothermal', label: 'Géothermique', priceImpact: 'high' },
            ],
          },
          {
            id: 'installation-complexity',
            type: 'radio',
            label: 'Complexité',
            required: true,
            options: [
              { value: 'simple', label: 'Simple' },
              { value: 'complex', label: 'Complexe', priceImpact: 'medium' },
            ],
          },
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
              { value: 'urgent', label: 'Urgent', priceImpact: 'high' },
              { value: 'normal', label: 'Normal' },
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
