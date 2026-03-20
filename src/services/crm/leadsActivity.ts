import { api } from "@/lib/api"
import { ILeadActivity } from "@/types/crm/leadsActivitiy"


/**
 * Cria uma nova Activity no sistema
 */
export async function createActivity(payload: ILeadActivity) {
  const { data } = await api.post("/leads_activity", payload)
  return data
}


/**
 * Obtém os detalhes de uma Activity específica por ID
 */
export async function getActivityById(id: number): Promise<ILeadActivity[]> {
  const { data } = await api.get(`/leads_activity/lead/${id}`)
  return data
}
