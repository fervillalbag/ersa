import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import GrowthInfo from '../../../models/growthInfo'

connectDB()

const reviewInfo = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const growthInfo = await GrowthInfo.findOne({})
    if (!growthInfo)
      return res.status(500).json({ msg: 'Growth info not found' })
    return res.status(200).json({ data: growthInfo })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default reviewInfo
