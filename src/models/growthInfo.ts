import { models, model, Schema } from 'mongoose'

const GrowthInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
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

export default models.GrowthInfo || model('GrowthInfo', GrowthInfoSchema)
