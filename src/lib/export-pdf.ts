import jsPDF from 'jspdf'

interface EstimationData {
  work_type_name: string
  estimation_min: number
  estimation_max: number
  estimation_moyen: number
  created_at: string
  details?: Array<{
    poste: string
    montant: number
    description?: string
  }>
  facteurs?: string[]
  conseils?: string[]
  delai?: string
}

export async function exportEstimationToPDF(estimation: EstimationData) {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  let yPosition = margin

  // Helper function to add text with wrapping
  const addText = (text: string, fontSize: number, isBold: boolean = false) => {
    pdf.setFontSize(fontSize)
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin)
    
    for (const line of lines) {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += fontSize * 0.4
    }
  }

  // En-tête
  pdf.setFillColor(59, 130, 246) // Bleu
  pdf.rect(0, 0, pageWidth, 40, 'F')
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.text('SimuTravaux', margin, 20)
  
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Estimation de travaux', margin, 30)
  
  pdf.setTextColor(0, 0, 0)
  yPosition = 55

  // Titre du projet
  addText(estimation.work_type_name, 20, true)
  yPosition += 5

  // Date
  const formattedDate = new Date(estimation.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  addText(`Estimation générée le ${formattedDate}`, 10, false)
  yPosition += 10

  // Prix principal
  pdf.setFillColor(239, 246, 255)
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'F')
  
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Prix moyen estimé', margin + 5, yPosition + 10)
  
  pdf.setFontSize(24)
  pdf.setTextColor(59, 130, 246)
  pdf.text(
    `${estimation.estimation_moyen.toLocaleString('fr-FR')} €`,
    margin + 5,
    yPosition + 22
  )
  
  pdf.setTextColor(0, 0, 0)
  yPosition += 40

  // Fourchette
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  addText(
    `Fourchette de prix : ${estimation.estimation_min.toLocaleString('fr-FR')} € - ${estimation.estimation_max.toLocaleString('fr-FR')} €`,
    12,
    false
  )
  yPosition += 10

  // Délai si disponible
  if (estimation.delai) {
    addText(`Durée estimée : ${estimation.delai}`, 12, false)
    yPosition += 10
  }

  // Décomposition des coûts
  if (estimation.details && estimation.details.length > 0) {
    yPosition += 5
    addText('Décomposition des coûts', 16, true)
    yPosition += 5

    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 5

    for (const detail of estimation.details) {
      if (yPosition > pageHeight - margin - 20) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text(detail.poste, margin, yPosition)
      
      pdf.setFont('helvetica', 'normal')
      pdf.text(
        `${detail.montant.toLocaleString('fr-FR')} €`,
        pageWidth - margin,
        yPosition,
        { align: 'right' }
      )
      
      yPosition += 6
    }

    // Total
    const total = estimation.details.reduce((sum, item) => sum + item.montant, 0)
    const tva = Math.round(total * 0.1)
    const totalTTC = total + tva

    yPosition += 3
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 7

    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    pdf.text('TVA (10%)', margin, yPosition)
    pdf.text(`${tva.toLocaleString('fr-FR')} €`, pageWidth - margin, yPosition, { align: 'right' })
    yPosition += 7

    pdf.setFont('helvetica', 'bold')
    pdf.text('Total TTC', margin, yPosition)
    pdf.text(`${totalTTC.toLocaleString('fr-FR')} €`, pageWidth - margin, yPosition, { align: 'right' })
    yPosition += 10
  }

  // Facteurs influençant le prix
  if (estimation.facteurs && estimation.facteurs.length > 0) {
    if (yPosition > pageHeight - margin - 50) {
      pdf.addPage()
      yPosition = margin
    }

    yPosition += 5
    addText('Facteurs influençant le prix', 14, true)
    yPosition += 3

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    for (const facteur of estimation.facteurs) {
      if (yPosition > pageHeight - margin - 10) {
        pdf.addPage()
        yPosition = margin
      }
      
      pdf.text('•', margin, yPosition)
      const lines = pdf.splitTextToSize(facteur, pageWidth - 2 * margin - 5)
      pdf.text(lines, margin + 5, yPosition)
      yPosition += lines.length * 5
    }
  }

  // Conseils
  if (estimation.conseils && estimation.conseils.length > 0) {
    if (yPosition > pageHeight - margin - 50) {
      pdf.addPage()
      yPosition = margin
    }

    yPosition += 5
    addText('Conseils personnalisés', 14, true)
    yPosition += 3

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    for (const conseil of estimation.conseils) {
      if (yPosition > pageHeight - margin - 10) {
        pdf.addPage()
        yPosition = margin
      }
      
      pdf.text('•', margin, yPosition)
      const lines = pdf.splitTextToSize(conseil, pageWidth - 2 * margin - 5)
      pdf.text(lines, margin + 5, yPosition)
      yPosition += lines.length * 5
    }
  }

  // Pied de page
  const totalPages = pdf.internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text(
      `SimuTravaux - Page ${i}/${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
    pdf.text(
      'Cette estimation est indicative. Pour un devis précis, consultez un professionnel.',
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center' }
    )
  }

  // Sauvegarder le PDF
  const filename = `estimation-${estimation.work_type_name.toLowerCase().replace(/\s+/g, '-')}-${new Date().getTime()}.pdf`
  pdf.save(filename)
}

