import { Schema } from 'mongoose';

export const BannerSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
  },
  description: {
    type: Array,
  },
});
