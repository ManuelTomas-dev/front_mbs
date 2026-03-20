import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { InventoryStats } from '@/components/module/procurement/inventory/InventoryStats'
import { InventoryItemsTable } from '@/components/module/procurement/inventory/InventoryItemsTable'
import { LowStockPanel } from '@/components/module/procurement/inventory/LowStockPanel'
import { ReceivingHistoryComponent } from '@/components/module/procurement/inventory/ReceivingHistory'
import {
  mockInventoryItems,
  mockLowStockItems,
  mockReceivingHistory,
  getInventoryStats,
} from '@/lib/mockData'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

export default function InventoryPage() {
  const stats = getInventoryStats()

  return (
    <main className="min-h-screen bg-gray-50 container mx-auto max-w-360">
      <BreadcrumbNav
        items={[
          { label: 'Inventory' },
        ]}
      />

      <div className="px-6 py-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Inventory</h1>

        {/* Stats Cards */}
        <InventoryStats
          totalItems={stats.totalItems}
          lowStock={stats.lowStock}
          outOfStock={stats.outOfStock}
          warehouseValue={stats.warehouseValue}
        />

        {/* Filters and Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div className="flex flex-1 gap-3">
            <FilterDropdown
              label="Peyena"
              options={[
                { id: 'all', label: 'Peyena' },
              ]}
              defaultValue="all"
            />
            <FilterDropdown
              label="All Categories"
              options={[
                { id: 'all', label: 'All Categories' },
              ]}
              defaultValue="all"
            />
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Show comimed
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              ↓ Save +to
            </button>
          </div>

          <div className="flex gap-3">
            <SearchInput placeholder="Search..." className="w-64" />
            <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
              CSV Export
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Side - Inventory Items and Receiving History */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Inventory Items</h2>
              <InventoryItemsTable items={mockInventoryItems} />
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Receiving History</h2>
              <ReceivingHistoryComponent items={mockReceivingHistory} />
            </div>
          </div>

          {/* Right Side - Low Stock Alerts */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Low Stock</h2>
              <LowStockPanel items={mockLowStockItems} />
            </div>

            {/* Additional Low Stock Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Low Stock</h3>
                <span className="text-sm font-semibold text-orange-600">56 Items</span>
              </div>
              <div className="space-y-3">
                {mockLowStockItems.slice(0, 2).map((item, index) => (
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
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700">
                View All →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
