import { NextApiRequest, NextApiResponse } from 'next'

import ProductModel from '../../../models/products'

const product = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      try {
        const product = await ProductModel.findOne({ _id: query.id })
        if (!product)
          return res.status(500).json({ msg: 'Product not allowed' })
        return res.status(200).json({ data: product })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { name, code, quantity, price, image, description } = body
        const input = { name, code, quantity, price, image, description }
        await ProductModel.findOneAndUpdate({ _id: query.id }, input)
        return res.status(200).json({ msg: 'Product updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'DELETE':
      try {
        await ProductModel.findOneAndDelete({ _id: query.id })
        return res.status(200).json({ msg: 'Product deleted' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ msg: 'Method not allowed' })
  }
}

export default product
