import mongoose, { Schema, models, Model } from 'mongoose'
import { AboutInfo } from '../src/interfaces/About'

const AboutSchema = new Schema({
  title: {
    type: String,
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
  createdAt: {
    type: Number,
    required: true
  }
})

const AboutModel: Model<AboutInfo> =
  models.About || mongoose.model('About', AboutSchema)

export default AboutModel
