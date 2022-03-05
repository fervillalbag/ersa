import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import Growth from '../../../models/growth'

connectDB()

const growthItem = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      try {
        const growth = await Growth.findOne({ _id: query.id })
        if (!growth) return res.status(500).json({ msg: 'Growth not found' })
        return res.status(200).json({ data: growth })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description } = body
        const input = { title, description }
        await Growth.findOneAndUpdate({ _id: query.id }, input)
        return res.status(200).json({ msg: 'Growth item updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'DELETE':
      try {
        await Growth.findOneAndDelete({ _id: query.id })
        return res.status(200).json({ msg: 'Growth deleted successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      break
  }
}

export default growthItem
