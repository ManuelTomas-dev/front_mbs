import { TaskDetail } from "@/components/module/project/task-detail"

export const metadata = {
  title: 'Personnel Directory',
  description: 'Company personnel and staff directory',
}

export default function Page() {
  return <main className="container mx-auto max-w-360"><TaskDetail /></main>
}
