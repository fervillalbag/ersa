// import type { NextFetchEvent } from 'next/server'
import runMiddleware from '../../utils/middlew'
import Morgan from 'morgan'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../config/mongodb'

dbConnect()

// define the morgan middleware
const morgan = Morgan('dev')

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // run morgan before the return response
  await runMiddleware(req, res, morgan)

  // return response to the client
  return res.json({ msg: 'Pong!' })
}
