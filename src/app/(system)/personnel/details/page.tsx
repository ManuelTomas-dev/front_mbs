import { PersonnelModule } from "@/components/module/operation/personnel/personnel-module"

export const metadata = {
  title: 'Personnel Directory',
  description: 'Company personnel and staff directory',
}

export default function Page() {
  return <main className="container mx-auto max-w-360"><PersonnelModule /></main>
}
