
import { List } from "@/components/module/project/list"
import { TankCleaningTaskDetail } from "@/components/module/project/page"

export const metadata = {
  title: 'Personnel Directory',
  description: 'Company personnel and staff directory',
}

export default function Page() {
  return <main className="container mx-auto max-w-360"><List /></main>
}
