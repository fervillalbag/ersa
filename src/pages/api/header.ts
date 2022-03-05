import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../config/mongodb'
import HeaderInfo from '../../models/header'

connectDB()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      try {
        const headerInfo = await HeaderInfo.findOne({})
        if (!headerInfo)
          return res.status(500).json({ msg: 'Header info not found' })
        return res.status(200).json({ data: headerInfo })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'POST':
      try {
        const { title, description, image } = req.body
        const headerInfo = await new HeaderInfo({ title, description, image })
        await headerInfo.save()

        return res.status(200).json({ msg: 'Header info created successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description, image, id } = req.body
        const input = { title, description, image }
        await HeaderInfo.findOneAndUpdate({ _id: id }, input)
        return res.status(200).json({ msg: 'Header info updated successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ msg: 'method not allowed' })
  }
}

export default handler
