import mongoose, { Model, models, Schema } from 'mongoose'
import { HeaderInfo } from '../src/interfaces/HeaderInfo'

export type HeaderSchemaProps = HeaderInfo

const HeaderSchema = new Schema({
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

const HeaderModel: Model<HeaderSchemaProps> =
  models.Header || mongoose.model('Header', HeaderSchema)

export default HeaderModel
