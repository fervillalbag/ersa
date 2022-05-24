type Description = {
  id: string;
  text: string;
};

export class CreateBannerDTO {
  _id?: string;
  image: string;
  title?: string;
  description?: Description[];
}
