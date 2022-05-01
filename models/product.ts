import { Schema, models, model, Model } from 'mongoose'
import { ProductType } from '../src/interfaces/Product'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: Array,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
})

const ProductModel: Model<ProductType> =
  models.Product || model('Product', ProductSchema)

export default ProductModel
