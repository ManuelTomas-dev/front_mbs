import { api } from "@/lib/api";
import { IService } from "@/types/crm/service";

/**
 * Cria um novo serviço no sistema MBS
 * @param payload Dados do serviço conforme a interface IService
 * @returns Dados do serviço criado pelo backend Flask
 */
export async function createService(payload: IService) {
  // O log 127.0.0.1 - [19/Mar/2026] "POST /api/service" indicou que esta é a rota
  const { data } = await api.post("/service", payload);
  return data;
}

/**
 * Lista todos os serviços registados
 * @returns Promise com array de serviços
 */
export async function getServices(): Promise<IService[]> {
  const { data } = await api.get("/service");
  return data;
}

/**
 * Opcional: Busca um serviço específico pelo ID
 */
export async function getServiceById(id: number): Promise<IService> {
  const { data } = await api.get(`/service/${id}`);
  return data;
}