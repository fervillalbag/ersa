import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../../config/mongodb'
import Growth from '../../../../models/growth'

connectDB()

const growthItem = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query, body } = req

  try {
    const { title, description } = body
    const input = { title, description }
    await Growth.findOneAndUpdate({ _id: query.id }, input)
    return res.status(200).json({ msg: 'Growth item updated' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default growthItem
