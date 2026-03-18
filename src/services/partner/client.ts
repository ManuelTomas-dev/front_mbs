import { api } from "@/lib/api"
import { IPersonnel } from "@/types/operation/personnel"
import { IClient } from "@/types/partnercopy/client"

// Buscar todos os títulos
export async function getClients(): Promise<IClient[]> {
    const { data } = await api.get("/client")
    return data
}

// Criar título
export async function createClient(payload: Partial<IClient>) {
    const { data } = await api.post("/client", payload)
    return data
}

// Atualizar título
export async function updateClient(id: string, payload: Partial<IClient>) {
    const { data } = await api.put(`/client/${id}`, payload)
    return data
}

// Deletar título
export async function deleteClient(id: string) {
    const { data } = await api.delete(`/client/${id}`)
    return data
}