import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import Growth from '../../../models/growth'

connectDB()

const growth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const growths = await Growth.find({})
        if (!growths) return res.status(200).json({ msg: 'Growths not found' })

        return res.status(200).json({ data: growths })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'POST':
      try {
        const { title, description } = body
        const growth = new Growth({ title, description })
        await growth.save()

        if (!growth) return res.status(500).json({ msg: 'Growth not found' })
        return res.status(200).json({ msg: 'Growth item created' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ msg: 'method not allowed' })
  }
}

export default growth
