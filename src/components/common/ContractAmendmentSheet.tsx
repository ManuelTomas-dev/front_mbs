"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileEdit, 
  Calendar, 
  History, 
  Archive, 
  Loader2, 
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react"

// Interface baseada no seu JSON
interface Amendment {
  id: number
  amendment_title: string
  amendment_type: string
  contract_id: number
  effective_date: string
  status: string
  last_update: string
}

interface ContractAmendmentsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amendments: Amendment[]
  isLoading: boolean
  contractNumber: string
  onNewAmendment: () => void
}

export function ContractAmendmentsSheet({
  open,
  onOpenChange,
  amendments,
  isLoading,
  contractNumber,
  onNewAmendment,
}: ContractAmendmentsSheetProps) {

  // Helper para cores de status
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': 
        return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 className="w-3 h-3" /> }
      case 'in review': 
        return { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <Clock className="w-3 h-3" /> }
      case 'rejected': 
        return { color: 'text-rose-600 bg-rose-50 border-rose-100', icon: <AlertCircle className="w-3 h-3" /> }
      default: 
        return { color: 'text-slate-600 bg-slate-50 border-slate-100', icon: <History className="w-3 h-3" /> }
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0">
        
        {/* Header Fixo */}
        <div className="p-6 border-b bg-slate-50/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileEdit className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
              Amendment History
            </Badge>
          </div>
          <SheetTitle className="text-xl font-bold">Amendments</SheetTitle>
          <SheetDescription className="text-slate-500">
            Contract number {contractNumber} • {amendments.length} records
          </SheetDescription>
        </div>

        {/* Área de Conteúdo */}
        <ScrollArea className="flex-1 p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Looking for amendments...</p>
            </div>
          ) : amendments.length > 0 ? (
            <div className="space-y-4">
              {amendments.map((item) => {
                const config = getStatusConfig(item.status);
                return (
                  <div
                    key={item.id}
                    className="group flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                          <History className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">
                            {item.amendment_title}
                          </h4>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                            Type: {item.amendment_type}
                          </span>
                        </div>
                      </div>
                      <Badge className={`text-[10px] flex gap-1 items-center font-bold px-2 py-0 ${config.color}`}>
                        {config.icon}
                        {item.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Effective: {new Date(item.effective_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-300">ID #{item.id}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl border-slate-100 bg-slate-50/30">
              <Archive className="w-10 h-10 text-slate-300 mb-4" />
              <h4 className="text-slate-900 font-medium">No Amendments</h4>
              <p className="text-sm text-slate-500 max-w-50 mt-1">
                There are no amendments for this contract.
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer Fixo */}
        <div className="p-6 border-t bg-white">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl shadow-md"
            onClick={onNewAmendment}
          >
            <Plus className="w-4 h-4 mr-2" />
            New (Amendment)
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}