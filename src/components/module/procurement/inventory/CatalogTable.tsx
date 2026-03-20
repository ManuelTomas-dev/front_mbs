'use client'

import { CatalogItem } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface CatalogTableProps {
  items: CatalogItem[]
}

export function CatalogTable({ items }: CatalogTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Image...
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Supplier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Active
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
              Unit Price
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
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
              </td>
              <td className="px-6 py-4">
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  {item.name}
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.supplier}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {item.active === 'Active' ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    {item.active}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                ${item.unitPrice.toLocaleString()} {item.currency}
              </td>
              <td className="px-6 py-4 text-sm">
                {item.actions || '—'}
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
