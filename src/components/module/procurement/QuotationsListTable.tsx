'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Quotation } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface QuotationsListTableProps {
  quotations: Quotation[]
}

export function QuotationsListTable({ quotations }: QuotationsListTableProps) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Quotation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Request
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                RF Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                PO Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Valid Until
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quote) => (
              <tr key={quote.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link
                    href={`/procurement/quotations/${quote.id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {quote.quotationNumber}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {quote.requestNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {quote.supplier}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {quote.amount.toLocaleString('en-US')} {quote.currency}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={quote.rfStatus} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {quote.poStatus ? (
                    <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                      {quote.poStatus}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {quote.validUntil}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  <Link href={`/procurement/quotations/${quote.id}`}>
                    <span className="inline-flex items-center gap-1">
                      RF <ChevronRight size={16} />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">25</span>
            <span className="text-sm text-gray-600">Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-lg font-bold text-blue-600">10</span>
            <span className="text-sm text-gray-600">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-600">5</span>
            <span className="text-sm text-gray-600">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
