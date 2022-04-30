import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../lib'
import { Value } from '../../../models'
import { Value as ValueType } from '../../interfaces/Value'

type Data = { msg: string } | ValueType

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      return createValue(res, req)

    case 'GET':
      return getValue(res)

    case 'PUT':
      return updateValue(res, req)

    default:
      break
  }
}

export default handler

const createValue = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description } = req.body

  const newValue = new Value({
    title,
    description,
    createdAt: Date.now()
  })

  try {
    await db.connected()
    await newValue.save()
    await db.disconnect()
    return res.status(201).json(newValue)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const getValue = async (res: NextApiResponse<Data>): Promise<void> => {
  try {
    await db.connected()
    const value = await Value.findOne()
    await db.disconnect()
    return res.status(200).json(value)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}

const updateValue = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description } = req.body

  try {
    await db.connected()
    await Value.updateOne({}, { title, description })
    await db.disconnect()
    return res.status(200).json({ msg: 'Updated!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500).json({ msg: 'Some error!' })
  }
}
