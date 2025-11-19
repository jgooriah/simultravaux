"use client"

import { type Question } from '@/types/questionnaire'

interface QuestionFieldProps {
  question: Question
  value: any
  onChange: (value: any) => void
  error?: string
}

export function QuestionField({ question, value, onChange, error }: QuestionFieldProps) {
  const renderField = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={question.placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        )

      case 'number':
        return (
          <div className="relative">
            <input
              type="number"
              placeholder={question.placeholder}
              value={value || ''}
              onChange={(e) => onChange(Number(e.target.value))}
              min={question.min}
              max={question.max}
              step={question.step}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {question.unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {question.unit}
              </span>
            )}
          </div>
        )

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Sélectionnez une option</option>
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                {option.priceImpact && ` (+${option.priceImpact === 'low' ? '€' : option.priceImpact === 'medium' ? '€€' : '€€€'})`}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50 ${
                  value === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{option.label}</span>
                    {option.priceImpact && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                        Impact: {option.priceImpact === 'low' ? 'Faible' : option.priceImpact === 'medium' ? 'Moyen' : 'Élevé'}
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p className="mt-1 text-sm text-gray-600">{option.description}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50"
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : []
                    if (e.target.checked) {
                      onChange([...currentValues, option.value])
                    } else {
                      onChange(currentValues.filter((v) => v !== option.value))
                    }
                  }}
                  className="mt-1 h-4 w-4 rounded text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{option.label}</span>
                    {option.priceImpact && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                        +{option.priceImpact === 'low' ? '€' : option.priceImpact === 'medium' ? '€€' : '€€€'}
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p className="mt-1 text-sm text-gray-600">{option.description}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={value || question.min}
              onChange={(e) => onChange(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.min}</span>
              <span className="font-semibold text-blue-600">
                {value || question.min}
                {question.unit && ` ${question.unit}`}
              </span>
              <span>{question.max}</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-lg font-semibold text-gray-900">
          {question.label}
          {question.required && <span className="ml-1 text-red-500">*</span>}
        </span>
        {question.description && (
          <span className="mt-1 block text-sm text-gray-600">{question.description}</span>
        )}
      </label>
      {renderField()}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

