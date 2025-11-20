import { NextRequest } from 'next/server'
import OpenAI from 'openai'

// Configuration OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null

console.log('🤖 [Chat API Config]', openai ? '✅ OPENAI GPT-4 ACTIVÉ' : '⚠️ MODE DÉMO')

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

// Fonction de démo (backup si pas de clé OpenAI)
function generateDemoResponse(messages: any[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  
  // Détection des informations
  const surfaceMatch = lastMessage.match(/(\d{1,4})\s*(?:m2|m²|metre|mètre)/i)
  const postalMatch = lastMessage.match(/\b(\d{5})\b/)
  
  // Message de bienvenue
  if (messages.length === 1) {
    return "Bonjour ! Je suis votre assistant rénovation. Quel type de travaux souhaitez-vous réaliser ? (cuisine, salle de bain, peinture, etc.)"
  }
  
  // Logique simplifiée
  if (lastMessage.includes('cuisine')) {
    return "Parfait ! Quelle est la surface de votre cuisine en m² ?"
  }
  
  if (surfaceMatch) {
    const surface = parseInt(surfaceMatch[1])
    return `D'accord, ${surface}m². Quelle qualité de finition souhaitez-vous ?\n\n• Économique (~400€/m²)\n• Standard (~600€/m²)\n• Premium (~900€/m²)`
  }
  
  if (lastMessage.includes('standard') || lastMessage.includes('premium') || lastMessage.includes('économique')) {
    return "Excellent choix ! Quel est votre code postal pour affiner l'estimation ?"
  }
  
  if (postalMatch) {
    return `💰 Budget estimé : 8 000 € - 12 000 € - 18 000 €\n📊 Main d'œuvre 55% | Matériaux 35% | Finitions 10%\n⏱ Délai : 3-4 semaines\n🔧 Conseils : Comparez 3 devis, prévoirez +15%`
  }
  
  return "Je n'ai pas bien compris. Pouvez-vous préciser votre projet de rénovation ?"
}

export async function POST(request: NextRequest) {
  console.log('🔵 [Chat API] Requête reçue')
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const body = await request.json()
        const { messages } = body

        console.log('📩 [Chat API] Messages reçus:', messages?.length)

        if (!messages || messages.length === 0) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: 'Aucun message reçu' })}\n\n`)
          )
          controller.close()
          return
        }

        // Mode OpenAI GPT-4
        if (openai) {
          console.log('✅ [OpenAI] Appel à GPT-4o...')
          
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.map((m: any) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            temperature: 0.7,
            max_tokens: 500,
            stream: true,
          })

          console.log('📡 [OpenAI] Stream démarré')

          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`)
              )
            }
          }

          console.log('✅ [OpenAI] Réponse complète')
        } else {
          // Mode démo
          console.log('🎯 [Demo Mode] Génération de réponse...')
          const response = generateDemoResponse(messages)
          
          // Simuler un stream
          for (let i = 0; i < response.length; i += 5) {
            const chunk = response.slice(i, i + 5)
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`)
            )
            await new Promise(resolve => setTimeout(resolve, 20))
          }
          
          console.log('✅ [Demo] Réponse envoyée')
        }

        controller.close()
      } catch (error: any) {
        console.error('❌ [Chat API] ERREUR:', error)
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ 
              error: `Erreur: ${error.message || 'Une erreur est survenue'}` 
            })}\n\n`
          )
        )
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
