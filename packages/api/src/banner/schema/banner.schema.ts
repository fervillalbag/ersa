import { Schema } from 'mongoose';

export const BannerSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: Array,
  },
});
