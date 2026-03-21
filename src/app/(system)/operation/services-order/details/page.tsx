import { OperationalDetails } from "@/components/module/service/operational-details"

export const metadata = {
  title: 'Personnel Directory',
  description: 'Company personnel and staff directory',
}

export default function Page() {
  return <main className="container mx-auto max-w-360"><OperationalDetails /></main>
}
