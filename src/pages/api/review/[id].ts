import { NextApiRequest, NextApiResponse } from 'next'
import Review from '../../../models/review'

const review = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      try {
        const review = await Review.findOne({ _id: query.id })
        if (!review) return res.status(500).json({ msg: 'Review not found' })
        return res.status(200).json({ data: review })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'DELETE':
      try {
        await Review.findOneAndDelete({ _id: query.id })
        return res.status(200).json({ msg: 'Review deleted' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { avatar, name, description } = body
        const input = { avatar, name, description }
        await Review.findOneAndUpdate({ _id: query.id }, input)
        return res.status(200).json({ msg: 'Review updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      break
  }
}

export default review
