import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../../lib'
import { Value } from '../../../../models'
import { Value as ValueType } from '../../../interfaces/Value'

type Data = { msg: string } | ValueType | ValueType[]

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  switch (req.method) {
    case 'DELETE':
      return deleteValue(res, req)

    case 'GET':
      return getValue(res, req)

    case 'PUT':
      return updateValue(res, req)

    default:
      break
  }
}

export default handler

const deleteValue = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    await db.connected()
    const valueDeleted = await Value.findOneAndDelete({ _id: req.query.id })
    await db.disconnect()

    if (!valueDeleted) {
      return res.status(400).json({ msg: 'Value not deleted' })
    }

    return res.status(201).json({ msg: 'Deleted!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const getValue = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  try {
    await db.connected()
    const value = await Value.findOne({ _id: req.query.id })

    if (!value) {
      return res.status(400).json({ msg: 'Value not found' })
    }

    await db.disconnect()
    return res.status(200).json(value)
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}

const updateValue = async (
  res: NextApiResponse<Data>,
  req: NextApiRequest
): Promise<void> => {
  const { title, description } = req.body

  try {
    await db.connected()
    await Value.findOneAndUpdate({ _id: req.query.id }, { title, description })
    await db.disconnect()
    return res.status(200).json({ msg: 'Updated!' })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ msg: 'Some error!' })
  }
}
