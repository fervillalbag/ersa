import { model, models, Schema } from 'mongoose'

const GrowthSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'name is required']
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

export default models.Growth || model('Growth', GrowthSchema)
