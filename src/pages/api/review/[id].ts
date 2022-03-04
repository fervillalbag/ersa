import { NextApiRequest, NextApiResponse } from 'next'

const review = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        return res.status(200).json({ msg: '' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }

    default:
      break
  }
}

export default review
