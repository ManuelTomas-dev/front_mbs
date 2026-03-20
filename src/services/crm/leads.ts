import { api } from "@/lib/api"
import { ILead, ILeadData } from "@/types/crm/leads"


/**
 * Cria uma nova Lead no sistema
 */
export async function createLead(payload: ILead) {
  const { data } = await api.post("/leads", payload)
  return data
}

/**
 * Lista todas as Leads registadas
 */
export async function getLeads(): Promise<ILeadData[]> {
  const { data } = await api.get(`/leads`)
  return data
}



/**
 * Obtém os detalhes de uma Lead específica por ID
 */
export async function getLeadById(id: number): Promise<ILead> {
  const { data } = await api.get(`/leads/${id}`)
  return data
}

/**
 * Atualiza o status ou informações de uma Lead
 */
export async function updateLead(id: number, payload: Partial<ILead>) {
  const { data } = await api.put(`/leads/${id}`, payload)
  return data
}