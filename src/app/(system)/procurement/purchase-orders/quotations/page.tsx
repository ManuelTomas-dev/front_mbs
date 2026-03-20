import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { QuotationsFilter } from '@/components/module/procurement/QuotationsFilter'
import { QuotationsListTable } from '@/components/module/procurement/QuotationsListTable'
import { mockQuotations, getQuotationStats } from '@/lib/mockData'

export default function QuotationsPage() {
  const stats = getQuotationStats()

  return (
    <main className="min-h-screen bg-gray-50">
      <BreadcrumbNav
        items={[
          { label: 'Procurement', href: '/procurement' },
          { label: 'Quotations' },
        ]}
      />

      <div className="px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Procurement — Quotations</h1>
        </div>

        {/* Filters */}
        <QuotationsFilter />

        {/* Quotations Table */}
        <QuotationsListTable quotations={mockQuotations} />

        {/* Attachments Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <span>📎</span> Attachments
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              📎 Attach specification
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              📄 Attach technical draw...
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              📋 Attach quotation documents
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
