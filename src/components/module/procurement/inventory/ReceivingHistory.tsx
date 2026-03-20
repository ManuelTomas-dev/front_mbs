import { ReceivingHistory } from '@/lib/types'

interface ReceivingHistoryProps {
  items: ReceivingHistory[]
}

export function ReceivingHistoryComponent({ items }: ReceivingHistoryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <h3 className="border-b border-gray-200 px-6 py-4 text-lg font-semibold text-gray-900">
        Receiving History
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                PO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">
                Warehouse
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.po}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.supplier}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Info */}
      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">4</span> Open Receipts
          <button className="ml-4 text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-orange-600">56</span>
          <span className="text-sm text-gray-600">Low Stock</span>
          <button className="ml-4 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
            View All
          </button>
        </div>
      </div>
    </div>
  )
}
