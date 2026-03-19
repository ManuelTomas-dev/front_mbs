export interface IQuote {
  codigo_quotacao: string;
  fk_cliente_contacto: number;
  fk_moeda: number;
  fk_usuario: number;
  descricao?: string;
  notas?: string;
  oportunidade_conversao: number;
  status_quote: string;
  custo: number;
  termos_condicoes?: string;
}
