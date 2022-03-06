import { models, model, Schema } from 'mongoose'

const ProductInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: Array
    }
  },
  {
    timestamps: true
  }
)

export default models.ProductInfo || model('ProductInfo', ProductInfoSchema)
