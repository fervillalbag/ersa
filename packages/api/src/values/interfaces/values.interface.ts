export interface ValueInterface {
  _id: string;
  title: string;
  description: Description[];
  order: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

type Description = {
  id: string;
  text: string;
};
