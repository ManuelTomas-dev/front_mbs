export interface IQuote {
  id: number;
  client_id: number;
  client_location_id: number;
  client_contact_id: number;
  opportunity_id: number;
  title: string;
  currency_id: number;
  description: string;
  notes: string;
  terms_conditions: string;
}
