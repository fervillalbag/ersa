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
    case 'PUT':
      return updateBanner(req, res)

    case 'GET':
      return getBanner(res, req)

    case 'DELETE':
      return deleteBanner(res, req)

    default:
      break
  }
}

export default handler

const updateBanner = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  const { title, image, description } = req.body

  try {
    await db.connected()
    await Banner.findOneAndUpdate(
      { _id: req.query.id },
      {
        title,
        image,
        description,
        createdAt: Date.now()
      }
    )

    await db.disconnect()
    return res.status(200).json({ msg: 'Updated!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getBanner = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    await db.connected()
    const banner = await Banner.findOne({ _id: req.query.id })
    await db.disconnect()
    return res.status(200).json(banner)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const deleteBanner = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    await db.connected()
    await Banner.deleteOne({ _id: req.query.id })
    await db.disconnect()
    return res.status(200).json({ msg: 'Deleted!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
