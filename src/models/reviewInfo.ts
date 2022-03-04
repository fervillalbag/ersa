import { models, model, Schema } from 'mongoose'

const ReviewInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default models.ReviewInfo || model('ReviewInfo', ReviewInfoSchema)
