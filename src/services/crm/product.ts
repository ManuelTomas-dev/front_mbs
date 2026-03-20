import { api } from "@/lib/api"
import { IProduct } from "@/types/crm/product"



export async function createProduct(payload: IProduct) {
  const { data } = await api.post("/product", payload)
  return data
}

// Rota para listar contatos de uma localização específica
export async function getProducts(): Promise<IProduct[]> {
  const { data } = await api.get(`/product`)
  return data
}