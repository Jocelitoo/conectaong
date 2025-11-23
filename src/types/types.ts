export interface OngProps {
  image: {
    url: string;
    id: string;
  };
  id: string;
  userId: string;
  name: string;
  email: string;
  description: string;
  category: string;
  address: string;
  voluntary: string | null;
  itens: string | null;
  phone: string;
  site: string | null;
  instagram: string | null;
  created_at: Date;
}
