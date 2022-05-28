export interface Description {
  id: string;
  text: string;
}

export type CommunityInterface = {
  _id: string;
  image: string;
  description: Description[];
  createdAt: Date;
};
