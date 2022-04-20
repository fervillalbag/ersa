import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import Growth from '../../../models/growth'

connectDB()

const growth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { body } = req

  try {
    const { _id, title, description } = body
    await Growth.findOneAndUpdate(
      { _id },
      { title, description },
      { new: true, runValidators: true }
    )

    if (!growth) return res.status(500).json({ msg: 'Growth not found' })
    return res.status(200).json({ msg: 'Growth item updated' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default growth
