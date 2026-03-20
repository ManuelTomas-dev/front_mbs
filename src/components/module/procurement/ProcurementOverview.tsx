'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { RequestOverviewItem } from '@/lib/types'

interface OverviewSection {
  title: string
  count: number
  color: string
  items: RequestOverviewItem[]
  viewAllLink?: string
}

interface ProcurementOverviewProps {
  sections: OverviewSection[]
}

export function ProcurementOverview({ sections }: ProcurementOverviewProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Procurement Overview</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <h3 className="mb-4 text-sm font-medium text-gray-600">
              {section.title}
              <span className="ml-2 font-semibold text-gray-900">{section.count}</span>
            </h3>
            <div className="space-y-2">
              {section.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between rounded-md bg-gray-50 p-3 text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.requestNumber}</p>
                    <p className="text-xs text-gray-600">{item.item || item.amount}</p>
                  </div>
                  {item.status && (
                    <span className="ml-2 inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      {item.status}
                    </span>
                  )}
                  {item.date && <p className="ml-2 text-xs text-gray-500">{item.date}</p>}
                </div>
              ))}
            </div>
            {section.viewAllLink && (
              <Link
                href={section.viewAllLink}
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
