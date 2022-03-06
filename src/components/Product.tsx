import React from 'react'
import NextLink from 'next/link'
import { Box, Text, Button, Link, Image, Flex } from '@chakra-ui/react'

import { RiShoppingCartFill } from 'react-icons/ri'

const Product: React.FC = () => {
  return (
    <Box>
      <NextLink href="/">
        <Link
          display="block"
          padding="1.5rem"
          border="1px solid hsl(0, 0%, 90%)"
        >
          <Image src="/product.jpeg" alt="" width="100%" objectFit="cover" />
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
            72171
          </Text>
        </Flex>
        <Text
          fontWeight="semibold"
          color="dark-blue"
          marginTop="0.3rem"
          fontSize="1.2rem"
        >
          Sunglasses for summer
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
              $20
            </Text>
          </Box>
          <Box>
            <Button
              width="3.2rem"
              height="3.2rem"
              backgroundColor="bright-red"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _focus={{ shadow: 0 }}
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
