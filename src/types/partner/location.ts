// export interface ILocation {
//   id: string
//   id_client: string
//   name: string
//   endereco: string
//   codigo_postal?: string
//   cidade?: string
//   pais?: string
//   telefone_localidade?: string
//   email_localidade?: string
//   status_localidade?: boolean
//   data_registro_localidade?: string
//   observacoes?: string
// }

export interface ILocation {
  designacao_localidade_cliente: string;
  endereco: string;
  id: string;
  id_client: string;
  status_localizacao_cliente: boolean;
}
