import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { SearchInput } from '@/components/common/SearchInput'
import { FilterDropdown } from '@/components/common/FilterDropdown'

import { mockPayments, getPaymentStats } from '@/lib/mockData'
import { PaymentStatusCards } from '@/components/module/procurement/PaymentStatusCards'
import { PaymentsTable } from '@/components/module/procurement/PaymentsTable'
import { PaymentProofUpload } from '@/components/module/procurement/PaymentProofUpload'

export default function PaymentsPage() {
  const stats = getPaymentStats()

  return (
    <main className="min-h-screen bg-gray-50 container mx-auto max-w-360">
      <BreadcrumbNav
        items={[
          { label: 'Procurement', href: '/procurement' },
          { label: 'Payments' },
        ]}
      />

      <div className="px-6 py-6">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Payments</h1>

        {/* Status Cards */}
        <PaymentStatusCards
          pending={stats.pending}
          dueToday={stats.dueToday}
          overdue={stats.overdue}
          totalPaid={stats.totalPaidThisMonth}
        />

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 gap-3">
            <FilterDropdown
              label="Payment Status"
              options={[
                { id: 'all', label: 'All' },
                { id: 'pending', label: 'Pending', count: 26 },
                { id: 'due', label: 'Due Today', count: 4 },
                { id: 'overdue', label: 'Overdue', count: 8 },
              ]}
              defaultValue="all"
            />
            <FilterDropdown
              label="All Due Date"
              options={[
                { id: 'all', label: 'All' },
              ]}
              defaultValue="all"
            />
            <FilterDropdown
              label="All Suppliers"
              options={[
                { id: 'all', label: 'All' },
              ]}
              defaultValue="all"
            />
            <FilterDropdown
              label="All"
              options={[
                { id: 'all', label: 'All' },
              ]}
              defaultValue="all"
            />
          </div>
          <div className="flex gap-3">
            <SearchInput placeholder="Search..." className="w-64" />
          </div>
        </div>

        {/* Payments Table */}
        <PaymentsTable payments={mockPayments} />

        {/* Payment Proof Upload */}
        <PaymentProofUpload />
      </div>
    </main>
  )
}
