import { ApprovalHistory } from "@/components/module/service/approval-history"

export const metadata = {
  title: 'Personnel Directory',
  description: 'Company personnel and staff directory',
}

export default function Page() {
  return <main className="container mx-auto max-w-360"><ApprovalHistory /></main>
}
