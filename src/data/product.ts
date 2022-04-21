import { PathProduct, ProductType } from '../interfaces/Product'

export const productData = async (id: string): Promise<void> => {
  const URL =
    process.env.NEXT_PUBLIC_ENV !== 'development'
      ? process.env.URL_ROOT
      : process.env.URL_ROOT_LOCAL

  try {
    const responseProduct = await fetch(`${URL}/api/product/${id}`)
    const product = await responseProduct.json()

    return product.data
  } catch (error) {
    console.log(error)
  }
}

export const productDataPaths = async (): Promise<PathProduct[]> => {
  const URL =
    process.env.NEXT_PUBLIC_ENV !== 'development'
      ? process.env.URL_ROOT
      : process.env.URL_ROOT_LOCAL

  try {
    const responseProducts = await fetch(`${URL}/api/product`)
    const products = await responseProducts.json()

    const paths = products.data.map((product: ProductType) => ({
      params: { id: product._id.toString() }
    }))

    return paths
  } catch (error) {
    console.log(error)
  }
}
