import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import GrowthInfoSchema from '../../../models/growthinfo'

connectDB()

const reviewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { body } = req

  try {
    const { title, description, _id } = body
    const input = { title, description, _id }
    await GrowthInfoSchema.findOneAndUpdate({ _id }, input)
    return res.status(200).json({ msg: 'Growth info updated successfully' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default reviewInfo
