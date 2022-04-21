import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import GrowthInfo from '../../../models/growthinfo'

connectDB()

const reviewInfo = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const growthinfo = await GrowthInfo.findOne({})
    if (!growthinfo)
      return res.status(500).json({ msg: 'Growth info not found' })
    return res.status(200).json({ data: growthinfo })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default reviewInfo
