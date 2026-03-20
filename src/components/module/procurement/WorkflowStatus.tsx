'use client'

interface WorkflowStep {
  name: string
  status: 'completed' | 'current' | 'pending'
}

interface WorkflowStatusProps {
  steps?: WorkflowStep[]
  currentStep?: string
}

export function WorkflowStatus({ currentStep = 'Request' }: WorkflowStatusProps) {
  const defaultSteps: WorkflowStep[] = [
    { name: 'Request', status: currentStep === 'Request' || currentStep === 'Request' ? 'completed' : currentStep === 'Request' ? 'current' : 'pending' },
    { name: 'RF Approval', status: currentStep === 'RF Approval' ? 'current' : 'pending' },
    { name: 'PO', status: currentStep === 'PO' ? 'current' : 'pending' },
    { name: 'Payment', status: currentStep === 'Payment' ? 'current' : 'pending' },
    { name: 'Closed', status: 'pending' },
  ]

  // Simplified status mapping
  const steps = defaultSteps.map((step, index) => {
    if (step.name === 'Request') {
      return { ...step, status: 'completed' as const }
    }
    if (step.name === 'RF Approval') {
      return { ...step, status: 'current' as const }
    }
    return { ...step, status: 'pending' as const }
  })

  return (
    <div className="py-8">
      <h3 className="mb-6 text-sm font-semibold text-gray-900">Workflow Status</h3>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                  step.status === 'completed'
                    ? 'border-green-500 bg-green-100 text-green-700'
                    : step.status === 'current'
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-300 bg-gray-100 text-gray-500'
                }`}
              >
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              <p className="mt-2 text-xs font-medium text-gray-700 text-center">
                {step.name}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  step.status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
