"use client"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Title } from "@/types/system/job-title" 

interface TitleDetailsDialogProps {
  title: Title | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (title: Title) => void
}

export function TitleDetailsDialog({ title, open, onOpenChange, onEdit }: TitleDetailsDialogProps) {
  if (!title) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {title.isActive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400" />
            )}
            {title.designation}
          </DialogTitle>
          <DialogDescription>Complete professional title details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <Badge variant={title.isActive ? "default" : "secondary"} className="text-sm">
              {title.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Designation</label>
                <p className="text-sm text-muted-foreground">{title.designation}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">System ID</label>
                <p className="text-sm text-muted-foreground">#{title.id}</p>
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
                    {new Date(title.createdAt).toLocaleDateString("en-US", {
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
                    {new Date(title.updatedAt).toLocaleDateString("en-US", {
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
            {onEdit && <Button onClick={() => onEdit(title)}>Edit Title</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
