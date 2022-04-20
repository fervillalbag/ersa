import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import HeaderInfo from '../../../models/header'

connectDB()

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const headerInfo = await HeaderInfo.findOne({})
    if (!headerInfo)
      return res.status(500).json({ msg: 'Header info not found' })
    return res.status(200).json({ data: headerInfo })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default handler
