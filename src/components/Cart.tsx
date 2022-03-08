import React from 'react'
import { Box, Button, Text, Flex } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

import CartCardProd from './CartCardProd'

const Cart: React.FC = () => {
  return (
    <>
      <Box
        backgroundColor="rgba(0,0,0,0.5)"
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="300"
      />
      <Box
        position="fixed"
        backgroundColor="white"
        left="0"
        top="0"
        width="320px"
        height="100vh"
        zIndex="350"
      >
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="0.9rem 1.25rem"
          >
            <Text fontSize="1.4rem" fontWeight="bold">
              Cart shopping
            </Text>
            <Button
              display="flex"
              justifyContent="center"
              alignItems="center"
              minWidth="initial"
              _focus={{ shadow: 0 }}
              padding="0"
              margin="0"
            >
              <Text
                as="span"
                textAlign="center"
                display="block"
                fontSize="1.25rem"
                color="red.500"
              >
                <FaTimes />
              </Text>
            </Button>
          </Flex>

          <Box padding="0 1.25rem">
            <CartCardProd />
          </Box>

          <Box></Box>
        </Box>
      </Box>
    </>
  )
}

export default Cart
