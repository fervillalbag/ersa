import { Description } from './Description'

export interface ProductType {
  _id: string
  name: string
  quantity: number
  price: number
  qty?: number
  image: string
  category: string
  description: Description[]
  createdAt?: number
}

export interface PathProduct {
  params: {
    id: string
  }
}
