"use client"

import { useState, useEffect } from 'react'
import { X, Share2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareModalProps {
  estimationId: string
  estimationName: string
  onClose: () => void
}

export function ShareModal({
  estimationId,
  estimationName,
  onClose,
}: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState<string>('')
  const [expiresInDays, setExpiresInDays] = useState<number>(7)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    // Bloquer le scroll du body quand le modal est ouvert
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleGenerateLink = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch('/api/estimations/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estimationId,
          expiresInDays: expiresInDays > 0 ? expiresInDays : null,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setShareUrl(result.data.share_url)
      } else {
        alert('❌ Erreur lors de la génération du lien de partage')
      }
    } catch (error) {
      console.error('Erreur génération lien:', error)
      alert('❌ Une erreur est survenue')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Partager l'estimation</h2>
              <p className="mt-1 text-sm text-gray-600">{estimationName}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6 space-y-4">
            {!shareUrl ? (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Durée de validité du lien
                  </label>
                  <select
                    value={expiresInDays}
                    onChange={(e) => setExpiresInDays(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="1">1 jour</option>
                    <option value="7">7 jours</option>
                    <option value="30">30 jours</option>
                    <option value="0">Sans limite</option>
                  </select>
                </div>

                <Button
                  onClick={handleGenerateLink}
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Génération...
                    </>
                  ) : (
                    <>
                      <Share2 className="mr-2 h-4 w-4" />
                      Générer le lien de partage
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Lien de partage (cliquez pour copier)
                  </label>
                  <div
                    onClick={handleCopy}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100"
                  >
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                    />
                    {isCopied ? (
                      <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                  ✅ Lien de partage généré avec succès !
                  {expiresInDays > 0 && ` Valable ${expiresInDays} jour${expiresInDays > 1 ? 's' : ''}.`}
                </div>

                <Button onClick={onClose} variant="outline" className="w-full">
                  Fermer
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

