import { Schema } from 'mongoose';

export const GrowthSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
