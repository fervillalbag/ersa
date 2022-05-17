export class CreateGrowthDTO {
  _id?: string;
  title: string;
  description: Description[];
  createdAt: number;
}

type Description = {
  id: string;
  text: string;
};
