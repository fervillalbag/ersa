// import type { NextFetchEvent } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'

// define the morgan middleware

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // run morgan before the return response

  // return response to the client
  return res.json({ msg: 'Page not found!' })
}
