import { NextApiResponse, NextApiRequest } from 'next'

import { db } from '../../../../lib'
import { Review as ReviewType } from '../../../interfaces/Review'
import { Review } from '../../../../models'

type Data = { msg: string } | ReviewType | ReviewType[]

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'PUT':
      return updateReview(res, req)

    case 'GET':
      return getReview(res, req)

    case 'DELETE':
      return deleteReview(res, req)

    default:
      return res.status(500).json({ msg: 'Method not allowed' })
  }
}

export default handler

const updateReview = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { name, avatar, description } = req.body

  try {
    await db.connected()
    await Review.findOneAndUpdate(
      { _id: req.query.id },
      {
        name,
        avatar,
        description
      }
    )
    await db.disconnect()
    return res.status(201).json({ msg: 'Updated!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const getReview = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    await db.connected()
    const review = await Review.findOne({ _id: req.query.id })
    await db.disconnect()
    return res.status(200).json(review)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const deleteReview = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    await db.connected()
    await Review.deleteOne({ _id: req.query.id })
    await db.disconnect()
    return res.status(200).json({ msg: 'Deleted!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}
