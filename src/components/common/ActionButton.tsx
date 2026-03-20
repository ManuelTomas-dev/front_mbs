import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ActionButtonProps {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  disabled?: boolean
  className?: string
}

export function ActionButton({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className,
}: ActionButtonProps) {
  const variantMap = {
    'primary': 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    'secondary': 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-400',
    'danger': 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    'success': 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400',
    'outline': 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-400',
  }

  const sizeMap = {
    'sm': 'px-3 py-1 text-sm',
    'md': 'px-4 py-2 text-sm',
    'lg': 'px-6 py-3 text-base',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-medium transition-colors',
        variantMap[variant],
        sizeMap[size],
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {icon}
      {label}
    </button>
  )
}
