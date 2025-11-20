"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Camera, Loader2, CheckCircle, XCircle, Sparkles, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

interface AnalysisResult {
  workType: string
  roomType: string
  currentState: string
  estimatedArea: string
  materials: string[]
  recommendations: string[]
  estimatedBudget: {
    min: number
    max: number
    average: number
  }
  details: string
  confidence: string
}

export default function AnalyzePhotoPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Vérifier l'authentification (OBLIGATOIRE pour analyse photo)
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login?redirect=/analyse-photo')
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file)
    } else {
      setError('Veuillez sélectionner une image (JPG, PNG, WEBP)')
    }
  }

  const handleFileSelect = (file: File) => {
    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 10 MB')
      return
    }

    setSelectedFile(file)
    setError(null)
    setResult(null)

    // Créer une preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Convertir l'image en base64
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      
      reader.onloadend = async () => {
        const base64Image = reader.result as string

        const response = await fetch('/api/ai/analyze-photo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            fileName: selectedFile.name,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Erreur lors de l\'analyse')
        }

        const data = await response.json()
        setResult(data.analysis)
      }
    } catch (err: any) {
      console.error('Erreur analyse:', err)
      setError(err.message || 'Une erreur est survenue lors de l\'analyse')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-100/20 py-12">
      {/* Pattern décoratif */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99, 102, 241) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Analyse Photo IA 📸
          </h1>
          <p className="text-gray-600">
            Téléchargez une photo de votre espace et obtenez une estimation instantanée
          </p>
        </div>

        {/* Main Card */}
        <Card className="mx-auto max-w-4xl overflow-hidden bg-white/80 shadow-2xl backdrop-blur-sm">
          {!result ? (
            <div className="p-8">
              {/* Zone de drop */}
              {!previewUrl ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
                    isDragging
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-br from-purple-100 to-blue-100 p-6">
                      <Upload className="h-12 w-12 text-purple-600" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Glissez votre photo ici
                  </h3>
                  <p className="mb-6 text-sm text-gray-600">
                    ou cliquez pour sélectionner un fichier
                  </p>

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 text-base shadow-lg hover:shadow-xl"
                  >
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Choisir une photo
                  </Button>

                  <p className="mt-4 text-xs text-gray-500">
                    JPG, PNG ou WEBP • Max 10 MB
                  </p>
                </div>
              ) : (
                <>
                  {/* Preview de l'image */}
                  <div className="mb-6">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-auto w-full max-h-96 object-contain"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        📎 {selectedFile?.name}
                      </p>
                      <Button
                        onClick={resetAnalysis}
                        variant="outline"
                        size="sm"
                      >
                        Changer
                      </Button>
                    </div>
                  </div>

                  {/* Bouton d'analyse */}
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg shadow-lg hover:shadow-xl"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Analyser avec l'IA
                      </>
                    )}
                  </Button>
                </>
              )}

              {/* Erreur */}
              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
                  <XCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Info */}
              <div className="mt-8 rounded-xl bg-blue-50 p-6">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Conseils pour une meilleure analyse
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ Prenez une photo claire et bien éclairée</li>
                  <li>✅ Capturez l'ensemble de la pièce ou zone à rénover</li>
                  <li>✅ Évitez les photos floues ou trop sombres</li>
                  <li>✅ Incluez les éléments importants (murs, sol, plafond)</li>
                </ul>
              </div>
            </div>
          ) : (
            /* Résultats de l'analyse */
            <div className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Analyse terminée
                </h2>
                <Button onClick={resetAnalysis} variant="outline">
                  Nouvelle analyse
                </Button>
              </div>

              {/* Preview normale */}
              {previewUrl && (
                <div className="mb-6">
                  <img
                    src={previewUrl}
                    alt="Photo analysée"
                    className="h-auto w-full max-h-96 rounded-xl object-contain shadow-md"
                  />
                </div>
              )}

              {/* Résultats */}
              <div className="space-y-4">
                {/* Type de travaux */}
                <Card className="border-l-4 border-l-purple-600 bg-purple-50 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    🔧 Type de travaux détecté
                  </h3>
                  <p className="text-gray-700">{result.workType}</p>
                </Card>

                {/* Type de pièce */}
                <Card className="border-l-4 border-l-blue-600 bg-blue-50 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    🏠 Pièce identifiée
                  </h3>
                  <p className="text-gray-700">{result.roomType}</p>
                </Card>

                {/* État actuel */}
                <Card className="border-l-4 border-l-orange-600 bg-orange-50 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    📊 État actuel
                  </h3>
                  <p className="text-gray-700">{result.currentState}</p>
                </Card>

                {/* Surface estimée */}
                <Card className="border-l-4 border-l-green-600 bg-green-50 p-4">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    📏 Surface estimée
                  </h3>
                  <p className="text-gray-700">{result.estimatedArea}</p>
                </Card>

                {/* Matériaux détectés */}
                {result.materials.length > 0 && (
                  <Card className="bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      🧱 Matériaux détectés
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.materials.map((material, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Budget estimé */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    💰 Budget estimé
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Minimum</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {result.estimatedBudget.min.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Moyen</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {result.estimatedBudget.average.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Maximum</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {result.estimatedBudget.max.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">
                    Confiance de l'estimation : {result.confidence}
                  </p>
                </Card>

                {/* Recommandations */}
                {result.recommendations.length > 0 && (
                  <Card className="bg-blue-50 p-6">
                    <h3 className="mb-3 font-semibold text-gray-900">
                      💡 Recommandations
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-600">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Détails */}
                {result.details && (
                  <Card className="bg-gray-50 p-6">
                    <h3 className="mb-3 font-semibold text-gray-900">
                      📝 Analyse détaillée
                    </h3>
                    <p className="whitespace-pre-wrap text-sm text-gray-700">
                      {result.details}
                    </p>
                  </Card>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-3">
                <Button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/estimations/save-photo', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ result }),
                      })

                      const data = await response.json()

                      if (data.success) {
                        alert('✅ Analyse sauvegardée dans "Mes estimations" !')
                      } else {
                        alert('❌ Erreur lors de la sauvegarde: ' + data.error.message)
                      }
                    } catch (error) {
                      console.error('Erreur sauvegarde:', error)
                      alert('❌ Une erreur est survenue lors de la sauvegarde')
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  💾 Sauvegarder l'analyse
                </Button>
                <Button
                  onClick={resetAnalysis}
                  variant="outline"
                  className="flex-1"
                >
                  🔄 Nouvelle analyse
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

