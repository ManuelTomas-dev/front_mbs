"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import type { Title } from "@/types/system/job-title" 

interface TitleFormDialogProps {
  title?: Title | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<Title>) => Promise<void>
}

export function TitleFormDialog({ title, open, onOpenChange, onSubmit }: TitleFormDialogProps) {
  const [formData, setFormData] = useState({
    designation: "",
    isActive: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const isEditing = !!title

  useEffect(() => {
    if (title) {
      setFormData({
        designation: title.designation,
        isActive: title.isActive,
      })
    } else {
      setFormData({
        designation: "",
        isActive: true,
      })
    }
  }, [title, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.designation.trim()) {
      toast({
        title: "Erro de validação",
        description: "A designação é obrigatória.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      toast({
        title: isEditing ? "Title updated" : "Title created",
        description: isEditing ? "The title was successfully updated." : "The new title was successfully created.",
      })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: isEditing
          ? error?.response?.data?.message || "Error updating the title. Try again."
          : "Error creating the title. Try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Title" : "New Title"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the title's information."
              : "Create a new professional title for theMBS system."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => setFormData((prev) => ({ ...prev, designation: e.target.value }))}
                placeholder="Ex: Petroleum Engineer"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Active Title</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
