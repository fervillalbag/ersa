import { NextApiRequest, NextApiResponse } from 'next'

import ProductInfoModel from '../../models/productInfo'

const productInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { title, description } = body
        const productInfo = new ProductInfoModel({ title, description })
        await productInfo.save()

        if (!productInfo)
          return res.status(500).json({ msg: 'Product info not found' })
        return res
          .status(200)
          .json({ msg: 'Product info created successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'GET':
      try {
        const productInfo = await ProductInfoModel.findOne({})
        if (!productInfo)
          return res.status(500).json({ msg: 'Product info not found' })
        return res.status(200).json({ data: productInfo })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description, id } = body
        const input = { title, description }
        await ProductInfoModel.findOneAndUpdate({ _id: id }, input)
        return res.status(200).json({ msg: 'Product info updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ msg: 'method not allowed' })
  }
}

export default productInfo
