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
    case 'POST':
      return createReview(res, req)

    case 'GET':
      return getReview(res)

    default:
      return res.status(500).json({ msg: 'Method not allowed' })
  }
}

export default handler

const createReview = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { name, avatar, description } = req.body

  const newReview = new Review({
    name,
    avatar,
    description,
    createdAt: Date.now()
  })

  try {
    await db.connected()
    await newReview.save()
    await db.disconnect()
    return res.status(201).json(newReview)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getReview = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    await db.connected()
    const review = await Review.find()

    if (review.length === 0) {
      return res.status(400).json({ msg: 'Reviews not found' })
    }

    await db.disconnect()
    return res.status(200).json(review)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
