import { Description } from './Description'

export type HeaderInfo = {
  _id?: string
  title: string
  description: Description[]
  image: string
  createdAt: number
}
