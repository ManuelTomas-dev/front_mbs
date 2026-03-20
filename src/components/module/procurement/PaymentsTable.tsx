'use client'

import Link from 'next/link'
import { Payment } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface PaymentsTableProps {
  payments: Payment[]
  onConfirmPayment?: (paymentId: string) => void
}

export function PaymentsTable({ payments, onConfirmPayment }: PaymentsTableProps) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">PO</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Supplier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Actions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">
                <Link
                  href={`#`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {payment.poNumber}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {payment.supplier}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {payment.supplier}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {payment.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })} {payment.currency}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {payment.dueDate}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={payment.status} />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onConfirmPayment?.(payment.id)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Confirm &gt;
                </button>
              </td>
              <td className="px-6 py-4 text-sm flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">📁</button>
                <button className="text-gray-400 hover:text-gray-600">+</button>
                <button className="text-gray-400 hover:text-gray-600">8</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination and summary */}
      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-orange-600">26</span>
            <span className="text-sm text-gray-600">Pending</span>
            <div className="ml-2 h-2 w-2 rounded-full bg-blue-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">4</span>
            <span className="text-sm text-gray-600">Due Today</span>
            <div className="ml-2 h-2 w-2 rounded-full bg-red-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-600">8</span>
            <span className="text-sm text-gray-600">Overdue</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">&lt;</button>
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
