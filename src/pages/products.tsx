import React from 'react'
import { Box, Grid } from '@chakra-ui/react'

import Layout from '../layout'
import Product from '../components/Product'

const Products: React.FC = () => {
  return (
    <Layout title="Products">
      <Box maxWidth="1170px" margin="0 auto" width="90%" paddingBottom="4rem">
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap="2rem 3rem"
        >
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Grid>
      </Box>
    </Layout>
  )
}

export default Products
