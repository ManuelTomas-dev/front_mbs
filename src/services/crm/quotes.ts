import { api } from "@/lib/api"
import { IQuote } from "@/types/crm/quotes"



export async function createQuote(payload: IQuote) {
  const { data } = await api.post("/quote", payload)
  return data
}

// Rota para listar contatos de uma localização específica
export async function getQuotes(): Promise<IQuote[]> {
  const { data } = await api.get(`/quote`)
  return data
}