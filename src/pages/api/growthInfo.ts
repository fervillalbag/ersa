import { NextApiRequest, NextApiResponse } from 'next'
import GrowthInfo from '../../models/growthInfo'

const reviewInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const growthInfo = await GrowthInfo.findOne({})
        if (!growthInfo)
          return res.status(500).json({ msg: 'Growth info not found' })
        return res.status(200).json({ data: growthInfo })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'POST':
      try {
        const { title, description } = body
        const growthInfo = new GrowthInfo({ title, description })
        await growthInfo.save()

        if (!growthInfo)
          return res.status(500).json({ msg: 'Growth info not found' })
        return res.status(200).json({ msg: 'Growth info created successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description, id } = body
        const input = { title, description }
        await GrowthInfo.findOneAndUpdate({ _id: id }, input)
        return res.status(200).json({ msg: 'Growth info updated successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      break
  }
}

export default reviewInfo
