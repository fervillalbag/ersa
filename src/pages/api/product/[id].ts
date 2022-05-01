import { NextApiResponse, NextApiRequest } from 'next'

import { db } from '../../../../lib'
import { Product } from '../../../../models'
import { ProductType } from '../../../interfaces/Product'

type Data = { msg: string } | ProductType | ProductType[]

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'PUT':
      return updateProduct(req, res)

    case 'GET':
      return getProduct(res, req)

    case 'DELETE':
      return deleteProduct(res, req)

    default:
      break
  }
}

export default handler

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { name, price, description, image, category } = req.body

  try {
    db.connected()
    await Product.updateOne(
      { _id: req.query.id },
      {
        name,
        price,
        description,
        image,
        category
      }
    )
    db.disconnect()
    return res.status(200).json({ msg: 'Updated!' })
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getProduct = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    db.connected()
    const product = await Product.findOne({ _id: req.query.id })
    db.disconnect()
    return res.status(200).json(product)
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const deleteProduct = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    db.connected()
    await Product.deleteOne({ _id: req.query.id })
    db.disconnect()
    return res.status(200).json({ msg: 'Deleted!' })
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
