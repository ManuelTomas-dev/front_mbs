import { api } from "@/lib/api"
import { ILocation } from "@/types/partner/location"

// Buscar todos os títulos
export async function getAllLocations(): Promise<ILocation[]> {
    const { data } = await api.get(`/locations`)
    return data
}
export async function getLocations(id: string): Promise<ILocation[]> {
    const { data } = await api.get(`/client/location/client/${id}`)
    return data
}

// Criar título
export async function createLocation(payload: Partial<ILocation>) {
    const { data } = await api.post("/client/location", payload)
    return data
}

// Atualizar título
export async function updateLocation(id: string, payload: Partial<ILocation>) {
    const { data } = await api.put(`/Location/${id}`, payload)
    return data
}

// Deletar título
export async function deleteLocation(id: string) {
    const { data } = await api.delete(`/Location/${id}`)
    return data
}
