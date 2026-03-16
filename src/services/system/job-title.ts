import { api } from "@/lib/api"
import { Title } from "@/types/system/job-title"

// Buscar todos os títulos
export async function getTitles(): Promise<Title[]> {
    const { data } = await api.get("/titles")
    return data
}

// Criar título
export async function createTitle(payload: Partial<Title>) {
    const { data } = await api.post("/titles", payload)
    return data
}

// Atualizar título
export async function updateTitle(id: string, payload: Partial<Title>) {
    const { data } = await api.put(`/titles/${id}`, payload)
    return data
}

// Deletar título
export async function deleteTitle(id: string) {
    const { data } = await api.delete(`/titles/${id}`)
    return data
}