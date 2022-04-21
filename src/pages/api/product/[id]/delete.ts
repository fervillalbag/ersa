import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../../config/mongodb'
import ProductModel from '../../../../models/products'

connectDB()

const product = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req

  try {
    await ProductModel.findOneAndDelete({ _id: query.id })
    return res.status(200).json({ msg: 'Product deleted' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default product
