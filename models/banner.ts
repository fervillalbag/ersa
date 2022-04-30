import mongoose, { model, Schema, Model } from 'mongoose'
import { Banner as BannerType } from '../src/interfaces/Banner'

const BannerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
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

const BannerModel: Model<BannerType> =
  mongoose.models.Banner || model('Banner', BannerSchema)

export default BannerModel
