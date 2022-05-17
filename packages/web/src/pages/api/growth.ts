import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../lib'
import { Growth } from '../../../models'
import { GrowthInfo } from '../../interfaces/Growth'

type Data = { msg: string } | GrowthInfo

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return createGrowth(req, res)

    case 'GET':
      return getGrowth(res)

    case 'PUT':
      return updateGrowth(req, res)

    default:
      break
  }
}

export default handler

const createGrowth = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { title, description } = req.body

  const newGrowth = new Growth({
    title,
    description,
    createdAt: Date.now()
  })

  try {
    await db.connected()
    await newGrowth.save()
    await db.disconnect()
    return res.status(201).json(newGrowth)
  } catch (err) {
    await db.disconnect()
    console.log(err)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getGrowth = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    await db.connected()
    const growth = await Growth.findOne()

    if (Object.keys(growth).length === 0) {
      return res.status(400).json({ msg: 'Growth info not found' })
    }

    await db.disconnect()
    return res.status(200).json(growth)
  } catch (err) {
    await db.disconnect()
    console.log(err)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const updateGrowth = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { title, description } = req.body

  try {
    await db.connected()
    await Growth.findOneAndUpdate({}, { title, description })
    await db.disconnect()
    return res.status(200).json({ msg: 'Updated!' })
  } catch (err) {
    await db.disconnect()
    console.log(err)
    return res.status(400).json({ msg: 'Some error!' })
  }
}