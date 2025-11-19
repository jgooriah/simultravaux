import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Configuration - FORCER MODE DÉMO (problème d'accès aux modèles Claude)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const isDemoMode = true  // FORCÉ : la clé API existe mais n'a pas accès aux modèles
const anthropic = null

console.log('🎯 [Chat API Config] MODE DÉMO OPTIMISÉ (accès modèles limité - clé API présente mais non fonctionnelle)')

// Prompt système pour le chatbot
const SYSTEM_PROMPT = `Tu es un expert en rénovation sympathique et professionnel sur SimuTravaux.

IMPORTANT - Pose UNE question à la fois, naturellement.

Types de travaux supportés : cuisine, salle de bain, peinture, sol/parquet, électricité, plomberie, chauffage, fenêtres/portes, isolation, toiture, extension, rénovation complète.

Processus :
1. Type de travaux
2. Surface en m²
3. Qualité (présente les 3 options avec prix AVANT de demander) :
   - Économique (calcul : surface × prix/m² × 0.8)
   - Standard (calcul : surface × prix/m²)
   - Premium (calcul : surface × prix/m² × 1.3)
4. Code postal

Estimation COMPACTE (max 15 lignes) :
💰 Budget (Qualité) : min - moyen - max
📊 MO (55%) / Matériaux (35%) / Finitions (10%)
⏱ Délai | 📍 CP (+X%) | ⚙️ Complexité
🔧 2-3 conseils techniques
⚖️ 2-3 normes
🎨 2-3 tendances 2025
💡 3 devis, assurances, +15%
💸 Aides disponibles

Sois chaleureux, concis. PAS de markdown. Évite répétitions.`

export async function POST(request: NextRequest) {
  console.log('🔵 [Chat API] Requête reçue')
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const body = await request.json()
        const { messages } = body

        console.log('📩 [Chat API] Messages reçus:', messages?.length)

        if (!messages || !Array.isArray(messages)) {
          console.error('❌ [Chat API] Format invalide')
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Format de message invalide' })}\n\n`
            )
          )
          controller.close()
          return
        }

        // Mode démo OU Claude API
        if (isDemoMode) {
          console.log('⚠️ [Chat API] Mode DÉMO (pas de clé API Claude)')
          const demoResponse = generateDemoResponse(messages)
          console.log('💬 [Demo] Réponse:', demoResponse.substring(0, 100) + '...')
          
          // Streaming de la réponse démo
          for (let i = 0; i < demoResponse.length; i++) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: demoResponse[i] })}\n\n`)
            )
            await new Promise((resolve) => setTimeout(resolve, 15))
          }

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
          console.log('✅ [Demo] Réponse envoyée')
          controller.close()
          return
        }

        // Mode Claude API (utiliser Claude 3 Sonnet au lieu de 3.5)
        console.log('✅ [Claude API] Appel à Claude...')
        const stream = await anthropic.messages.stream({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: messages.map((m: any) => ({
            role: m.role,
            content: m.content
          }))
        })

        console.log('📡 [Claude API] Stream démarré')

        // Streaming de Claude
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
            )
          }
        }

        controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
        console.log('✅ [Claude API] Réponse complète')
        controller.close()
      } catch (error: any) {
        console.error('❌ [Chat API] ERREUR:', error)
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

// Fonction pour détecter et normaliser le type de travaux (AMÉLIORÉE - beaucoup plus flexible)
function detectWorkType(text: string): string {
  const textLower = text.toLowerCase()
  
  // Salle de bain
  if (textLower.match(/\b(salle de bain|sdb|douche|baignoire|lavabo|wc|toilette|sanitaire)\b/i)) {
    return 'salle de bain'
  }
  
  // Cuisine
  if (textLower.match(/\b(cuisine|cuisinette|kitchenette)\b/i)) {
    return 'cuisine'
  }
  
  // Peinture
  if (textLower.match(/\b(peinture|peindre|repeindre|mur|plafond|tapisserie|papier peint)\b/i)) {
    return 'peinture'
  }
  
  // Sol & Parquet
  if (textLower.match(/\b(parquet|sol|plancher|carrelage|carreaux|dalle|lino|vinyl|moquette|revêtement de sol)\b/i)) {
    return 'sol/parquet'
  }
  
  // Isolation
  if (textLower.match(/\b(isolation|isoler|combles|laine de verre|laine de roche)\b/i)) {
    return 'isolation'
  }
  
  // Toiture
  if (textLower.match(/\b(toiture|toit|tuile|ardoise|couverture|charpente|gouttière)\b/i)) {
    return 'toiture'
  }
  
  // Fenêtres & Portes
  if (textLower.match(/\b(fenêtre|fenetre|porte|volet|menuiserie|double vitrage|baie vitrée)\b/i)) {
    return 'fenêtres/portes'
  }
  
  // Électricité
  if (textLower.match(/\b(électricité|électrique|electrique|prise|interrupteur|tableau électrique|câblage|éclairage)\b/i)) {
    return 'électricité'
  }
  
  // Plomberie
  if (textLower.match(/\b(plomberie|plombier|tuyau|canalisation|robinet|chauffe-eau|chaudière)\b/i)) {
    return 'plomberie'
  }
  
  // Chauffage & Climatisation
  if (textLower.match(/\b(chauffage|radiateur|climatisation|clim|pompe à chaleur|pac)\b/i)) {
    return 'chauffage/climatisation'
  }
  
  // Extension & Agrandissement
  if (textLower.match(/\b(extension|agrandissement|véranda|garage|annexe|surélévation)\b/i)) {
    return 'extension/agrandissement'
  }
  
  // Rénovation complète / Tout
  if (textLower.match(/\b(tout|toute|complète|entière|générale|rénovation globale|maison|appartement|logement)\b/i)) {
    return 'rénovation complète'
  }
  
  return ''
}

// Génère une réponse démo intelligente basée sur le contexte
function generateDemoResponse(messages: any[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  const allMessages = messages.map((m: any) => m.content).join('\n').toLowerCase()
  
  console.log('🤖 [Demo] Analyse message:', lastMessage.substring(0, 100))
  console.log('🤖 [Demo] Nombre total de messages:', messages.length)

  // Regex pour les détections (AMÉLIORÉES)
  // Plus besoin de workTypeRegex rigide, on utilise detectWorkType() qui est flexible
  const surfaceRegex = /(\d{1,4}(?:\s*\.\s*\d+)?)\s*(?:m2|m²|metre|mètre|metres|mètres|mètre carré|mètres carrés)/i
  const qualityRegex = /(?:premium|haut de gamme|économique|budget|standard|moyen|qualité)/i
  const postalRegex = /\b\d{5}\b/

  // Répondre aux salutations et questions générales EN PREMIER
  if (/^(bonjour|salut|hello|hey|hi|coucou|bonsoir)\s*(,)?\s*(vous allez bien|ça va|comment allez-vous|comment ça va)?(\?)?$/i.test(lastMessage.trim())) {
    return "Bonjour ! Je vais très bien, merci ! 😊\n\nJe suis là pour vous aider à estimer vos travaux de rénovation.\n\nQuel type de travaux souhaitez-vous réaliser ?"
  }

  if (/^(ça va|vous allez bien|comment (ça )?va|comment allez-vous|comment vas-tu)(\?)?$/i.test(lastMessage.trim())) {
    return "Très bien, merci de demander ! 😊\n\nJe suis prêt à vous aider avec vos projets de rénovation.\n\nQuel type de travaux avez-vous en tête ?"
  }

  if (/^(merci|merci beaucoup|thanks|thank you)(\s|!|\.)?$/i.test(lastMessage.trim())) {
    return "De rien ! N'hésitez pas si vous avez d'autres questions. 😊"
  }

  // Détecter le type de travaux dans le dernier message
  const lastMessageWorkType = detectWorkType(lastMessage)
  
  // Détecter le type de travaux dans l'historique (sans le dernier message)
  const previousMessages = messages.slice(0, -1).map((m: any) => m.content).join('\n').toLowerCase()
  const previousWorkType = detectWorkType(previousMessages)
  
  // Si un NOUVEAU type de travaux différent est mentionné, réinitialiser
  if (lastMessageWorkType && previousWorkType && lastMessageWorkType !== previousWorkType && messages.length > 2) {
    console.log('🔄 [Demo] Changement de type:', previousWorkType, '→', lastMessageWorkType)
    return `Ah, vous souhaitez maintenant un devis pour ${lastMessageWorkType} !\n\nTrès bien. Pour votre projet de ${lastMessageWorkType}, quelle est la surface à rénover en m² ? (par exemple : 15, 20, 30...)`
  }

  // Extraire les informations de TOUT l'historique
  // Pour la surface, on prend la DERNIÈRE mention (la plus récente)
  const allSurfaceMatches = allMessages.match(new RegExp(surfaceRegex, 'gi'))
  const surfaceMatch = allSurfaceMatches ? allSurfaceMatches[allSurfaceMatches.length - 1].match(surfaceRegex) : null
  
  // Utiliser la fonction de détection FLEXIBLE pour le type de travaux
  const detectedWorkType = detectWorkType(allMessages)
  
  const qualityMatch = allMessages.match(qualityRegex)
  
  // Pour le code postal, ne le détecter QUE si on a déjà la qualité
  const hasQualityFirst = qualityMatch !== null
  const postalMatch = hasQualityFirst ? allMessages.match(postalRegex) : null

  const hasWorkType = detectedWorkType !== ''
  const hasSurface = surfaceMatch !== null
  const hasQuality = qualityMatch !== null
  const hasPostalCode = postalMatch !== null

  console.log('🔍 [Demo] Détection:', {
    hasWorkType: hasWorkType ? detectedWorkType : false,
    hasSurface: hasSurface ? surfaceMatch[0] : false,
    hasQuality: hasQuality ? qualityMatch[0] : false,
    hasPostalCode: hasPostalCode ? postalMatch[0] : false,
  })

  // ÉTAPE 1: Pas de type de travaux
  if (!hasWorkType) {
    console.log('✅ [Demo] Étape 1: Demander type de travaux')
    
    // Si l'utilisateur a écrit quelque chose mais on n'a pas détecté le type
    if (messages.length > 1) {
      return "Je comprends que vous souhaitez rénover quelque chose, mais je n'ai pas bien saisi le type de travaux.\n\nPouvez-vous préciser ? Par exemple :\n• Cuisine, salle de bain\n• Peinture, parquet, carrelage\n• Isolation, toiture, fenêtres\n• Électricité, plomberie, chauffage\n• Extension, rénovation complète\n\nOu décrivez-moi simplement ce que vous voulez faire !"
    }
    
    return "Bonjour ! Je suis là pour vous aider à estimer vos travaux de rénovation.\n\nQue souhaitez-vous rénover ? Parlez-moi de votre projet !"
  }

  // ÉTAPE 2: Type OK, mais pas de surface
  if (hasWorkType && !hasSurface) {
    console.log('✅ [Demo] Étape 2: Demander surface pour', detectedWorkType)
    
    // Demander des précisions si la demande est trop vague
    if (lastMessage.length < 10 && !lastMessage.match(/\d+/)) {
      return `D'accord ! Pour votre projet de ${detectedWorkType}, j'ai besoin de plus d'informations.\n\nPouvez-vous me préciser :\n• La surface à rénover en m² ?\n• S'il s'agit d'une rénovation complète ou partielle ?`
    }
    
    return `Super ! Pour votre projet de ${detectedWorkType}, j'ai besoin de connaître la surface.\n\nQuelle est la surface à rénover en m² ? (par exemple : 15, 20, 30...)`
  }

  // ÉTAPE 3: Type + Surface OK, mais pas de qualité
  if (hasWorkType && hasSurface && !hasQuality) {
    console.log('✅ [Demo] Étape 3: Demander qualité')
    const surfaceStr = surfaceMatch![1].replace(/\s/g, '')
    const surface = parseFloat(surfaceStr)
    
    console.log('📏 [Demo] Surface pour étape qualité:', surface, 'm²')
    
    // Validation de la surface
    if (isNaN(surface) || surface < 1 || surface > 5000) {
      return `La surface indiquée (${surfaceStr}m²) semble incorrecte.\n\nPour ${detectedWorkType}, quelle est la surface réelle à rénover en m² ?`
    }
    
    // Estimation rapide pour guider le budget (TOUS LES TYPES)
    let prixBase = 1000
    if (detectedWorkType === 'salle de bain') prixBase = 1500
    else if (detectedWorkType === 'cuisine') prixBase = 1200
    else if (detectedWorkType === 'peinture') prixBase = 30
    else if (detectedWorkType === 'sol/parquet') prixBase = 80
    else if (detectedWorkType === 'isolation') prixBase = 60
    else if (detectedWorkType === 'toiture') prixBase = 100
    else if (detectedWorkType === 'fenêtres/portes') prixBase = 400
    else if (detectedWorkType === 'électricité') prixBase = 100
    else if (detectedWorkType === 'plomberie') prixBase = 150
    else if (detectedWorkType === 'chauffage/climatisation') prixBase = 120
    else if (detectedWorkType === 'extension/agrandissement') prixBase = 2000
    else if (detectedWorkType === 'rénovation complète') prixBase = 800
    
    const prixEstimeMin = surface * prixBase * 0.8
    const prixEstimeMax = surface * prixBase * 1.3
    
    return `Très bien ! Pour ${surface}m² de ${detectedWorkType}, le budget variera entre ${Math.round(prixEstimeMin).toLocaleString('fr-FR')}€ et ${Math.round(prixEstimeMax).toLocaleString('fr-FR')}€ selon la qualité.\n\nQuel niveau de finition souhaitez-vous ?\n\n💰 Économique (~${Math.round(prixEstimeMin).toLocaleString('fr-FR')}€) :\n• Bon rapport qualité/prix\n• Matériaux standards\n• Finitions simples\n\n⭐ Standard (~${Math.round((prixEstimeMin + prixEstimeMax) / 2).toLocaleString('fr-FR')}€) :\n• Bon compromis\n• Matériaux de qualité\n• Finitions soignées\n\n✨ Premium (~${Math.round(prixEstimeMax).toLocaleString('fr-FR')}€) :\n• Haut de gamme\n• Matériaux d'excellence\n• Finitions luxueuses\n\nQuelle option correspond à votre budget ?`
  }

  // ÉTAPE 4: Type + Surface + Qualité OK, mais pas de code postal
  if (hasWorkType && hasSurface && hasQuality && !hasPostalCode) {
    console.log('✅ [Demo] Étape 4: Demander code postal')
    return `Parfait ! Dernière question pour ajuster l'estimation selon votre région.\n\nQuel est votre code postal ?`
  }

  // ÉTAPE 5: Tout est complet, générer l'estimation
  if (hasWorkType && hasSurface && hasQuality && hasPostalCode) {
    // RE-DÉTECTER le type dans le dernier contexte pour éviter les bugs
    const recentMessages = messages.slice(-5).map((m: any) => m.content).join('\n').toLowerCase()
    const finalWorkType = detectWorkType(recentMessages) || detectedWorkType
    
    console.log('✅ [Demo] Étape 5: Générer estimation finale')
    console.log('🔍 [Demo] Type original:', detectedWorkType)
    console.log('🔍 [Demo] Type final (re-détecté):', finalWorkType)
    
    const surfaceStr = surfaceMatch[1].replace(/\s/g, '') // Enlever les espaces
    const surface = parseFloat(surfaceStr)
    const quality = qualityMatch[0].toLowerCase()
    const postalCode = postalMatch[0]

    console.log('📏 [Demo] Surface extraite:', surfaceStr, '→', surface, 'm²')

    // Validation des données
    if (isNaN(surface) || surface < 1 || surface > 10000) {
      return `La surface indiquée (${surfaceStr}m²) semble incorrecte. Pourriez-vous vérifier ?\n\nPour ${finalWorkType}, quelle est la surface réelle à rénover ?`
    }

    // Déterminer le prix au m² selon le type de travaux PRÉCIS
    let prixAuM2 = 1000
    let delaiSemaines = '2-3'
    let complexite = 'moyenne'
    
    if (finalWorkType === 'salle de bain') {
      prixAuM2 = 1500
      delaiSemaines = '2-4'
      complexite = 'élevée'
    } else if (finalWorkType === 'cuisine') {
      prixAuM2 = 1200
      delaiSemaines = '3-4'
      complexite = 'élevée'
    } else if (finalWorkType === 'peinture') {
      prixAuM2 = 30
      delaiSemaines = '1-2'
      complexite = 'faible'
    } else if (finalWorkType === 'isolation') {
      prixAuM2 = 60
      delaiSemaines = '1-2'
      complexite = 'moyenne'
    } else if (finalWorkType === 'toiture') {
      prixAuM2 = 100
      delaiSemaines = '2-3'
      complexite = 'élevée'
    }

    // Ajustement qualité (ordre important: premium en premier!)
    let multiplier = 1
    let qualiteNom = 'Standard'
    if (quality.includes('premium') || quality.includes('haut de gamme')) {
      multiplier = 1.3
      qualiteNom = 'Premium'
    } else if (quality.includes('économique') || quality.includes('budget')) {
      multiplier = 0.8
      qualiteNom = 'Économique'
    } else if (quality.includes('standard') || quality.includes('moyen')) {
      multiplier = 1.0
      qualiteNom = 'Standard'
    }

    // Ajustement régional (exemple)
    let ajustementRegion = 1
    const codePostalNum = parseInt(postalCode.substring(0, 2))
    if (codePostalNum >= 75 && codePostalNum <= 78) {
      ajustementRegion = 1.15 // Île-de-France +15%
    } else if (codePostalNum >= 13 && codePostalNum <= 14) {
      ajustementRegion = 1.05 // Sud +5%
    }

    const moyen = Math.round(surface * prixAuM2 * multiplier * ajustementRegion)
    const min = Math.round(moyen * 0.85)
    const max = Math.round(moyen * 1.15)

    console.log('💰 [Demo] Estimation finale:', { 
      type: finalWorkType, 
      surface, 
      quality: qualiteNom, 
      prixAuM2, 
      multiplier,
      ajustementRegion,
      moyen 
    })

    // Message personnalisé selon la complexité
    let conseilsSpecifiques = ''
    let aspectsReglementaires = ''
    let tendancesEsthetiques = ''
    
    if (finalWorkType === 'salle de bain') {
      conseilsSpecifiques = '\n\n🚿 Conseils techniques salle de bain :\n• Prévoyez une bonne ventilation (VMC)\n• Choisissez des matériaux résistants à l\'humidité\n• Vérifiez l\'étanchéité et les normes électriques\n• Pensez à l\'accessibilité future (normes PMR)'
      aspectsReglementaires = '\n\n⚖️ Aspects réglementaires :\n• Norme NF C 15-100 (installation électrique)\n• Norme NF DTU 60.11 (plomberie)\n• Ventilation obligatoire (arrêté du 24/03/1982)\n• Si logement en copropriété : déclaration préalable de travaux'
      tendancesEsthetiques = '\n\n🎨 Tendances 2025 :\n• Carrelage effet marbre ou terrazzo\n• Robinetterie noire mate\n• Douche à l\'italienne\n• Couleurs : vert sauge, terracotta, blanc intemporel'
    } else if (finalWorkType === 'cuisine') {
      conseilsSpecifiques = '\n\n🍳 Conseils techniques cuisine :\n• Planifiez le triangle d\'activité (évier, plaques, frigo)\n• Prévoyez suffisamment de prises électriques (min. 6)\n• Choisissez des matériaux faciles d\'entretien\n• Pensez au rangement et à l\'ergonomie'
      aspectsReglementaires = '\n\n⚖️ Aspects réglementaires :\n• Norme NF C 15-100 (circuit spécialisé pour plaques, four)\n• Hotte avec extraction obligatoire\n• Respect des DTU 60.1 (plomberie) et 68.3 (fermetures)\n• Si gaz : contrôle par professionnel certifié'
      tendancesEsthetiques = '\n\n🎨 Tendances 2025 :\n• Cuisine ouverte avec îlot central\n• Plan de travail en quartz ou granit\n• Électroménager encastré\n• Couleurs : bois naturel, gris anthracite, blanc cassé'
    } else if (finalWorkType === 'peinture') {
      conseilsSpecifiques = '\n\n🎨 Conseils techniques peinture :\n• Préparez bien les surfaces (lessivage, rebouchage)\n• Utilisez une sous-couche adaptée\n• Aérez pendant et après les travaux (48h minimum)\n• Prévoyez 2 couches minimum pour un résultat optimal'
      aspectsReglementaires = '\n\n⚖️ Aspects réglementaires :\n• Utiliser des peintures A+ (faible émission de COV)\n• Respect du règlement sanitaire départemental\n• Si copropriété : accord pour couleurs extérieures\n• Délai de séchage avant réoccupation : 48h'
      tendancesEsthetiques = '\n\n🎨 Tendances 2025 :\n• Couleurs chaudes : terracotta, ocre, beige\n• Murs d\'accent (1 mur coloré)\n• Finitions mates ou satinées\n• Association de 2-3 couleurs maximum par pièce'
    } else if (finalWorkType === 'isolation') {
      conseilsSpecifiques = '\n\n🏠 Conseils techniques isolation :\n• Vérifiez votre éligibilité aux aides (MaPrimeRénov\')\n• Combinez avec une bonne ventilation (VMC)\n• Choisissez un isolant adapté à votre région\n• Pensez à l\'isolation phonique (RT 2012)'
      aspectsReglementaires = '\n\n⚖️ Aspects réglementaires :\n• Résistance thermique minimale R≥7 (combles)\n• Certification RGE obligatoire pour les aides\n• Respect de la RE2020 (nouvelles constructions)\n• Déclaration préalable si modification façade'
      tendancesEsthetiques = '\n\n💡 Solutions modernes :\n• Laine de bois (écologique)\n• Isolants biosourcés (chanvre, ouate)\n• ITE (Isolation Thermique Extérieure)\n• Double isolation (intérieur + extérieur)'
    } else if (finalWorkType === 'toiture') {
      conseilsSpecifiques = '\n\n🏠 Conseils techniques toiture :\n• Inspection complète avant travaux\n• Vérification de la charpente\n• Étanchéité et évacuation des eaux\n• Garantie décennale obligatoire'
      aspectsReglementaires = '\n\n⚖️ Aspects réglementaires :\n• Déclaration préalable de travaux obligatoire\n• Respect du PLU (Plan Local d\'Urbanisme)\n• Norme DTU 40 (couverture)\n• Assurance dommages-ouvrage recommandée'
      tendancesEsthetiques = '\n\n🏗️ Solutions modernes :\n• Tuiles photovoltaïques\n• Toiture végétalisée (écologique)\n• Ardoise naturelle (durable)\n• Zinc (moderne et longue durée)'
    }

    return `Voici votre estimation pour ${surface}m² de ${finalWorkType} :\n\n💰 Budget (${qualiteNom}) : ${min.toLocaleString('fr-FR')}€ - ${moyen.toLocaleString('fr-FR')}€ - ${max.toLocaleString('fr-FR')}€\n\n📊 Décomposition :\n• Main d'œuvre : ${Math.round(moyen * 0.55).toLocaleString('fr-FR')}€ (55%)\n• Matériaux : ${Math.round(moyen * 0.35).toLocaleString('fr-FR')}€ (35%)\n• Finitions : ${Math.round(moyen * 0.10).toLocaleString('fr-FR')}€ (10%)\n\n⏱ Délai : ${delaiSemaines} sem | 📍 ${postalCode} ${ajustementRegion > 1 ? '(+' + Math.round((ajustementRegion - 1) * 100) + '%)' : ''} | ⚙️ ${complexite}${conseilsSpecifiques}${aspectsReglementaires}${tendancesEsthetiques}\n\n💡 Conseils : Demandez 3 devis, vérifiez assurances, prévoyez +15% marge\n💸 Aides : MaPrimeRénov' (10k€), Éco-PTZ (50k€), TVA 5,5%\n📞 Prochaines étapes : Devis détaillés, vérif qualifications (RGE/Qualibat), planning\n\nBesoin d'autre chose ?`
  }

  // Messages de contexte
  if (/merci|thanks/i.test(lastMessage)) {
    return "De rien ! N'hésitez pas si vous avez d'autres questions ou besoin d'une nouvelle estimation."
  }

  if (/oui|ok|d'accord|dacord/i.test(lastMessage) && messages.length > 3) {
    return "Super ! Continuons alors. Que souhaitez-vous savoir d'autre ?"
  }

  // Fallback
  console.log('⚠️ [Demo] Fallback: Message par défaut')
  return "Je n'ai pas bien compris votre demande. Pouvez-vous reformuler ou me donner plus de détails sur votre projet de rénovation ?"
}
