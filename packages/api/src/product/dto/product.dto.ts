type Description = {
  id: string;
  text: string;
};

export class CreateProductDTO {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  qty?: number;
  image: string;
  category: string;
  description: Description[];
  createdAt?: number;
}
