import { NextApiRequest, NextApiResponse } from 'next'

const handler = (_: NextApiRequest, res: NextApiResponse): void => {
  return res.status(200).json({ msg: 'Hello World' })
}

export default handler
