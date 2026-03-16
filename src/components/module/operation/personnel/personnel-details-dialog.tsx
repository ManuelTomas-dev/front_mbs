"use client"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IPersonnel } from "@/types/operation/personnel"

interface PersonnelDetailsDialogProps {
  personnel: IPersonnel | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (personnel: IPersonnel) => void
}

export function PersonnelDetailsDialog({ personnel, open, onOpenChange, onEdit }: PersonnelDetailsDialogProps) {
  if (!personnel) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {personnel.isActive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400" />
            )}
            {personnel.first_name}
          </DialogTitle>
          <DialogDescription>Complete professional personnel details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <Badge variant={personnel.isActive ? "default" : "secondary"} className="text-sm">
              {personnel.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <p className="text-sm text-muted-foreground">{personnel.first_name} {personnel.last_name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">System ID</label>
                <p className="text-sm text-muted-foreground">#{personnel.id}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Created at</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(personnel.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Last updated</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(personnel.updatedAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {onEdit && <Button onClick={() => onEdit(personnel)}>Edit Title</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
