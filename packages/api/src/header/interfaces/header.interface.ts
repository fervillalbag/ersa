export type HeaderInterface = {
  _id?: string;
  title: string;
  description: Description[];
  image: string;
  createdAt: number;
};

type Description = {
  id: string;
  text: string;
};
