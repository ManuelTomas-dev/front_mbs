import { LowStockItem } from '@/lib/types'
import { StatusBadge } from '@/components/common/StatusBadge'

interface LowStockPanelProps {
  items: LowStockItem[]
}

export function LowStockPanel({ items }: LowStockPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">Low Stock</span>
        <span className="text-sm font-semibold text-gray-600">{items.length} Items</span>
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-600">
                {item.warehouse} • {item.onHand} {item.unit}
              </p>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  )
}
