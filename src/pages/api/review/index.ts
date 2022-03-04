import { NextApiRequest, NextApiResponse } from 'next'
import ReviewModel from '../../../models/review'

const review = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { name, description, avatar } = body
        const review = new ReviewModel({ name, description, avatar })
        if (!review) return res.status(500).json({ msg: 'Review not found' })
        await review.save()
        return res.status(200).json({ msg: 'Review created successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'GET':
      try {
        const reviews = await ReviewModel.find({})
        if (!reviews) return res.status(500).json({ msg: 'Reviews not found' })
        return res.status(200).json({ data: reviews })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(500).json({ msg: 'method not allowed' })
  }
}

export default review
