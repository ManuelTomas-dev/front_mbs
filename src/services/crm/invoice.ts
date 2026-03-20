import { api } from "@/lib/api";

// Definição simples para tipagem, ajuste conforme seu backend
export interface IInvoice {
  id?: number;
  fk_cliente_contacto: number;
  data_emissao: string;
  valor: number;
  ficheiro?: File; // O arquivo em si
  status?: string;
}

/**
 * Cria uma nova Invoice enviando um FormData (Multipart Form)
 * O FormData deve conter os campos: contactId, date, value e file
 */
export async function createInvoice(payload: FormData) {
  const { data } = await api.post("/contract/invoice", payload, {
    headers: {
      // Importante: Ao passar FormData, o navegador define o Content-Type 
      // com o "boundary" correto automaticamente. 
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

/**
 * Lista todas as invoices (opcional, caso queira exibir em uma tabela futura)
 */
export async function getInvoices(): Promise<IInvoice[]> {
  const { data } = await api.get("/invoice");
  return data;
}

/**
 * Busca invoices de um contrato ou contato específico
 */
export async function getInvoicesByContact(contactId: number): Promise<IInvoice[]> {
  const { data } = await api.get(`/invoice/contact/${contactId}`);
  return data;
}