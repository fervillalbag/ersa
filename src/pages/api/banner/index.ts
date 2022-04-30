import { NextApiResponse, NextApiRequest } from 'next'

import { db } from '../../../../lib'
import { Banner } from '../../../../models'
import { Banner as BannerType } from '../../../interfaces/Banner'

type Data = { msg: string } | BannerType | BannerType[]

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return createBanner(req, res)

    case 'GET':
      return getBanners(res)

    default:
      break
  }
}

export default handler

const createBanner = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { title, image, description } = req.body

  const newBanner = new Banner({
    title,
    image,
    description,
    createdAt: Date.now()
  })

  try {
    await db.connected()
    await newBanner.save()
    await db.disconnect()
    return res.status(200).json(newBanner)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getBanners = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    await db.connected()
    const banners = await Banner.find()
    await db.disconnect()
    return res.status(200).json(banners)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
