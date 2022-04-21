import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import ProductModel from '../../../models/products'

connectDB()

const product = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req

  try {
    const product = await ProductModel.findOne({ _id: query.id })
    if (!product) return res.status(500).json({ msg: 'Product not allowed' })
    return res.status(200).json({ data: product })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default product
