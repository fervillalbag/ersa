import { NextApiRequest, NextApiResponse } from 'next'

import BannerModel from '../../../models/banner'

const banner = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { title, description, image } = body
        const bannerItem = new BannerModel({ title, description, image })
        await bannerItem.save()

        if (!bannerItem)
          return res.status(500).json({ msg: 'There are some problem' })
        return res.status(200).json({ msg: 'Banner item created successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'GET':
      try {
        const bannerItems = await BannerModel.find({})
        if (!bannerItems)
          return res.status(500).json({ msg: 'Banner items not found' })
        return res.status(200).json({ data: bannerItems })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ data: error })
      }

    default:
      return res.status(500).json({ data: 'method not allowed' })
  }
}

export default banner
