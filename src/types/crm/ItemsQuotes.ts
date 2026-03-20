export interface IQuoteItem {
  quantidade: number;
  preco_unico: number;
  uom: string;
  custo: number;
  fk_quotas: number;
  notas?: string;
  status_seccao: boolean;
  fk_servico: number | null; // Mude de ? para | null
  fk_produto: number | null; // Mude de ? para | null
}
