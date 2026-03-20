import { api } from "@/lib/api"
import { IContract } from "@/types/crm/client"



export async function createContract(payload: IContract) {
  const { data } = await api.post("/contract", payload)
  return data
}

// Rota para listar contatos de uma localização específica
export async function getContracts(): Promise<IContract[]> {
  const { data } = await api.get("/contract")
  return data
}