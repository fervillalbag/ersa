import { model, models, Schema } from 'mongoose'

const ReviewSchema = new Schema(
  {
    avatar: {
      type: String,
      required: [true, 'Avatar is required']
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    description: {
      type: Array,
      required: [true, 'Description is required']
    }
  },
  {
    timestamps: true
  }
)

export default models.Reviews || model('Reviews', ReviewSchema)
