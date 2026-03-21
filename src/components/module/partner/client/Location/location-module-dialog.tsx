"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LocationModule } from "./location-module"

interface LocationFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: string
}

export function LocationModuleDialog({
  open,
  onOpenChange,
  clientId,
}: LocationFormDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Ajustei o max-w para ser mais responsivo e largo o suficiente para a tabela */}
      <DialogContent className="sm:max-w-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Location Management
          </DialogTitle>
          <DialogDescription>
            Visualize, add, and generate the locations and contacts of this client.
          </DialogDescription>
        </DialogHeader>
        
        {/* O LocationModule já contém a lógica de listagem e criação */}
        <div className="py-4">
          <LocationModule clientId={clientId} />
        </div>
      </DialogContent>
    </Dialog>
  )
}