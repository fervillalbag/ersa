import mongoose, { models, Schema, Model } from 'mongoose'
import { Community as CommunityType } from '../src/interfaces/Community'

const CommunitySchema = new Schema({
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

const CommunityModel: Model<CommunityType> =
  models.Community || mongoose.model('Community', CommunitySchema)

export default CommunityModel
