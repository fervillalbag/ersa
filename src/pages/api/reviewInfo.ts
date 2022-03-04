import { NextApiRequest, NextApiResponse } from 'next'

import ReviewInfo from '../../models/reviewInfo'

const review = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { title, description } = body
        const reviewInfo = new ReviewInfo({ title, description })
        await reviewInfo.save()

        if (!reviewInfo) res.status(500).json({ msg: 'Review info not found' })

        return res.status(200).json({ msg: 'Review info created' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'GET':
      try {
        const reviewInfo = await ReviewInfo.find({})

        if (!reviewInfo) res.status(500).json({ msg: 'Review info not found' })

        return res.status(200).json({ data: reviewInfo })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description, id } = body
        const input = { title, description, id }
        await ReviewInfo.findOneAndUpdate({ _id: id }, input)
        return res.status(200).json({ msg: 'Review info updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      break
  }
}

export default review
