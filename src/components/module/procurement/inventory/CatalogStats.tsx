import { StatCard } from '@/components/common/StatCard'

interface CatalogStatsProps {
  totalItems: number
  activeItems: number
  inactiveItems: number
  preferredSuppliers: number
}

export function CatalogStats({
  totalItems,
  activeItems,
  inactiveItems,
  preferredSuppliers,
}: CatalogStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-blue-600">{totalItems.toLocaleString()}</p>
        <p className="mt-2 text-sm text-gray-600">Total Items</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-green-600">{activeItems.toLocaleString()}</p>
        <p className="mt-2 text-sm text-gray-600">Active Items</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-gray-600">{inactiveItems}</p>
        <p className="mt-2 text-sm text-gray-600">Inactive Items</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-3xl font-bold text-orange-600">{preferredSuppliers}</p>
        <p className="mt-2 text-sm text-gray-600">Preferred Suppliers</p>
      </div>
    </div>
  )
}
