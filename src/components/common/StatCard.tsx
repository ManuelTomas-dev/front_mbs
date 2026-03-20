import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  color?: 'blue' | 'green' | 'orange' | 'red' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

export function StatCard({ label, value, color = 'default', size = 'md' }: StatCardProps) {
  const colorMap = {
    'blue': 'text-blue-600',
    'green': 'text-green-600',
    'orange': 'text-orange-600',
    'red': 'text-red-600',
    'default': 'text-gray-900',
  }

  const sizeMap = {
    'sm': { value: 'text-2xl', label: 'text-sm' },
    'md': { value: 'text-3xl', label: 'text-base' },
    'lg': { value: 'text-4xl', label: 'text-lg' },
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <p className={cn('text-gray-600', sizeMap[size].label)}>{label}</p>
      <p className={cn('mt-2 font-semibold', colorMap[color], sizeMap[size].value)}>
        {value}
      </p>
    </div>
  )
}
