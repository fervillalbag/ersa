import { Schema } from 'mongoose';

export const ValueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
