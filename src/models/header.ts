import { Schema, models, model } from 'mongoose'

const HeaderSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
)

export default models.HeaderInfo || model('HeaderInfo', HeaderSchema)
