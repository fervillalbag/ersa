export class CreateReviewDTO {
  _id: string;
  name: string;
  avatar: string;
  description: Description[];
}

type Description = {
  id: string;
  text: string;
};
