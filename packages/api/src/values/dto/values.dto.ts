export class CreateValuesDTO {
  _id: string;
  title: string;
  description: Description[];
  createdAt: string;
  updatedAt: string;
}

type Description = {
  id: string;
  text: string;
};
