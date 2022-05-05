import React from 'react'
import { GetServerSideProps } from 'next'
import { Box, Grid } from '@chakra-ui/react'

import Layout from '../../layout'
import Product from '../../components/Product'
import Animation from '../../components/Animation'
import { getProducts } from '../../utils'
import { ProductType } from '../../interfaces'

interface ProductPageProps {
  products: ProductType[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProducts()

  if (!products) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products
    }
  }
}

const Products: React.FC<ProductPageProps> = ({ products }) => {
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
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </Grid>
        </Box>
      </Animation>
    </Layout>
  )
}

export default Products
