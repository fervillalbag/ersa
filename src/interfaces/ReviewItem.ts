import { Description } from './Description'

export interface Review {
  _id: string
  name: string
  avatar: string
  description: Description[]
}
