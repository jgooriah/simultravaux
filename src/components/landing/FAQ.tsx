const faqs = [
  {
    question: 'Est-ce vraiment gratuit ?',
    answer:
      'Oui. SimuTravaux est totalement gratuit et sans engagement. Utilisez-le autant de fois que nécessaire.',
  },
  {
    question: 'Quelle est la précision des estimations ?',
    answer:
      'Nos fourchettes sont basées sur des données marché 2025 et les informations que vous fournissez. Elles servent de base solide avant les devis artisans.',
  },
  {
    question: 'Puis-je sauvegarder mes estimations ?',
    answer:
      'La sauvegarde arrive bientôt. En attendant, vous pouvez exporter les résultats et les partager facilement.',
  },
  {
    question: 'Comment sont calculés les prix ?',
    answer:
      'Nous combinons vos réponses, les coefficients régionaux et les tendances prix par type de travaux pour obtenir un résultat réaliste.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Questions fréquentes
          </p>
          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Tout ce que vous devez savoir
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Une question ? Nous y répondons en toute transparence.
          </p>
        </div>

        <div className="mx-auto max-w-4xl divide-y divide-gray-200 rounded-2xl bg-white shadow">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left text-lg font-medium text-gray-900">
                {faq.question}
                <span className="text-blue-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}


