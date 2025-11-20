import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

// Configuration OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null

console.log('📸 [Photo API Config]', openai ? '✅ OPENAI GPT-4 VISION ACTIVÉ' : '⚠️ MODE DÉMO')

// Fonction de démo pour analyser une image (backup)
async function analyzImageDemo(fileName: string): Promise<any> {
  console.log('🎯 [Demo Mode] Analyse simulée')
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const fileNameLower = fileName.toLowerCase()
  
  let workType = 'Rénovation complète'
  let roomType = 'Espace intérieur'
  let materials = ['Plâtre', 'Peinture', 'Carrelage']
  let recommendations = [
    'Prévoir un rafraîchissement complet des peintures',
    'Envisager le remplacement des revêtements de sol',
    'Vérifier l\'isolation thermique et phonique',
    'Moderniser l\'éclairage avec des LED',
  ]
  
  if (fileNameLower.includes('cuisine')) {
    workType = 'Rénovation complète de cuisine'
    roomType = 'Cuisine'
    materials = ['Carrelage mural', 'Plan de travail', 'Faïence', 'Meubles']
    recommendations = [
      'Remplacer les meubles et le plan de travail',
      'Moderniser l\'électroménager encastré',
      'Refaire la crédence avec un carrelage moderne',
      'Optimiser l\'éclairage au-dessus du plan de travail',
    ]
  } else if (fileNameLower.includes('salle') || fileNameLower.includes('bain')) {
    workType = 'Rénovation complète de salle de bain'
    roomType = 'Salle de bain'
    materials = ['Carrelage', 'Faïence', 'Sanitaires', 'Robinetterie']
    recommendations = [
      'Remplacer les sanitaires par des modèles économes en eau',
      'Installer une douche à l\'italienne moderne',
      'Prévoir une VMC pour l\'aération',
      'Choisir des matériaux résistants à l\'humidité',
    ]
  }
  
  const minBudget = workType.includes('cuisine') ? 8000 : workType.includes('salle de bain') ? 5000 : 3000
  const maxBudget = workType.includes('cuisine') ? 25000 : workType.includes('salle de bain') ? 15000 : 8000
  const avgBudget = Math.round((minBudget + maxBudget) / 2)
  
  return {
    workType,
    roomType,
    currentState: 'État correct nécessitant une modernisation',
    estimatedArea: '15-20 m²',
    materials,
    recommendations,
    estimatedBudget: { min: minBudget, max: maxBudget, average: avgBudget },
    details: `Analyse basée sur le nom du fichier. La pièce semble être ${roomType.toLowerCase()} d'environ 15-20m². Budget estimé : ${minBudget.toLocaleString('fr-FR')}€ - ${maxBudget.toLocaleString('fr-FR')}€.`,
    confidence: 'Estimation basée sur le nom de fichier (mode démo)',
  }
}

// Analyser une image avec GPT-4 Vision
async function analyzeImageWithGPT4Vision(imageBase64: string): Promise<any> {
  if (!openai) throw new Error('OpenAI non configuré')
  
  console.log('🔍 [GPT-4 Vision] Analyse de l\'image...')
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analyse cette photo de rénovation et fournis une estimation détaillée au format JSON strict suivant :

{
  "workType": "Type de travaux nécessaires",
  "roomType": "Type de pièce (Cuisine, Salle de bain, Chambre, Salon, etc.)",
  "currentState": "Description de l'état actuel",
  "estimatedArea": "Surface estimée en m²",
  "materials": ["Liste", "des", "matériaux", "visibles"],
  "recommendations": ["Liste", "de", "recommandations"],
  "estimatedBudget": {
    "min": 5000,
    "max": 15000,
    "average": 10000
  },
  "details": "Analyse détaillée de l'espace",
  "confidence": "Niveau de confiance de l'estimation"
}

IMPORTANT : 
- Réponds UNIQUEMENT avec le JSON, sans texte avant ou après
- Les budgets doivent être en euros
- Sois précis et détaillé
- Base-toi sur ce que tu vois réellement dans l'image`,
          },
          {
            type: 'image_url',
            image_url: {
              url: imageBase64,
            },
          },
        ],
      },
    ],
    max_tokens: 1000,
    temperature: 0.3,
  })
  
  const content = response.choices[0]?.message?.content || ''
  console.log('📝 [GPT-4 Vision] Réponse brute:', content.substring(0, 200))
  
  // Parser le JSON
  try {
    // Extraire le JSON de la réponse (au cas où il y a du texte autour)
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Pas de JSON trouvé dans la réponse')
    
    const analysis = JSON.parse(jsonMatch[0])
    console.log('✅ [GPT-4 Vision] Analyse terminée')
    
    return analysis
  } catch (error) {
    console.error('❌ [GPT-4 Vision] Erreur parsing JSON:', error)
    throw new Error('Erreur lors de l\'analyse de l\'image')
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
    
    // Analyser l'image
    let analysis
    
    if (openai) {
      try {
        analysis = await analyzeImageWithGPT4Vision(image)
      } catch (error: any) {
        console.error('❌ [Photo API] Erreur GPT-4 Vision:', error)
        // Fallback sur mode démo
        console.log('🔄 [Photo API] Fallback sur mode démo')
        analysis = await analyzImageDemo(fileName || 'image.jpg')
      }
    } else {
      console.log('🎯 [Photo API] Mode DÉMO activé')
      analysis = await analyzImageDemo(fileName || 'image.jpg')
    }
    
    console.log('✅ [Photo API] Analyse terminée')
    
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
