import { model, models, Schema } from 'mongoose'

const AboutSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: Array,
      required: [true, 'Description is required']
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

export default models.AboutInfo || model('AboutInfo', AboutSchema)
