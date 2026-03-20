'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TabItem {
  label: string
  href: string
  id: string
}

interface TabNavigationProps {
  tabs: TabItem[]
  baseSegment?: string
}

export function TabNavigation({ tabs, baseSegment = 'procurement' }: TabNavigationProps) {
  const pathname = usePathname()

  const isTabActive = (href: string) => {
    return pathname.includes(href.split('/').pop() || '')
  }

  return (
    <div className="border-b border-gray-200 bg-white px-6">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              'relative py-4 text-sm font-medium transition-colors',
              isTabActive(tab.href)
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
            {isTabActive(tab.href) && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
