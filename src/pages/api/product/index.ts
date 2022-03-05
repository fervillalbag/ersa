import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '../../../models/products'

const product = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
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

    case 'GET':
      try {
        const products = await ProductModel.find({})
        if (!products)
          return res.status(500).json({ msg: 'Products not found' })
        return res.status(200).json({ data: products })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ msg: 'method not allowed' })
  }
}

export default product
