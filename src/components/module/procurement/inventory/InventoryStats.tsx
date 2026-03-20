import { StatCard } from '@/components/common/StatCard'
import { formatCurrency } from '@/lib/utils'

interface InventoryStatsProps {
  totalItems: number
  lowStock: number
  outOfStock: number
  warehouseValue: number
}

export function InventoryStats({
  totalItems,
  lowStock,
  outOfStock,
  warehouseValue,
}: InventoryStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-blue-600">{totalItems.toLocaleString()}</p>
        <p className="mt-2 text-sm text-gray-600">Total Items</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-orange-600">{lowStock}</p>
        <p className="mt-2 text-sm text-gray-600">Low Stock Items</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-red-600">{outOfStock}</p>
        <p className="mt-2 text-sm text-gray-600">Out of Stock Items</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-2xl font-bold text-green-600">
          {formatCurrency(warehouseValue, 'USD')}
        </p>
        <p className="mt-2 text-sm text-gray-600">Warehouse Value</p>
      </div>
    </div>
  )
}
