import mongoose, { models, Model, Schema } from 'mongoose'
import { GrowthInfo } from '../src/interfaces/Growth'

const GrowthSchema = new Schema({
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

const GrowthModel: Model<GrowthInfo> =
  models.Growth || mongoose.model('Growth', GrowthSchema)

export default GrowthModel
