export interface Description {
  id: string;
  text: string;
}

export type AboutInterface = {
  _id: string;
  image: string;
  description: Description[];
  createdAt: Date;
};
