import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../config/mongodb'
import Growth from '../../models/growth'

connectDB()

const growth = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const growths = await Growth.find({})
    if (!growths) return res.status(200).json({ msg: 'Growths not found' })

    return res.status(200).json({ data: growths })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default growth
