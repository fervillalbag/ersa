import { models, model, Schema } from 'mongoose'

const BannerSchema = new Schema(
  {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: Array,
      default: []
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    }
  },
  {
    timestamps: true
  }
)

export default models.Banner || model('Banner', BannerSchema)
