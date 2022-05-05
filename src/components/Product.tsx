import React from 'react'
import NextLink from 'next/link'
import { Box, Text, Button, Link, Flex } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { RiShoppingCartFill } from 'react-icons/ri'
import { ProductType } from '../interfaces/Product'
import { useCart } from '../hooks/useCart'

interface ProductIprops {
  product: ProductType
}

const Product: React.FC<ProductIprops> = ({ product }) => {
  const { handleAddCart } = useCart()

  return (
    <Box>
      <NextLink href={`/product/${product._id}`}>
        <Link
          display="block"
          padding="1.5rem"
          border="1px solid hsl(0, 0%, 90%)"
        >
          <LazyLoadImage
            src={product.image}
            alt=""
            width="100%"
            height="300px"
            effect="blur"
          />
        </Link>
      </NextLink>

      <Box border="1px solid hsl(0, 0%, 90%)" borderTop="0" padding="1.5rem">
        <Flex alignItems="center">
          <Text fontWeight="semibold" color="dark-grayish-blue">
            Code:
          </Text>
          <Text
            fontWeight="semibold"
            marginLeft="0.25rem"
            color="dark-grayish-blue"
          >
            {product._id.slice(0, 10)}
          </Text>
        </Flex>
        <Text
          fontWeight="semibold"
          color="dark-blue"
          marginTop="0.3rem"
          fontSize="1.2rem"
        >
          {product.name}
        </Text>
        <Flex
          marginTop="1rem"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Text
              fontWeight="semibold"
              fontSize="1.2rem"
              color="dark-grayish-blue"
            >
              Price
            </Text>
            <Text fontWeight="bold" color="dark-blue" fontSize="1.2rem">
              ${product.price}
            </Text>
          </Box>
          <Box>
            <Button
              type="button"
              width="3.2rem"
              height="3.2rem"
              backgroundColor="bright-red"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _focus={{ shadow: 0 }}
              // console.log(product)
              // toast.success('Agregado al carrito')
              onClick={() => handleAddCart(product)}
            >
              <Text fontSize="1.3rem" color="white">
                <RiShoppingCartFill />
              </Text>
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Product
