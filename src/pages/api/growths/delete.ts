import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import Growth from '../../../models/growth'

connectDB()

const growthItem = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req

  try {
    await Growth.findOneAndDelete({ _id: query.id })
    return res.status(200).json({ msg: 'Growth deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default growthItem
