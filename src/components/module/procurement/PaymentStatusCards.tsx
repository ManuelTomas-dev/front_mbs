import { StatCard } from '@/components/common/StatCard'
import { formatCurrency } from '@/lib/utils'

interface PaymentStatusCardsProps {
  pending: number
  dueToday: number
  overdue: number
  totalPaid: number
}

export function PaymentStatusCards({
  pending,
  dueToday,
  overdue,
  totalPaid,
}: PaymentStatusCardsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Pending Payments</p>
        <p className="mt-2 text-3xl font-semibold text-orange-600">{pending}</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Due Today</p>
        <p className="mt-2 text-3xl font-semibold text-blue-600">{dueToday}</p>
        <p className="text-xs text-gray-600">Due Date</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Overdue Payments</p>
        <p className="mt-2 text-3xl font-semibold text-red-600">{overdue}</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Total Paid This Month</p>
        <p className="mt-2 text-2xl font-semibold text-green-600">
          {formatCurrency(totalPaid, 'USD')}
        </p>
      </div>
    </div>
  )
}
