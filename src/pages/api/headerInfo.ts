import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      try {
        const response = await prisma.headerInfo.findMany()
        res.status(200).json(JSON.stringify(response[0]))
      } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
      }
      break

    case 'POST':
      try {
        const { body } = req.body
        await prisma.headerInfo.create({
          data: body
        })

        res.status(200).json({ msg: 'Header info created' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }
      break

    case 'PUT':
      try {
        const { body } = req.body
        await prisma.headerInfo.update({
          where: {
            id: body.id
          },
          data: body
        })

        res.status(200).json({ msg: 'Header info updated' })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
      }
      break

    default:
      return res.status(500).json({ msg: 'Method not allowed' })
  }
}

export default handler
