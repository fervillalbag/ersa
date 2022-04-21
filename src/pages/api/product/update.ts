import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import ProductModel from '../../../models/products'

connectDB()

const product = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query, body } = req

  try {
    const { name, code, quantity, price, image, description } = body
    const input = { name, code, quantity, price, image, description }
    await ProductModel.findOneAndUpdate({ _id: query.id }, input)
    return res.status(200).json({ msg: 'Product updated' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default product
