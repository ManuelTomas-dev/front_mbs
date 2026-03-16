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
import { IPersonnel } from "@/types/operation/personnel"

interface PersonnelFormDialogProps {
  personnel?: IPersonnel | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<IPersonnel>) => Promise<void>
}

export function PersonnelFormDialog({ personnel, open, onOpenChange, onSubmit }: PersonnelFormDialogProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    isActive: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const isEditing = !!personnel

  useEffect(() => {
    if (personnel) {
      setFormData({
        first_name: personnel.first_name,
        last_name: personnel.last_name,
        isActive: personnel.isActive,
      })
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        isActive: true,
      })
    }
  }, [personnel, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast({
        title: "Erro de validação",
        description: "O nome e sobrenome são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      toast({
        title: isEditing ? "Personnel updated" : "Personnel created",
        description: isEditing ? "The Personnel was successfully updated." : "The new Personnel was successfully created.",
      })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: isEditing
          ? error?.response?.data?.message || "Error updating the personnel. Try again."
          : "Error creating the personnel. Try again.",
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
          <DialogTitle>{isEditing ? "Edit personnel" : "New personnel"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the personnel's information."
              : "Create a new professional personnel for the  MBS system."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                value={formData.first_name}
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
