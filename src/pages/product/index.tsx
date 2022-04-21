import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import Layout from '../../layout'
import Product from '../../components/Product'
import Animation from '../../components/Animation'
import { ProductType } from '../../interfaces/Product'

interface ProductsIprops {
  products: ProductType[]
}

export const getStaticProps: GetStaticProps = async () => {
  const URL =
    process.env.NEXT_PUBLIC_ENV !== 'development'
      ? process.env.URL_ROOT
      : process.env.URL_ROOT_LOCAL

  try {
    const responseProducts = await fetch(`${URL}/api/product`)
    const products = await responseProducts.json()

    return {
      props: {
        products: products.data
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error)
  }
}

const Products: React.FC<ProductsIprops> = ({ products }) => {
  return (
    <Layout title="Products">
      <Animation>
        <Box maxWidth="1170px" margin="0 auto" width="90%" paddingBottom="4rem">
          <Grid
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap="2rem 3rem"
          >
            {products.map((item: ProductType) => (
              <Product key={item._id} product={item} />
            ))}
          </Grid>
        </Box>
      </Animation>
    </Layout>
  )
}

export default Products
