import React from 'react'
import { Box, Grid } from '@chakra-ui/react'

import Layout from '../../layout'
import Product from '../../components/Product'
import Animation from '../../components/Animation'

const Products: React.FC = () => {
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
            <Product
              product={{
                name: '',
                code: '',
                category: '',
                image: '',
                _id: '',
                quantity: 0,
                price: 0,
                description: []
              }}
            />
          </Grid>
        </Box>
      </Animation>
    </Layout>
  )
}

export default Products
