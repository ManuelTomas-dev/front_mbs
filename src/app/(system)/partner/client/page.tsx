import { ClientModule } from "@/components/module/partner/client/client-module"
export const metadata = {
  title: 'Client Directory',
  description: 'Company client and customer directory',
}

export default function Page() {
  return <main className="container mx-auto max-w-360"><ClientModule /></main>
}
