export interface ILead {
  id?: number;
  reference: string;
  id_client_contact: number;
  description: string;
  inquiry_email: string;
  status: string;
  interest: string;
  id_contact_form: number;
  id_source: number;
  id_owner: number;
  id_user_created: string;
  created_at?: string;
}
export type ILeadData = {
  client_contact: {
    email: string;
    id: number;
    id_client_location: number;
    nome_contato: string;
    phone: string;
  };
  contact_form: {
    id: number;
    name: string;
  };
  created_at: string;
  description: string;
  id: number;
  id_client_contact: number;
  id_contact_form: number;
  id_owner: number;
  id_source: number;
  id_user_created: number;
  inquiry_email: string;
  interest: string;
  is_active: boolean;
  reference: string;
  status: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
  };
};
