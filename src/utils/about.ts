import { AboutInfo } from '../interfaces/About'

export const getAboutInfo = async (): Promise<AboutInfo | null> => {
  try {
    const URL = process.env.URL_ROOT_LOCAL
    const response = await fetch(`${URL}/api/about`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
