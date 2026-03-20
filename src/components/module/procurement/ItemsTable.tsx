'use client'

import { Plus } from 'lucide-react'
import { RequestItem } from '@/lib/types'

interface ItemsTableProps {
  items: RequestItem[]
  onAddItem?: () => void
  onUpdateItem?: (id: string, updated: Partial<RequestItem>) => void
  totalAmount?: number
}

export function ItemsTable({
  items,
  onAddItem,
  onUpdateItem,
  totalAmount,
}: ItemsTableProps) {
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-700">
            📦
          </span>
          Item Requested
        </h3>
        <button
          onClick={onAddItem}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Unit Price (USD)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700">
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.unitPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  {item.selectedPrice && (
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {item.selectedPrice.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-gray-200 px-6 py-4">
        <span className="text-sm text-gray-600">Subtotal:</span>
        <span className="text-lg font-bold text-gray-900">
          {totalAmount?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }) || `${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
        </span>
      </div>
    </div>
  )
}
