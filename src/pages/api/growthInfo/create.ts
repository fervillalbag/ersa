import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import GrowthInfo from '../../../models/growthinfo'

connectDB()

const reviewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { body } = req

  try {
    const { title, description } = body
    const growthinfo = new GrowthInfo({ title, description })
    await growthinfo.save()

    if (!growthinfo)
      return res.status(500).json({ msg: 'Growth info not found' })
    return res.status(200).json({ msg: 'Growth info created successfully' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default reviewInfo
