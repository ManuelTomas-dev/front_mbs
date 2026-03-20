import { Header } from '@/components/layout/Header'
import { TabNavigation } from '@/components/layout/TabNavigation'

const procurementTabs = [
  { label: 'Requests', href: '/procurement/requests', id: 'requests' },
  { label: 'Quotations', href: '/procurement/quotations', id: 'quotations' },
  { label: 'RF Approval', href: '/procurement/rf-approval', id: 'rf-approval' },
  { label: 'Purchase Orders', href: '/procurement/purchase-orders', id: 'purchase-orders' },
  { label: 'Vendors', href: '/procurement/vendors', id: 'vendors' },
  { label: 'Payments', href: '/procurement/payments', id: 'payments' },
]

export default function ProcurementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <TabNavigation tabs={procurementTabs} />
      {children}
    </>
  )
}
