import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'
import { CatalogStats } from '@/components/module/procurement/inventory/CatalogStats'
import { CatalogTable } from '@/components/module/procurement/inventory/CatalogTable'
import { LowStockPanel } from '@/components/module/procurement/inventory/LowStockPanel'
import { mockCatalogItems, mockLowStockItems, getCatalogStats } from '@/lib/mockData'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

export default function CatalogPage() {
  const stats = getCatalogStats()

  return (
    <main className="min-h-screen bg-gray-50">
      <BreadcrumbNav
        items={[
          { label: 'Catalog' },
        ]}
      />

      <div className="px-6 py-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Catalog</h1>

        {/* Stats Cards */}
        <CatalogStats
          totalItems={stats.totalItems}
          activeItems={stats.activeItems}
          inactiveItems={stats.inactiveItems}
          preferredSuppliers={stats.preferredSuppliers}
        />

        {/* Filters and Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div className="flex flex-1 gap-3">
            <FilterDropdown
              label="All Categories"
              options={[
                { id: 'all', label: 'All Categories' },
                { id: 'equipment', label: 'Equipment', count: 3 },
                { id: 'chemicals', label: 'Chemicals', count: 1 },
                { id: 'ppe', label: 'PPE', count: 1 },
              ]}
              defaultValue="all"
            />
            <FilterDropdown
              label="All Suppliers"
              options={[
                { id: 'all', label: 'All Suppliers' },
              ]}
              defaultValue="all"
            />
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              ⇄ (Swap icon)
            </button>
          </div>

          <div className="flex gap-3">
            <SearchInput placeholder="Search..." className="w-64" />
            <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
              CSV Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Catalog Table */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Catalog</h2>
            <CatalogTable items={mockCatalogItems} />
          </div>

          {/* Right Sidebar - Low Stock */}
          <div>
            <LowStockPanel items={mockLowStockItems} />
          </div>
        </div>
      </div>
    </main>
  )
}
