import { Description } from './Description'

export type HeaderInfo = {
  headerInfo: {
    _id: string
    title: string
    description: Description[]
    image: string
    createdAt: string
    updatedAt: string
  }
}
