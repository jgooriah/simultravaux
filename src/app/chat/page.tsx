"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Loader2, Bot, User, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isWelcome?: boolean
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  lastMessageAt: number
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Bonjour ! Je suis votre assistant IA 👋\n\nDécrivez-moi votre projet de rénovation et je vous aiderai à obtenir une estimation précise et personnalisée.",
  isWelcome: true,
}

// Fonction pour nettoyer le markdown
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // Enlever **texte**
    .replace(/\*(.+?)\*/g, '$1')     // Enlever *texte*
    .replace(/#{1,6}\s/g, '')        // Enlever ### titres
    .replace(/`(.+?)`/g, '$1')       // Enlever `code`
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const [isUserScrolling, setIsUserScrolling] = useState(false)

  // Charger les chats depuis localStorage au démarrage
  useEffect(() => {
    const savedChats = localStorage.getItem('chat-conversations')
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats)
        setChats(parsed)
        // Charger le dernier chat actif
        if (parsed.length > 0) {
          const lastChat = parsed[parsed.length - 1]
          setCurrentChatId(lastChat.id)
          setMessages(lastChat.messages)
        }
      } catch (e) {
        console.error('Erreur chargement chats:', e)
      }
    }
  }, [])

  // Sauvegarder le chat actuel
  useEffect(() => {
    if (currentChatId && messages.length > 1) {
      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages,
              lastMessageAt: Date.now(),
              title: generateChatTitle(messages),
            }
          : chat
      )
      setChats(updatedChats)
      localStorage.setItem('chat-conversations', JSON.stringify(updatedChats))
    }
  }, [messages, currentChatId])

  // Générer un titre pour le chat basé sur le premier message utilisateur
  const generateChatTitle = (msgs: Message[]): string => {
    const firstUserMsg = msgs.find((m) => m.role === 'user')
    if (firstUserMsg) {
      return firstUserMsg.content.substring(0, 30) + '...'
    }
    return 'Nouvelle conversation'
  }

  // Créer un nouveau chat
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Nouvelle conversation',
      messages: [INITIAL_MESSAGE],
      createdAt: Date.now(),
      lastMessageAt: Date.now(),
    }
    const updatedChats = [...chats, newChat]
    setChats(updatedChats)
    setCurrentChatId(newChat.id)
    setMessages([INITIAL_MESSAGE])
    localStorage.setItem('chat-conversations', JSON.stringify(updatedChats))
    setShowSidebar(false)
  }

  // Charger un chat existant
  const loadChat = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId)
    if (chat) {
      setCurrentChatId(chatId)
      setMessages(chat.messages)
      setShowSidebar(false)
    }
  }

  // Supprimer un chat
  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter((c) => c.id !== chatId)
    setChats(updatedChats)
    localStorage.setItem('chat-conversations', JSON.stringify(updatedChats))
    
    if (currentChatId === chatId) {
      if (updatedChats.length > 0) {
        loadChat(updatedChats[updatedChats.length - 1].id)
      } else {
        createNewChat()
      }
    }
  }

  // Initialiser le premier chat si nécessaire
  useEffect(() => {
    if (chats.length === 0 && !currentChatId) {
      createNewChat()
    }
  }, [])

  // Détecter si l'utilisateur est en bas de la page
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50

      // Afficher le bouton uniquement si l'utilisateur n'est pas en bas
      if (!isAtBottom) {
        setIsUserScrolling(true)
        setShouldAutoScroll(false)
      } else {
        setIsUserScrolling(false)
        setShouldAutoScroll(true)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus automatique sur l'input au chargement uniquement
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    // Ajouter le message utilisateur
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)

    try {
      console.log('🔵 [Chat Client] Envoi de', newMessages.length, 'messages')
      setError(null) // Réinitialiser l'erreur
      
      // Appeler l'API de chat
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      console.log('📡 [Chat Client] Réponse reçue, status:', response.status)

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Le serveur rencontre un problème. Veuillez réessayer dans quelques instants.')
        } else if (response.status === 429) {
          throw new Error('Trop de requêtes. Veuillez patienter un moment avant de réessayer.')
        } else {
          throw new Error(`Erreur de connexion (${response.status}). Vérifiez votre connexion internet.`)
        }
      }

      // Lire le stream de réponse
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('Impossible de lire la réponse')
      }

      console.log('📖 [Chat Client] Lecture du stream...')

      // Créer un message assistant vide
      let assistantMessage = ''
      setMessages([...newMessages, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          console.log('✅ [Chat Client] Stream terminé')
          break
        }

        // Décoder le chunk
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()

            if (data === '[DONE]') {
              console.log('🏁 [Chat Client] Signal DONE reçu')
              break
            }

            if (!data) continue

            try {
              const parsed = JSON.parse(data)

              if (parsed.error) {
                console.error('❌ [Chat Client] Erreur API:', parsed.error)
                // Afficher l'erreur comme un message normal
                assistantMessage = `❌ Erreur: ${parsed.error}`
                setMessages([
                  ...newMessages,
                  { role: 'assistant', content: assistantMessage },
                ])
                continue // Continuer à lire le stream
              }

              if (parsed.text) {
                assistantMessage += parsed.text
                setMessages([
                  ...newMessages,
                  { role: 'assistant', content: assistantMessage },
                ])
              }
            } catch (e) {
              console.warn('⚠️ [Chat Client] Erreur parsing ligne:', data.substring(0, 50))
            }
          }
        }
      }

      console.log('✅ [Chat Client] Message complet reçu')
    } catch (error: any) {
      console.error('❌ [Chat Client] Erreur:', error)
      
      const errorMessage = error.message || "Une erreur s'est produite"
      setError(errorMessage)
      
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            `❌ **Erreur de connexion**\n\n${errorMessage}\n\n💡 **Que faire ?**\n• Vérifiez votre connexion internet\n• Réessayez dans quelques instants\n• Si le problème persiste, rechargez la page\n\nVotre message précédent a été sauvegardé, vous pouvez simplement le renvoyer.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Questions suggérées
  const suggestedQuestions = [
    "Je veux rénover ma cuisine",
    "Refaire ma salle de bain",
    "Peindre mon appartement",
    "Isoler mes combles",
  ]

  return (
    <>
      {/* Background avec pattern moderne */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-100/20">
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99, 102, 241) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        {/* Sidebar Historique */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 transform border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
            <div className="flex h-full flex-col">
                {/* Header Sidebar */}
                <div className="border-b border-gray-200 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold text-gray-900">Historique</h2>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="rounded-lg p-1 hover:bg-gray-100"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <Button
                    onClick={createNewChat}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm py-2"
                  >
                    <svg className="mr-2 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nouveau chat
                  </Button>
                </div>

                {/* Liste des chats */}
                <div className="flex-1 overflow-y-auto p-3">
              {chats.length === 0 ? (
                <p className="text-center text-xs text-gray-500">Aucun historique</p>
              ) : (
                <div className="space-y-1.5">
                  {chats
                    .slice()
                    .reverse()
                    .map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative rounded-lg border p-2 transition-all ${
                          chat.id === currentChatId
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <button
                          onClick={() => loadChat(chat.id)}
                          className="w-full text-left pr-6"
                        >
                          <p className="truncate text-xs font-medium text-gray-900">
                            {chat.title}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {new Date(chat.lastMessageAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                          </p>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm('Supprimer cette conversation ?')) {
                              deleteChat(chat.id)
                            }
                          }}
                          className="absolute right-1.5 top-1.5 rounded p-0.5 opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100"
                        >
                          <svg className="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main Content - Card Centrée */}
        <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
          <Card className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-gray-200 bg-white/80 shadow-2xl backdrop-blur-sm">
            {/* Header Moderne */}
            <header className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-purple-50/50 to-blue-50/50 px-6 py-4" role="banner">
              <div className="flex items-center justify-between">
                {/* Bouton Menu */}
                <button
                  onClick={() => setShowSidebar(true)}
                  className="rounded-lg p-2 transition-colors hover:bg-white/60"
                  aria-label="Ouvrir l'historique"
                >
                  <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Titre Central */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg" aria-hidden="true">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-gray-900">
                      Assistant IA Rénovation
                    </h1>
                    <p className="text-xs text-gray-600">
                      Expert SimuTravaux • Disponible 24/7
                    </p>
                  </div>
                </div>
                
                {/* Bouton Nouveau Chat */}
                <button
                  onClick={createNewChat}
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                  aria-label="Nouveau chat"
                >
                  + Nouveau
                </button>
              </div>
            </header>

            {/* Messages Container */}
            <div className="flex flex-1 flex-col overflow-hidden">
            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {messages.map((message, index) => {
                // Message de bienvenue spécial
                if (message.isWelcome && message.role === 'assistant') {
                  return (
                    <div key={index} className="flex flex-col items-center justify-center py-12">
                      {/* Icône centrale */}
                      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                          <Bot className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      
                      {/* Message de bienvenue */}
                      <h2 className="mb-2 text-center text-xl font-bold text-gray-900">
                        Bonjour ! Je suis votre assistant IA 👋
                      </h2>
                      <p className="mb-6 max-w-md text-center text-sm text-gray-600">
                        Décrivez-moi votre projet de rénovation et je vous aiderai à obtenir une estimation précise et personnalisée.
                      </p>
                      
                      {/* Suggestions */}
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => {
                            setInput("Je veux rénover ma salle de bain")
                            inputRef.current?.focus()
                          }}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-400 hover:bg-blue-50"
                        >
                          💧 Salle de bain
                        </button>
                        <button
                          onClick={() => {
                            setInput("Je veux rénover ma cuisine")
                            inputRef.current?.focus()
                          }}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-400 hover:bg-blue-50"
                        >
                          🍳 Cuisine
                        </button>
                        <button
                          onClick={() => {
                            setInput("Je veux repeindre mon appartement")
                            inputRef.current?.focus()
                          }}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-400 hover:bg-blue-50"
                        >
                          🎨 Peinture
                        </button>
                      </div>
                    </div>
                  )
                }
                
                // Messages normaux
                return (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-md">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <Card
                      className={`max-w-[75%] p-4 shadow-md transition-all ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
                          : 'border border-gray-200 bg-white text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{cleanMarkdown(message.content)}</p>
                    
                    {/* Bouton Sauvegarder pour les estimations */}
                    {message.role === 'assistant' && (message.content.includes('Budget') || message.content.includes('budget') || message.content.includes('€')) && message.content.length > 200 && (
                      <div className="mt-3 flex gap-2 border-t border-gray-200 pt-3">
                        <Button
                          onClick={async () => {
                            try {
                              const response = await fetch('/api/estimations/save-chat', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  content: message.content,
                                  chatId: currentChatId,
                                }),
                              })

                              const result = await response.json()

                              if (result.success) {
                                alert('✅ Estimation sauvegardée dans "Mes estimations" !')
                              } else {
                                if (result.error.code === 'UNAUTHORIZED') {
                                  alert('❌ Vous devez être connecté pour sauvegarder')
                                  window.location.href = '/login?redirect=/chat'
                                } else {
                                  alert('❌ Erreur lors de la sauvegarde: ' + result.error.message)
                                }
                              }
                            } catch (error) {
                              console.error('Erreur sauvegarde:', error)
                              alert('❌ Une erreur est survenue lors de la sauvegarde')
                            }
                          }}
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 py-2 text-sm font-medium text-white shadow-md hover:from-green-700 hover:to-emerald-700 hover:shadow-lg"
                        >
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          💾 Sauvegarder
                        </Button>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(message.content)
                            alert('✅ Copié dans le presse-papier !')
                          }}
                          variant="outline"
                          className="flex-1 py-2 text-sm font-medium"
                        >
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          📋 Copier
                        </Button>
                      </div>
                    )}
                  </Card>

                    {message.role === 'user' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex gap-3" role="status" aria-live="polite" aria-label="L'assistant IA est en train de répondre">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <Card className="border border-purple-100 bg-white p-3 shadow-md">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-sm text-gray-600">L'IA réfléchit...</span>
                    </div>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bouton "Descendre" quand l'utilisateur a scrollé vers le haut */}
            {isUserScrolling && messages.length > 2 && (
              <div className="mb-3 flex justify-center px-6">
                <button
                  onClick={() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
                >
                  <span>Nouveaux messages</span>
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Input Form - Fixed Bottom */}
            <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-gray-200 bg-gradient-to-r from-gray-50/50 to-gray-100/50 px-6 py-4">
              <label htmlFor="chat-input" className="sr-only">
                Message pour l'assistant IA
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <textarea
                    id="chat-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="💬 Décrivez votre projet de rénovation..."
                    aria-label="Tapez votre question sur vos travaux de rénovation"
                    aria-describedby="chat-help"
                    aria-required="true"
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
                    rows={2}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-auto rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 px-6 shadow-md transition-all hover:shadow-lg disabled:opacity-50"
                  aria-label={isLoading ? 'Envoi en cours' : 'Envoyer le message'}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </div>
              <div id="chat-help" className="mt-2 text-xs text-gray-500">
                <p>Appuyez sur <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs">Entrée</kbd> pour envoyer</p>
              </div>
            </form>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}

