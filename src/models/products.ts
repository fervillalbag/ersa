import { models, model, Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: Array
    }
  },
  {
    timestamps: true
  }
)

export default models.Product || model('Product', ProductSchema)
