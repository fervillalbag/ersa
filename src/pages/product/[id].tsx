import React from 'react'
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { GetStaticPaths, GetStaticProps } from 'next'

import Layout from '../../layout'
import Animation from '../../components/Animation'
import { ProductType } from '../../interfaces/Product'
import { Description } from '../../interfaces/Description'

interface ProductIprops {
  product: ProductType
}

const URL = process.env.URL_ROOT

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const responseProducts = await fetch(`${URL}/api/product`)
    const products = await responseProducts.json()

    const paths = products.data.map((product: ProductType) => ({
      params: { id: product._id.toString() }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.log(error)
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  try {
    const responseProduct = await fetch(`${URL}/api/product/${id}`)
    const product = await responseProduct.json()

    return {
      props: {
        product: product.data
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error)
  }
}

const Product: React.FC<ProductIprops> = ({ product }) => {
  return (
    <Layout>
      <Animation>
        <Grid
          gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          maxWidth="1170px"
          margin="0 auto"
          width="90%"
          padding={{ base: '0 0 4rem 0', md: '2rem 0 4rem 0' }}
          gap="2rem 0"
          alignItems="center"
        >
          <Flex justifyContent="center">
            <Box width={{ base: '100%', md: '400px' }}>
              <LazyLoadImage
                src={product.image}
                alt=""
                width="100%"
                height="400px"
                effect="blur"
              />
            </Box>
          </Flex>
          <Box>
            <Text fontWeight="bold" fontSize="1.7rem" color="dark-blue">
              {product.name}
            </Text>

            <Flex>
              <Text color="dark-grayish-blue">Code:</Text>
              <Text color="dark-grayish-blue" marginLeft="0.25rem">
                {product.code}
              </Text>
            </Flex>

            <Text fontWeight="bold" fontSize="2rem" color="dark-blue">
              ${product.price}
            </Text>

            <Box maxWidth={{ base: '100%', md: '80%' }}>
              {product.description.map((item: Description) => (
                <Text key={item.id} color="dark-grayish-blue" marginTop="1rem">
                  {item.text}
                </Text>
              ))}
            </Box>

            <Flex marginTop="1rem">
              <Text color="dark-blue" fontWeight="semibold" fontSize="0.9rem">
                Available:
              </Text>
              <Text
                color="dark-blue"
                fontWeight="bold"
                marginLeft="0.25rem"
                fontSize="0.9rem"
              >
                {product.quantity}
              </Text>
            </Flex>

            <Flex marginTop="1rem">
              <Button
                minWidth="initial"
                backgroundColor="dark-blue"
                display="inline-block"
                fontSize="0.9rem"
                rounded="full"
                fontWeight="bold"
                padding="0.75rem 2rem"
                color="white"
                height="auto"
              >
                Buy now
              </Button>
              <Button
                minWidth="initial"
                borderWidth="2px"
                borderStyle="solid"
                borderColor="bright-red"
                display="inline-block"
                fontSize="1.25rem"
                rounded="full"
                fontWeight="bold"
                padding="0.75rem 2rem"
                color="bright-red"
                marginLeft="1rem"
                height="auto"
              >
                <RiShoppingCartFill />
              </Button>
            </Flex>
          </Box>
        </Grid>
      </Animation>
    </Layout>
  )
}

export default Product
