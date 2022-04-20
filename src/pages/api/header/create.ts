import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import HeaderInfo from '../../../models/header'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { title, description, image } = req.body
    const headerInfo = await new HeaderInfo({ title, description, image })
    await headerInfo.save()

    return res.status(200).json({ msg: 'Header info created successfully' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default handler
