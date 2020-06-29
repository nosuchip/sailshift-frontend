export interface Document {
  id: string;
  title: string;
  organization: string;
  department?: string;
  description: string;
  text: string;
  price: number;
}
