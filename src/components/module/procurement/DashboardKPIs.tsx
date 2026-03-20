import { StatCard } from '@/components/common/StatCard'

interface DashboardKPIsProps {
  requestsOpen: number
  quotationsPending: number
  rfWaitingApproval: number
  poWaitingApproval: number
  itemsAwaitingInventory: number
}

export function DashboardKPIs({
  requestsOpen,
  quotationsPending,
  rfWaitingApproval,
  poWaitingApproval,
  itemsAwaitingInventory,
}: DashboardKPIsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <StatCard
        label="Requests Open"
        value={requestsOpen}
        color="blue"
        size="lg"
      />
      <StatCard
        label="Quotations Pending"
        value={quotationsPending}
        color="blue"
        size="lg"
      />
      <StatCard
        label="RF Waiting Approval"
        value={rfWaitingApproval}
        color="orange"
        size="lg"
      />
      <StatCard
        label="PO Waiting Approval"
        value={poWaitingApproval}
        color="red"
        size="lg"
      />
      <StatCard
        label="Items Awaiting Inventory"
        value={itemsAwaitingInventory}
        color="green"
        size="lg"
      />
    </div>
  )
}
