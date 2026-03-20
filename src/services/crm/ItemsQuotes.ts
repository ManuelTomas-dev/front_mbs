import { api } from "@/lib/api";
import { IQuoteItem } from "@/types/crm/ItemsQuotes";



/**
 * Adiciona um novo item (produto ou serviço) a uma cotação específica
 * Rota: POST /items-quotes
 */
export async function createQuoteItem(payload: IQuoteItem): Promise<IQuoteItem> {
  const { data } = await api.post("/session", payload);
  return data;
}

/**
 * Lista todos os itens de uma cotação específica
 * Rota: GET /items-quotes/quote/:quoteId
 */
export async function getItemsByQuote(quoteId: number): Promise<IQuoteItem[]> {
  const { data } = await api.get(`/session/${quoteId}`);
  return data;
}

/**
 * Remove um item da cotação
 * Rota: DELETE /items-quotes/:id
 */
export async function deleteQuoteItem(id: number): Promise<void> {
  await api.delete(`/session/${id}`);
}

/**
 * Atualiza um item já existente na cotação
 * Rota: PUT /items-quotes/:id
 */
export async function updateQuoteItem(id: number, payload: Partial<IQuoteItem>): Promise<IQuoteItem> {
  const { data } = await api.put(`/session/${id}`, payload);
  return data;
}