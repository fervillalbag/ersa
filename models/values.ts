import mongoose, { models, Schema, Model } from 'mongoose'
import { Value } from '../src/interfaces/Value'

const ValueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
})

const ValueModel: Model<Value> =
  models.Value || mongoose.model('Value', ValueSchema)

export default ValueModel
