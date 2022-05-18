export interface Description {
  id: string;
  text: string;
}

export class CreateAboutDTO {
  _id: string;
  image: string;
  description: Description[];
  createdAt: Date;
}
