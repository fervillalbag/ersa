export const getGrowthInfo = async (): Promise<void> => {
  try {
    const URL =
      process.env.NEXT_PUBLIC_ENV !== 'development'
        ? process.env.URL_ROOT
        : process.env.URL_ROOT_LOCAL

    const responsegrowthInfo = await fetch(`${URL}/api/growthinfo`)
    const growthinfo = await responsegrowthInfo.json()

    return growthinfo.data
  } catch (error) {
    console.log(error)
    return null
  }
}
