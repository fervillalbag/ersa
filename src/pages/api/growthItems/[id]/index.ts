import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../../config/mongodb'
import Growth from '../../../../models/growth'

connectDB()

const growthItem = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req

  try {
    const growth = await Growth.findOne({ _id: query.id })
    if (!growth) return res.status(500).json({ msg: 'Growth not found' })
    return res.status(200).json({ data: growth })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default growthItem
