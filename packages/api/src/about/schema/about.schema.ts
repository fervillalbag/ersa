import { Schema } from 'mongoose';

export const AboutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
