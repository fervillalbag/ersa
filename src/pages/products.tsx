import React from 'react'
import { Box, Grid } from '@chakra-ui/react'

import Layout from '../layout'
import Product from '../components/Product'
import Animation from '../components/Animation'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { ProductType } from '../interfaces/Product'

interface ProductsIprops {
  products: ProductType[]
}

export const getStaticProps: GetStaticProps = async () => {
  const URL = process.env.URL_ROOT

  try {
    const responseProducts = await axios.get(`${URL}/api/product`)
    const products = await responseProducts.data

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
