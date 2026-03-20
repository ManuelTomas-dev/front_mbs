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
  FileText, 
  Download, 
  Calendar, 
  Receipt, 
  Archive, 
  Loader2, 
  Plus 
} from "lucide-react"
import { toast } from "sonner"

interface Invoice {
  id: number
  file_name: string
  invoice_amount: string
  invoice_date: string
  file_url: string
}

interface ContractInvoicesSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoices: Invoice[]
  isLoading: boolean
  contractNumber: string
  onNewInvoice: () => void
}

export function ContractInvoicesSheet({
  open,
  onOpenChange,
  invoices,
  isLoading,
  contractNumber,
  onNewInvoice,
}: ContractInvoicesSheetProps) {
  
  const handleDownload = (id: number) => {
    // Rota que definimos no backend
    const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/contract/invoice/download/${id}`
    window.open(downloadUrl, "_blank")
    toast.info("Iniciando download...")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-100 sm:w-125 flex flex-col gap-0 p-0">
        {/* Header Fixo */}
        <div className="p-6 border-b bg-slate-50/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100">
              Financeiro
            </Badge>
          </div>
          <SheetTitle className="text-xl font-bold">Documentos do Contrato</SheetTitle>
          <SheetDescription className="text-slate-500">
            Nº {contractNumber} • {invoices.length} documento(s) encontrado(s)
          </SheetDescription>
        </div>

        {/* Área de Conteúdo com Scroll */}
        <ScrollArea className="flex-1 p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Buscando invoices...</p>
            </div>
          ) : invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 truncate max-w-50">
                        {invoice.file_name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-green-600">
                          {Number(invoice.invoice_amount).toLocaleString("pt-AO", {
                            style: "currency",
                            currency: "AOA",
                          })}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(invoice.invoice_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                    onClick={() => handleDownload(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl border-slate-100 bg-slate-50/30">
              <Archive className="w-10 h-10 text-slate-300 mb-4" />
              <h4 className="text-slate-900 font-medium">Nenhum documento</h4>
              <p className="text-sm text-slate-500 max-w-50 mt-1">
                Ainda não foram registradas invoices para este contrato.
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer Fixo com Botão de Ação */}
        <div className="p-6 border-t bg-white">
          <Button 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl"
            onClick={onNewInvoice}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Invoice
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}