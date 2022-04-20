import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../../config/mongodb'
import HeaderInfo from '../../../../models/header'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // const { title, description, image, _id } = req.body
    await HeaderInfo.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
      runValidators: true
    })
    return res.status(200).json({ msg: 'Header info updated successfully' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error })
  }
}

export default handler
