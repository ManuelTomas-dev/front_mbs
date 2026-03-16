import { api } from "@/lib/api"
import { IPersonnel } from "@/types/operation/personnel"

// Buscar todos os títulos
export async function getPersonnel(): Promise<IPersonnel[]> {
    const { data } = await api.get("/users")
    return data
}

// Criar título
export async function createPersonnel(payload: Partial<IPersonnel>) {
    const { data } = await api.post("/users", payload)
    return data
}

// Atualizar título
export async function updatePersonnel(id: string, payload: Partial<IPersonnel>) {
    const { data } = await api.put(`/users/${id}`, payload)
    return data
}

// Deletar título
export async function deletePersonnel(id: string) {
    const { data } = await api.delete(`/users/${id}`)
    return data
}