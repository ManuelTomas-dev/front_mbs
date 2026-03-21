import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Receipt, FileEdit, Calendar, ArrowUpRight } from "lucide-react"

interface SidebarProps {
  invoices: any[]
  amendments: any[]
  isLoading: boolean
}

export function ContractActivitySidebar({ invoices, amendments, isLoading }: SidebarProps) {
  return (
    <Card className="w-80 hidden xl:flex flex-col h-[calc(100vh-250px)] sticky top-6">
      <CardHeader className="border-b bg-slate-50/50 py-4">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-blue-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      
      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-6">
          
          {/* Seção de Amendments */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Last Amendments</h4>
            {amendments.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No amendments.</p>
            ) : (
              amendments.slice(0, 5).map((adm) => (
                <div key={adm.id} className="p-3 rounded-lg bg-blue-50 border border-blue-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 truncate w-32">{adm.amendment_title}</span>
                    <FileEdit className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-blue-600/70">
                    <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> {new Date(adm.effective_date).toLocaleDateString()}</span>
                    <Badge className="h-4 text-[9px] bg-blue-200 text-blue-800 hover:bg-blue-200 border-none">{adm.status}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Seção de Invoices */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Recent Invoices</h4>
            {invoices.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No invoices.</p>
            ) : (
              invoices.slice(0, 5).map((inv) => (
                <div key={inv.id} className="p-3 rounded-lg bg-blue-50 border border-blue-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 truncate w-32">{inv.file_name}</span>
                    <Receipt className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-blue-600">
                       {Number(inv.invoice_amount).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                    </span>
                    <span className="text-blue-400">{new Date(inv.invoice_date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

        </CardContent>
      </ScrollArea>
    </Card>
  )
}