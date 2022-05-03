import { NextApiResponse, NextApiRequest } from 'next'

import { Community } from '../../../models'
import { db } from '../../../lib'
import { Community as CommunityType } from '../../interfaces/Community'

type Data = { msg: string } | CommunityType

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return createCommunity(res, req)

    case 'PUT':
      return updateCommunity(res, req)

    case 'GET':
      return getCommunity(res)

    default:
      break
  }
}

export default handler

const createCommunity = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description } = req.body

  const newCommunity = new Community({
    title,
    description,
    createdAt: Date.now()
  })

  try {
    db.connected()
    await newCommunity.save()
    db.disconnect()
    return res.status(201).json(newCommunity)
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const updateCommunity = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description } = req.body

  try {
    db.connected()
    await Community.findOneAndUpdate({}, { title, description })
    db.disconnect()
    return res.status(200).json({ msg: 'Updated' })
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getCommunity = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    db.connected()
    const community = await Community.findOne()

    if (!community) {
      return res.status(400).json({ msg: 'Community info not found' })
    }

    db.disconnect()
    return res.status(200).json(community)
  } catch (error) {
    db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
