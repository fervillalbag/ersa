import { Value } from '../interfaces'

export const getValues = async (): Promise<Value[] | null> => {
  try {
    const URL = process.env.URL_ROOT_LOCAL
    const response = await fetch(`${URL}/api/values`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
