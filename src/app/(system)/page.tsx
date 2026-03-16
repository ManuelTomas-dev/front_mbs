

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Bell, BellRing, Briefcase, FileText, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import data from "../data.json"

export default function Page() {
  return (


    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          <SectionCards />

          <div className="px-4 lg:px-6">
            <div className="grid gap-6 lg:grid-cols-3">

              {/* Gráfico */}
              <div className="lg:col-span-2">
                <ChartAreaInteractive />
              </div>

              {/* Card de Alertas */}
              <Card className="border border-blue-100 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-sm font-semibold text-gray-700">
                    System Notifications
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <UserPlus className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        A new personnel was added to the system
                      </p>
                      <span className="text-xs text-gray-400">2 minutes ago</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        A new contract was submitted
                      </p>
                      <span className="text-xs text-gray-400">10 minutes ago</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        New bid tracker created
                      </p>
                      <span className="text-xs text-gray-400">1 hour ago</span>
                    </div>
                  </div>

                </CardContent>
              </Card>

            </div>
          </div>

          {/* <DataTable data={data} /> */}

        </div>
      </div>
    </div>
  )
}
