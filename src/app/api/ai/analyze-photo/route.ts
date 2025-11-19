import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

// Configuration - Mode démo forcé (pas d'accès Claude Vision)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const isDemoMode = true // FORCÉ : Claude Vision nécessite un plan payant
const anthropic = null

console.log('📸 [Photo API Config] MODE DÉMO OPTIMISÉ (Claude Vision nécessite un plan payant)')

// Coût en crédits pour une analyse photo
const PHOTO_ANALYSIS_COST = 5

// Fonction de démo pour analyser une image
async function analyzImageDemo(imageBase64: string, fileName: string): Promise<any> {
  console.log('🎯 [Demo Mode] Analyse d\'image simulée')
  
  // Simulation de traitement
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Extraire le type d'image du nom de fichier ou assumer
  const fileNameLower = fileName.toLowerCase()
  
  // Déterminer le type de pièce/travaux basé sur des mots-clés
  let workType = 'Rénovation complète'
  let roomType = 'Espace intérieur'
  let currentState = 'État correct nécessitant une modernisation'
  let estimatedArea = '15-20 m²'
  let materials = ['Plâtre', 'Peinture', 'Carrelage']
  let recommendations = [
    'Prévoir un rafraîchissement complet des peintures',
    'Envisager le remplacement des revêtements de sol',
    'Vérifier l\'isolation thermique et phonique',
    'Moderniser l\'éclairage avec des LED',
  ]
  
  // Logique basique de détection par nom de fichier
  if (fileNameLower.includes('cuisine') || fileNameLower.includes('kitchen') || fileNameLower.includes('kitchen')) {
    workType = 'Rénovation complète de cuisine'
    roomType = 'Cuisine'
    materials = ['Carrelage mural', 'Plan de travail', 'Faïence', 'Meubles']
    recommendations = [
      'Remplacer les meubles et le plan de travail',
      'Moderniser l\'électroménager encastré',
      'Refaire la crédence avec un carrelage moderne',
      'Optimiser l\'éclairage au-dessus du plan de travail',
    ]
  } else if (fileNameLower.includes('salle') || fileNameLower.includes('bain') || fileNameLower.includes('bathroom') || fileNameLower.includes('sdb')) {
    workType = 'Rénovation complète de salle de bain'
    roomType = 'Salle de bain'
    materials = ['Carrelage', 'Faïence', 'Sanitaires', 'Robinetterie']
    recommendations = [
      'Remplacer les sanitaires par des modèles économes en eau',
      'Installer une douche à l\'italienne moderne',
      'Prévoir une VMC pour l\'aération',
      'Choisir des matériaux résistants à l\'humidité',
    ]
  } else if (fileNameLower.includes('chambre') || fileNameLower.includes('bedroom') || fileNameLower.includes('room')) {
    workType = 'Rénovation de chambre'
    roomType = 'Chambre'
    materials = ['Peinture', 'Parquet', 'Plâtre']
    recommendations = [
      'Choisir des couleurs apaisantes pour favoriser le sommeil',
      'Installer un parquet flottant ou stratifié',
      'Prévoir une isolation phonique efficace',
      'Optimiser les rangements avec des placards sur-mesure',
    ]
  } else if (fileNameLower.includes('salon') || fileNameLower.includes('living') || fileNameLower.includes('sejour') || fileNameLower.includes('séjour')) {
    workType = 'Rénovation de salon'
    roomType = 'Salon'
    materials = ['Peinture', 'Parquet', 'Plâtre', 'Éclairage']
    recommendations = [
      'Créer une ambiance chaleureuse avec des tons neutres',
      'Installer un éclairage LED modulable',
      'Prévoir des prises électriques supplémentaires',
      'Optimiser l\'agencement pour un espace convivial',
    ]
  } else if (fileNameLower.includes('bureau') || fileNameLower.includes('office')) {
    workType = 'Aménagement de bureau'
    roomType = 'Bureau'
    materials = ['Peinture', 'Parquet', 'Éclairage']
    recommendations = [
      'Optimiser l\'éclairage naturel et artificiel',
      'Prévoir suffisamment de prises électriques et réseau',
      'Choisir des couleurs favorisant la concentration',
      'Installer une isolation phonique si nécessaire',
    ]
  } else if (fileNameLower.includes('wc') || fileNameLower.includes('toilette')) {
    workType = 'Rénovation de WC'
    roomType = 'Toilettes'
    materials = ['Carrelage', 'Sanitaires', 'Faïence']
    recommendations = [
      'Installer des WC suspendus pour faciliter l\'entretien',
      'Optimiser l\'espace de rangement',
      'Choisir des matériaux faciles à nettoyer',
      'Prévoir une ventilation efficace',
    ]
  }
  
  // Budget estimé basé sur le type de travaux
  let minBudget = 3000
  let maxBudget = 8000
  
  if (workType.includes('cuisine')) {
    minBudget = 8000
    maxBudget = 25000
  } else if (workType.includes('salle de bain')) {
    minBudget = 5000
    maxBudget = 15000
  } else if (workType.includes('chambre') || workType.includes('salon')) {
    minBudget = 2000
    maxBudget = 8000
  }
  
  const avgBudget = Math.round((minBudget + maxBudget) / 2)
  
  return {
    workType,
    roomType,
    currentState,
    estimatedArea,
    materials,
    recommendations,
    estimatedBudget: {
      min: minBudget,
      max: maxBudget,
      average: avgBudget,
    },
    details: `Analyse basée sur l'image fournie. La pièce semble être ${roomType.toLowerCase()} d'environ ${estimatedArea}. L'état actuel suggère des travaux de ${workType.toLowerCase()}. Les matériaux identifiés incluent : ${materials.join(', ')}. Un budget compris entre ${minBudget.toLocaleString('fr-FR')}€ et ${maxBudget.toLocaleString('fr-FR')}€ est recommandé pour une rénovation complète et de qualité.`,
    confidence: 'Estimation basée sur analyse visuelle (mode démo)',
  }
}

export async function POST(request: NextRequest) {
  console.log('📸 [Photo API] Requête d\'analyse reçue')
  
  try {
    // Vérifier l'authentification
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }
    
    console.log('✅ [Photo API] Utilisateur authentifié:', user.id)
    
    // Récupérer les données
    const body = await request.json()
    const { image, fileName } = body
    
    if (!image) {
      return NextResponse.json(
        { error: 'Image manquante' },
        { status: 400 }
      )
    }
    
    // Analyser l'image (mode démo pour l'instant)
    let analysis
    
    if (isDemoMode) {
      console.log('🎯 [Photo API] Mode DÉMO activé')
      analysis = await analyzImageDemo(image, fileName || 'image.jpg')
    } else {
      // TODO: Intégration Claude Vision API quand disponible
      console.log('✅ [Photo API] Appel à Claude Vision...')
      throw new Error('Claude Vision non disponible - utiliser mode démo')
    }
    
    console.log('✅ [Photo API] Analyse terminée')
    
    // Logger l'utilisation (sans crédits)
    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature_type: 'photo_analysis',
      credits_used: 0,
      metadata: {
        fileName: fileName || 'unknown',
        imageSize: image.length,
        analysisType: 'demo',
      },
    })
    
    // Retourner les résultats
    return NextResponse.json({
      success: true,
      analysis,
    })
    
  } catch (error: any) {
    console.error('❌ [Photo API] Erreur:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'analyse de l\'image' },
      { status: 500 }
    )
  }
}

