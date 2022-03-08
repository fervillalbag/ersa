import { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../config/mongodb'
import BannerModel from '../../../models/banner'

connectDB()

const bannerItem = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      try {
        const banner = await BannerModel.findOne({ _id: query.id })
        if (!banner) return res.status(500).json({ msg: 'Banner not found' })
        return res.status(200).json({ data: banner })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description, image } = body
        const input = { title, description, image }
        await BannerModel.findOneAndUpdate({ _id: query.id }, input)
        return res.status(200).json({ msg: 'Banner updated successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'DELETE':
      try {
        await BannerModel.findOneAndDelete({ _id: query.id })
        return res.status(200).json({ msg: 'Banner deleted successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ data: 'method not allowed' })
  }
}

export default bannerItem
