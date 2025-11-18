// Types pour les différents types de travaux et leurs catégories

export type WorkCategoryId =
  | 'painting'
  | 'flooring'
  | 'plumbing'
  | 'electricity'
  | 'carpentry'
  | 'insulation'

export type WorkTypeId = string

export interface WorkCategory {
  id: WorkCategoryId
  name: string
  description: string
  icon: string // Nom de l'icône Lucide
  color: string // Couleur Tailwind
}

export interface WorkType {
  id: WorkTypeId
  categoryId: WorkCategoryId
  name: string
  description: string
  icon: string
  averagePriceRange: {
    min: number
    max: number
    unit: string // ex: "€/m²", "€/unité"
  }
  estimationComplexity: 'simple' | 'medium' | 'complex'
}

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: 'painting',
    name: 'Peinture & Revêtements',
    description: 'Peinture, papier peint, revêtements muraux',
    icon: 'Paintbrush',
    color: 'blue',
  },
  {
    id: 'flooring',
    name: 'Sols & Carrelage',
    description: 'Carrelage, parquet, revêtements de sol',
    icon: 'Grid3x3',
    color: 'amber',
  },
  {
    id: 'plumbing',
    name: 'Plomberie & Sanitaires',
    description: 'Salle de bain, cuisine, chaudière',
    icon: 'Droplet',
    color: 'cyan',
  },
  {
    id: 'electricity',
    name: 'Électricité',
    description: 'Installation électrique, domotique',
    icon: 'Zap',
    color: 'yellow',
  },
  {
    id: 'carpentry',
    name: 'Menuiserie',
    description: 'Fenêtres, portes, volets',
    icon: 'Hammer',
    color: 'orange',
  },
  {
    id: 'insulation',
    name: 'Isolation & Chauffage',
    description: 'Isolation thermique, chauffage',
    icon: 'Thermometer',
    color: 'red',
  },
]

export const WORK_TYPES: WorkType[] = [
  // Peinture & Revêtements
  {
    id: 'painting-interior',
    categoryId: 'painting',
    name: 'Peinture intérieure',
    description: 'Peinture des murs et plafonds',
    icon: 'Paintbrush',
    averagePriceRange: { min: 20, max: 40, unit: '€/m²' },
    estimationComplexity: 'simple',
  },
  {
    id: 'painting-exterior',
    categoryId: 'painting',
    name: 'Peinture extérieure',
    description: 'Peinture de façade',
    icon: 'Home',
    averagePriceRange: { min: 30, max: 60, unit: '€/m²' },
    estimationComplexity: 'medium',
  },
  {
    id: 'wallpaper',
    categoryId: 'painting',
    name: 'Papier peint',
    description: 'Pose de papier peint',
    icon: 'FileText',
    averagePriceRange: { min: 25, max: 50, unit: '€/m²' },
    estimationComplexity: 'simple',
  },

  // Sols & Carrelage
  {
    id: 'tile-floor',
    categoryId: 'flooring',
    name: 'Carrelage sol',
    description: 'Pose de carrelage au sol',
    icon: 'Square',
    averagePriceRange: { min: 40, max: 80, unit: '€/m²' },
    estimationComplexity: 'medium',
  },
  {
    id: 'tile-wall',
    categoryId: 'flooring',
    name: 'Carrelage mural',
    description: 'Pose de carrelage mural',
    icon: 'LayoutGrid',
    averagePriceRange: { min: 45, max: 90, unit: '€/m²' },
    estimationComplexity: 'medium',
  },
  {
    id: 'parquet',
    categoryId: 'flooring',
    name: 'Parquet',
    description: 'Pose de parquet massif ou flottant',
    icon: 'Component',
    averagePriceRange: { min: 35, max: 100, unit: '€/m²' },
    estimationComplexity: 'medium',
  },

  // Plomberie & Sanitaires
  {
    id: 'bathroom-renovation',
    categoryId: 'plumbing',
    name: 'Rénovation salle de bain',
    description: 'Rénovation complète salle de bain',
    icon: 'Bath',
    averagePriceRange: { min: 5000, max: 15000, unit: '€' },
    estimationComplexity: 'complex',
  },
  {
    id: 'kitchen-plumbing',
    categoryId: 'plumbing',
    name: 'Installation cuisine',
    description: 'Plomberie et installation cuisine',
    icon: 'UtensilsCrossed',
    averagePriceRange: { min: 3000, max: 10000, unit: '€' },
    estimationComplexity: 'complex',
  },
  {
    id: 'boiler',
    categoryId: 'plumbing',
    name: 'Chaudière',
    description: 'Installation ou remplacement chaudière',
    icon: 'Flame',
    averagePriceRange: { min: 3000, max: 8000, unit: '€' },
    estimationComplexity: 'complex',
  },

  // Électricité
  {
    id: 'electrical-renovation',
    categoryId: 'electricity',
    name: 'Rénovation électrique',
    description: 'Mise aux normes installation électrique',
    icon: 'Zap',
    averagePriceRange: { min: 80, max: 150, unit: '€/m²' },
    estimationComplexity: 'complex',
  },
  {
    id: 'home-automation',
    categoryId: 'electricity',
    name: 'Domotique',
    description: 'Installation système domotique',
    icon: 'Cpu',
    averagePriceRange: { min: 2000, max: 8000, unit: '€' },
    estimationComplexity: 'complex',
  },

  // Menuiserie
  {
    id: 'windows',
    categoryId: 'carpentry',
    name: 'Fenêtres',
    description: 'Remplacement fenêtres',
    icon: 'Square',
    averagePriceRange: { min: 300, max: 1000, unit: '€/unité' },
    estimationComplexity: 'medium',
  },
  {
    id: 'interior-doors',
    categoryId: 'carpentry',
    name: 'Portes intérieures',
    description: 'Installation portes intérieures',
    icon: 'Door',
    averagePriceRange: { min: 200, max: 600, unit: '€/unité' },
    estimationComplexity: 'simple',
  },

  // Isolation & Chauffage
  {
    id: 'attic-insulation',
    categoryId: 'insulation',
    name: 'Isolation combles',
    description: 'Isolation des combles perdus ou aménagés',
    icon: 'Home',
    averagePriceRange: { min: 30, max: 60, unit: '€/m²' },
    estimationComplexity: 'medium',
  },
  {
    id: 'wall-insulation',
    categoryId: 'insulation',
    name: 'Isolation murs',
    description: 'Isolation par l\'intérieur ou extérieur',
    icon: 'Layers',
    averagePriceRange: { min: 50, max: 150, unit: '€/m²' },
    estimationComplexity: 'complex',
  },
  {
    id: 'heat-pump',
    categoryId: 'insulation',
    name: 'Pompe à chaleur',
    description: 'Installation pompe à chaleur',
    icon: 'Wind',
    averagePriceRange: { min: 8000, max: 16000, unit: '€' },
    estimationComplexity: 'complex',
  },
]

// Helper functions
export function getWorkTypeById(id: WorkTypeId): WorkType | undefined {
  return WORK_TYPES.find((type) => type.id === id)
}

export function getWorkTypesByCategory(
  categoryId: WorkCategoryId
): WorkType[] {
  return WORK_TYPES.filter((type) => type.categoryId === categoryId)
}

export function getCategoryById(
  id: WorkCategoryId
): WorkCategory | undefined {
  return WORK_CATEGORIES.find((cat) => cat.id === id)
}
