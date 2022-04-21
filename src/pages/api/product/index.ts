import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import ProductModel from '../../../models/products'

connectDB()

const product = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const products = await ProductModel.find({})
    if (!products) return res.status(500).json({ msg: 'Products not found' })
    return res.status(200).json({ data: products })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default product
