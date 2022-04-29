import { HeaderInfo } from '../interfaces/HeaderInfo'

export const getHeaderInfo = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/api/headerInfo')
    return response.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createHeaderInfo = async (data: HeaderInfo): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/api/headerInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return response.json()
  } catch (error) {
    console.log(error)
    return null
  }
}
