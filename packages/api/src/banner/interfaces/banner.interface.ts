type Description = {
  id: string;
  text: string;
};

export type BannerInterface = {
  _id?: string;
  image: string;
  title?: string;
  description?: Description[];
};
