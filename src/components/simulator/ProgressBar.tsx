interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  currentQuestion: number
  totalQuestions: number
}

export function ProgressBar({
  currentStep,
  totalSteps,
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) {
  const percentage = currentQuestion === 0 ? 0 : Math.round((currentQuestion / totalQuestions) * 100)

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          Question {currentQuestion + 1} sur {totalQuestions}
        </span>
        <span className="font-semibold text-blue-600">{percentage}% complété</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-orange-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Étape {currentStep} sur {totalSteps}
      </div>
    </div>
  )
}

