export interface Description {
  id: string;
  text: string;
}

export class CreateCommunityDTO {
  _id: string;
  image: string;
  description: Description[];
  createdAt: Date;
}
