import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  variant?: 'default' | 'outline'
}

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const statusColorMap: Record<string, { bg: string; text: string }> = {
    'draft': { bg: 'bg-gray-100', text: 'text-gray-800' },
    'submitted': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'approved': { bg: 'bg-green-100', text: 'text-green-800' },
    'rejected': { bg: 'bg-red-100', text: 'text-red-800' },
    'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'pending approval': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'rf pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'rf approved': { bg: 'bg-green-100', text: 'text-green-800' },
    'active': { bg: 'bg-green-100', text: 'text-green-800' },
    'inactive': { bg: 'bg-gray-100', text: 'text-gray-800' },
    'due today': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'overdue': { bg: 'bg-red-100', text: 'text-red-800' },
    'low stock': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'out of stock': { bg: 'bg-red-100', text: 'text-red-800' },
  }

  const colors = statusColorMap[status.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        colors.bg,
        colors.text
      )}
    >
      {status}
    </span>
  )
}
