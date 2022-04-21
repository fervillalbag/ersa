import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import ProductModel from '../../../models/products'

connectDB()

const product = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { body } = req

  try {
    const { name, code, quantity, price, image, description } = body
    const input = { name, code, quantity, price, image, description }
    const product = new ProductModel(input)
    await product.save()
    if (!product) return res.status(500).json({ msg: 'Product not found' })

    return res.status(200).json({ msg: 'Product created' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default product
