import { api } from "@/lib/api"
import { Iamendment } from "@/types/crm/amendment"




export async function  createAmendment(payload: Iamendment) {
  const { data } = await api.post("/contract/amendment", payload)
  return data
}

// Rota para listar contatos de uma localização específica
export async function getAmendments(): Promise<Iamendment[]> {
  const { data } = await api.get(`/contract/amendment`)
  return data
}