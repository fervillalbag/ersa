import { HeaderInfo } from '../interfaces'

export const getHeaderInfo = async (): Promise<HeaderInfo | null> => {
  try {
    const URL = process.env.URL_ROOT_LOCAL
    const response = await fetch(`${URL}/api/header`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
