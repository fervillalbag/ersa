import { NextApiRequest, NextApiResponse } from 'next'

import AboutModel from '../../models/aboutInfo'

const about = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { title, description, image } = body

        const aboutInfo = new AboutModel({ title, description, image })
        await aboutInfo.save()
        if (!aboutInfo)
          return res.status(500).json({ msg: 'About info not found' })

        return res.status(200).json({ msg: 'About info created successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'GET':
      try {
        const aboutInfo = await AboutModel.findOne({})
        if (!aboutInfo)
          return res.status(500).json({ msg: 'About info not found' })
        return res.status(500).json({ data: aboutInfo })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    case 'PUT':
      try {
        const { title, description, image, id } = body
        const input = { title, description, image }
        await AboutModel.findOneAndUpdate({ _id: id }, input)
        return res.status(200).json({ msg: 'About info updated successfully' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      return res.status(400).json({ msg: 'method not allowed' })
  }
}

export default about
