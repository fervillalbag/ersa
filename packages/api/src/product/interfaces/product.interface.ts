type Description = {
  id: string;
  text: string;
};

export interface ProductInterface {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  qty?: number;
  image: string;
  status: boolean;
  category: string;
  description: Description[];
  createdAt?: number;
}
