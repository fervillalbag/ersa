import { Description } from './Description'

export interface ProductType {
  _id: string
  name: string
  code: string
  quantity: number
  price: number
  qty?: number
  image: string
  description: Description[]
}
