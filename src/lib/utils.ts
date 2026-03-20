import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




// Formatting utilities
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value)
}

export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return date
  }
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Status colors
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    'draft': 'bg-gray-100 text-gray-800',
    'submitted': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'pending approval': 'bg-yellow-100 text-yellow-800',
    'rf pending': 'bg-yellow-100 text-yellow-800',
    'rf approved': 'bg-green-100 text-green-800',
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'due today': 'bg-blue-100 text-blue-800',
    'overdue': 'bg-red-100 text-red-800',
    'low stock': 'bg-yellow-100 text-yellow-800',
    'out of stock': 'bg-red-100 text-red-800',
  }
  return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

// Sorting utilities
export function sortByDate(items: any[], dateField: string, order: 'asc' | 'desc' = 'desc') {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField]).getTime()
    const dateB = new Date(b[dateField]).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

export function sortByNumber(items: any[], field: string, order: 'asc' | 'desc' = 'asc') {
  return [...items].sort((a, b) => {
    const valA = a[field] || 0
    const valB = b[field] || 0
    return order === 'asc' ? valA - valB : valB - valA
  })
}

// Search utilities
export function searchItems(items: any[], query: string, fields: string[]): any[] {
  if (!query) return items
  const lowerQuery = query.toLowerCase()
  return items.filter((item) =>
    fields.some((field) =>
      String(item[field]).toLowerCase().includes(lowerQuery)
    )
  )
}

// Pagination
export function paginate<T>(items: T[], page: number, pageSize: number = 10): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export function getTotalPages(total: number, pageSize: number = 10): number {
  return Math.ceil(total / pageSize)
}
