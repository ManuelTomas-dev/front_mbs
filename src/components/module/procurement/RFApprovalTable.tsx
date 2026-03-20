'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { RFApproval } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface RFApprovalTableProps {
  rfApprovals: RFApproval[]
}

export function RFApprovalTable({ rfApprovals }: RFApprovalTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">RF</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Request
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Supplier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Total Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Requested
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rfApprovals.map((rf) => (
            <tr key={rf.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">
                <Link
                  href={`/procurement/rf-approval/${rf.id}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {rf.rfNumber}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {rf.requestNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {rf.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {rf.supplier}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                ${rf.totalAmount.toLocaleString('en-US')} {rf.currency}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={rf.state} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {rf.requestedDate}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
                <Link href={`/procurement/rf-approval/${rf.id}`}>
                  <span className="inline-flex items-center gap-1">
                    RF <ChevronRight size={16} />
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">
          {rfApprovals.length} RFs Pending
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">&lt;</button>
          <button className="h-9 w-9 rounded-lg bg-blue-600 text-white text-sm font-medium">
            1
          </button>
          <button className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">&gt;</button>
          <button className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">&gt;&gt;</button>
        </div>
      </div>
    </div>
  )
}
