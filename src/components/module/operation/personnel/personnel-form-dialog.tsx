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
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonnelFormDialogProps {
  personnel?: IPersonnel | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<IPersonnel>) => Promise<void>
}

type role = {
  "created_at": string,
  "id": string,
  "name": string,
  "updated_at": string
}

type location = {
  "created_at": string,
  "id": string,
  "name": string,
  "updated_at": string
}

type workTitle = {
  "created_at": string,
  "id": string,
  "name": string,
  "updated_at": string
}


export async function getRoles(): Promise<role[]> {
  const { data } = await api.get("/roles")
  return data
}

export async function getLocations(): Promise<location[]> {
  const { data } = await api.get("/locations")
  return data
}

export async function getWorkTitles(): Promise<workTitle[]> {
  const { data } = await api.get("/work_title")
  return data
}

export function PersonnelFormDialog({ personnel, open, onOpenChange, onSubmit }: PersonnelFormDialogProps) {
  const [formData, setFormData] = useState({
    location_id: "",
    role_id: "",
    work_title_id: "",
    first_name: "",
    last_name: "",
    work_email: "",
    is_active: true,
    title: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const isEditing = !!personnel

  useEffect(() => {
    if (personnel) {
      setFormData({
        work_title_id: personnel.work_title_id,
        location_id: personnel.location_id,
        role_id: personnel.role_id,
        first_name: personnel.first_name,
        last_name: personnel.last_name,
        work_email: personnel.work_email,
        is_active: personnel.is_active,
        title: personnel.title,
      })
    } else {
      setFormData({
        work_title_id: "",
        location_id: "",
        role_id: "",
        first_name: "",
        last_name: "",
        work_email: "",
        is_active: true,
        title: "",
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


  const {
    data: roles = [],
    error,
    isLoading,
    refetch
  } = useQuery<role[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
    refetchInterval: 5000,
  });

  const {
    data: locations = [],
    error: locationError,
    isLoading: locationIsLoading,
    refetch: locationRefetch
  } = useQuery<location[]>({
    queryKey: ["locations"],
    queryFn: getLocations,
    refetchInterval: 5000,
  });

  const {
    data: workTitles = [],
    error: workTitleError,
    isLoading: workTitleIsLoading,
    refetch: workTitleRefetch
  } = useQuery<workTitle[]>({
    queryKey: ["workTitles"],
    queryFn: getWorkTitles,
    refetchInterval: 5000,
  });

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
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.first_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                placeholder="Ex: Petroleum Engineer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.last_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
                placeholder="Ex: Petroleum Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work_email">Work Email *</Label>
              <Input
                id="work_email"
                value={formData.work_email}
                onChange={(e) => setFormData((prev) => ({ ...prev, work_email: e.target.value }))}
                placeholder="Ex: Petroleum Engineer"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Petroleum Engineer"
                />
              </div>
              {/* Exemplo para Location */}
              <div className="space-y-2">
                <Label htmlFor="Location">Location</Label>
                <Select
                  // Converte o valor do estado para string
                  value={formData.location_id ? String(formData.location_id) : ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, location_id: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      // Converte o ID do mapeamento para string
                      <SelectItem key={location.id} value={String(location.id)}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Repita a mesma lógica de String() para Role e WorkTitle */}
              <div className="space-y-2">
                <Label htmlFor="title">Role</Label>
                <Select
                  value={formData.role_id ? String(formData.role_id) : ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, role_id: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Work Title</Label>
                <Select
                  value={formData.work_title_id ? String(formData.work_title_id) : ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, work_title_id: value }))}
                >
                  <SelectTrigger  className="w-full">
                    <SelectValue placeholder="Select a work title" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTitles.map((wt) => (
                      <SelectItem key={wt.id} value={String(wt.id)}>
                        {wt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
