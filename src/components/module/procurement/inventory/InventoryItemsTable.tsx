'use client'

import { InventoryItem } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface InventoryItemsTableProps {
  items: InventoryItem[]
}

export function InventoryItemsTable({ items }: InventoryItemsTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Stock ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Stock ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Warehouse
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              On Hand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Unit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.itemNumber}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {item.stockId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.stockId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.warehouse}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {item.onHand}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.unit}
              </td>
              <td className="px-6 py-4 text-sm">
                <button className="text-gray-400 hover:text-gray-600">⋯</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination and Info */}
      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">4</span> Open Receipts
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
