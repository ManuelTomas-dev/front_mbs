'use client'

import { Quotation } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface QuotationsTableProps {
  quotations: Quotation[]
}

export function QuotationsTable({ quotations }: QuotationsTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-700">
            ✓
          </span>
          Supplier Quotations
        </h3>
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Submit RF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Price (USD)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Delivery
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Warranty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quote, index) => (
              <tr key={quote.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{quote.supplier}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {quote.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{quote.delivery}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{quote.warranty}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg bg-blue-600 px-4 py-1 text-sm font-medium text-white hover:bg-blue-700">
                      ✓
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded">
                      📎 Attach specification
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded">
                      📄 Attach technical draw...
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded">
                      📋 Attach quotation documents
          </button>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Submit RF
        </button>
      </div>
    </div>
  )
}
