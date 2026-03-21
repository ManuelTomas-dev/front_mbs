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
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IClient } from "@/types/partnercopy/client"

interface ClientFormDialogProps {
  client?: IClient | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<IClient>) => Promise<void>
}




export function ClientFormDialog({ client, open, onOpenChange, onSubmit }: ClientFormDialogProps) {
  const [formData, setFormData] = useState({
    nome_cliente: "",
    sede_cliente: "",
    endereco_sede: "",
    status_cliente: true,
    codigo_postal: "",
    id_country: 1,
    telefone_principal: "",
    nif: "",
    id_user: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const isEditing = !!client

  useEffect(() => {
    if (client) {
      setFormData({
        nome_cliente: client.nome_cliente,
        sede_cliente: client.sede_cliente,
        endereco_sede: client.endereco_sede,
        status_cliente: client.status_cliente,
        codigo_postal: client.codigo_postal,
        id_country: 1,
        telefone_principal: client.telefone_principal,
        nif: client.nif,
        id_user: 1,
      })
    } else {
      setFormData({
        nome_cliente: "",
        sede_cliente: "",
        endereco_sede: "",
        status_cliente: true,
        codigo_postal: "",
        id_country: 1,
        telefone_principal: "",
        nif: "",
        id_user: 1,
      })
    }
  }, [client, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome_cliente.trim() || !formData.sede_cliente.trim()) {
      toast({
        title: "Erro de validação",
        description: "O nome e sede são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      toast({
        title: isEditing ? "Client updated" : "Client created",
        description: isEditing ? "The Client was successfully updated." : "The new Client was successfully created.",
      })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: isEditing
          ? error?.response?.data?.message || "Error updating the Client. Try again."
          : JSON.stringify(error?.response?.data) || "Error creating the Client. Try again.",
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
          <DialogTitle>{isEditing ? "Edit Client" : "New Client"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the Client's information."
              : "Create a new Client for the MBS system."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome_cliente">Name *</Label>
              <Input
                id="nome_cliente"
                value={formData.nome_cliente}
                onChange={(e) => setFormData((prev) => ({ ...prev, nome_cliente: e.target.value }))}
                placeholder="Ex: John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sede_cliente">Address</Label>
              <Input
                id="sede_cliente"
                value={formData.sede_cliente}
                onChange={(e) => setFormData((prev) => ({ ...prev, sede_cliente: e.target.value }))}
                placeholder="Ex: 123 Main St"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nif">Tax ID</Label>
              <Input
                id="nif"
                value={formData.nif}
                onChange={(e) => setFormData((prev) => ({ ...prev, nif: e.target.value }))}
                placeholder="Ex:  123456789"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo_postal">Postal Code</Label>
              <Input
                id="codigo_postal"
                value={formData.codigo_postal}
                onChange={(e) => setFormData((prev) => ({ ...prev, codigo_postal: e.target.value }))}
                placeholder="Ex:  12345"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone_principal">Main Phone</Label>
              <Input
                id="telefone_principal"
                value={formData.telefone_principal}
                onChange={(e) => setFormData((prev) => ({ ...prev, telefone_principal: e.target.value }))}
                placeholder="Ex:  (123) 456-7890"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco_sede">Address</Label>
              <Input
                id="endereco_sede"
                value={formData.endereco_sede}
                onChange={(e) => setFormData((prev) => ({ ...prev, endereco_sede: e.target.value }))}
                placeholder="Ex:  123 Main St"
                required
              />
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
