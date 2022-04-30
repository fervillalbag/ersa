import mongoose, { models, Schema, Model } from 'mongoose'
import { Review } from '../src/interfaces/Review'

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  description: {
    type: Array,
    required: true
  }
})

const ReviewModel: Model<Review> =
  models.Review || mongoose.model('Review', ReviewSchema)

export default ReviewModel
