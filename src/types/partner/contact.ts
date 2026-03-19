// export interface IContact {
//   id?: number
//   nome_contato: string
//   phone: string
//   email: string
//   id_client_location: number
//   linkedin?: string
// }

export interface IContact {
  data_cliente_contacto: string
  email: string
  id: number
  id_client_location: number
  linkedin: string
  nome_contato: string
  phone: string
  status_cliente_contacto: boolean
}
