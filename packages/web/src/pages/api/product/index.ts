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
    case 'POST':
      return createProduct(req, res)

    case 'GET':
      return getProducts(res)

    default:
      break
  }
}

export default handler

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { name, price, description, image, category, quantity } = req.body
  const newProduct = new Product({
    name,
    price,
    description,
    image,
    category,
    quantity,
    createdAt: Date.now()
  })

  try {
    db.connected()
    await newProduct.save()
    db.disconnect()
    return res.status(201).json(newProduct)
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getProducts = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    db.connected()
    const products = await Product.find()
    db.disconnect()
    return res.status(200).json(products)
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
