import { api } from "@/lib/api"
import { IContact } from "@/types/partner/contact"



export async function createContact(payload: IContact) {
  const { data } = await api.post("/client/contact", payload)
  return data
}

// Rota para listar contatos de uma localização específica
export async function getContactsByLocation(locationId: string | number): Promise<IContact[]> {
    const { data } = await api.get(`/client/contact/location/${locationId}`)
    return data
}

export async function getAllContacts(): Promise<IContact[]> {
    const { data } = await api.get("/client/contact")
    return data
}