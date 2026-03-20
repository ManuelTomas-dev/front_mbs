
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'
import { RFApprovalFilter } from '@/components/module/procurement/RFApprovalFilter'
import { RFApprovalTable } from '@/components/module/procurement/RFApprovalTable'
import { mockRFApprovals } from '@/lib/mockData'

export default function RFApprovalPage() {
  return (
    <main className="min-h-screen bg-gray-50 container mx-auto max-w-360">
      <BreadcrumbNav
        items={[
          { label: 'Procurement', href: '/procurement' },
          { label: 'RF Approval' },
        ]}
      />

      <div className="px-6 py-6">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">RF Approval</h1>

        {/* Filters */}
        <RFApprovalFilter />

        {/* RF Approval Table */}
        <RFApprovalTable rfApprovals={mockRFApprovals} />
      </div>
    </main>
  )
}
