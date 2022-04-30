import { NextApiResponse, NextApiRequest } from 'next'

import { About } from '../../../models'
import { AboutInfo } from '../../interfaces/About'
import { db } from '../../../lib'

type Data = { msg: string } | AboutInfo

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return createAbout(res, req)

    case 'PUT':
      return updateAbout(res, req)

    case 'GET':
      return getAbout(res)

    default:
      return res.status(500).json({ msg: 'Method not allowed' })
  }
}

export default handler

const createAbout = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description, image } = req.body

  const newAboutInfo = new About({
    title,
    description,
    image,
    createdAt: Date.now()
  })

  try {
    await db.connected()
    await newAboutInfo.save()
    await db.disconnect()
    return res.status(201).json(newAboutInfo)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const updateAbout = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description, image } = req.body

  try {
    await db.connected()
    await About.updateOne(
      {},
      {
        title,
        description,
        image
      }
    )

    await db.disconnect()
    return res.status(200).json({ msg: 'Updated!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const getAbout = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    await db.connected()
    const aboutInfo = await About.findOne()
    await db.disconnect()
    return res.status(200).json(aboutInfo)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}
