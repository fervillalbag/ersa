import { NextApiResponse, NextApiRequest } from 'next'

import { db } from '../../../lib'
import { Header } from '../../../models'
import { HeaderInfo } from '../../interfaces/HeaderInfo'

type Data = { msg: string } | HeaderInfo

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return createHeader(res, req)

    case 'GET':
      return getHeader(res)

    case 'PUT':
      return updateHeader(res, req)

    default:
      return res.status(500).json({ msg: 'Method not allowed' })
  }
}

export default handler

const createHeader = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
) => {
  const { title, description, image } = req.body

  const newHeaderInfo = new Header({
    title,
    description,
    image,
    createdAt: Date.now()
  })

  try {
    await db.connected()
    await newHeaderInfo.save()
    await db.disconnect()
    return res.status(201).json(newHeaderInfo)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const getHeader = async (res: NextApiResponse<Data>) => {
  try {
    await db.connected()
    const headerInfo = await Header.findOne()
    await db.disconnect()
    return res.status(200).json(headerInfo)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const updateHeader = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
) => {
  const { title, description, image } = req.body

  try {
    await db.connected()
    await Header.updateOne(
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
