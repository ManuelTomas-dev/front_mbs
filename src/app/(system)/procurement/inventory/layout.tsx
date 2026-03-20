import { Header } from '@/components/layout/Header'
import { TabNavigation } from '@/components/layout/TabNavigation'

const inventoryTabs = [
  { label: 'Inventory', href: '/inventory', id: 'inventory' },
  { label: 'Procurement', href: '/procurement/requests', id: 'procurement' },
  { label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
  { label: 'Projects', href: '/projects', id: 'projects' },
  { label: 'Selvie', href: '/selvie', id: 'selvie' },
  { label: 'Reports', href: '/reports', id: 'reports' },
]

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Header /> */}
      {/* <TabNavigation tabs={inventoryTabs} /> */}
      {children}
    </>
  )
}
