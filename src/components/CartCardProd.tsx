import React from 'react'
import { Grid, Box, Button, Text, Image } from '@chakra-ui/react'
import { BsFillTrashFill } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { ProductType } from '../interfaces/Product'
import { useCart } from '../hooks/useCart'

interface CartCardProdIprops {
  product: ProductType
}

const CartCardProd: React.FC<CartCardProdIprops> = ({ product }) => {
  const { handleAddCart, handleDeleteCart } = useCart()

  return (
    <Box
      borderBottom="1px solid #ebebeb"
      paddingBottom="1.375rem"
      marginBottom="1.375rem"
    >
      <Grid
        gridTemplateColumns="40px 80px 1fr auto"
        gap="0.8rem"
        alignItems="center"
      >
        <Button
          minWidth="initial"
          width="2.4rem"
          height="2.4rem"
          backgroundColor="red.500"
          rounded="4px"
          color="white"
        >
          <Text>
            <BsFillTrashFill />
          </Text>
        </Button>
        <Box height="100%">
          <Image
            src={product.image}
            width="100%"
            height="100%"
            objectFit="cover"
            alt=""
          />
        </Box>
        <Box alignSelf="flex-start">
          <Text fontSize="0.85rem">
            {product?.name.slice(0, 30)}
            {product?.name.length >= 30 && '...'}
          </Text>
          <Text marginTop="0.25rem" fontSize="0.85rem" fontWeight="bold">
            ${product.price}
          </Text>
        </Box>
        <Box>
          <Button
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="bright-red"
            color="white"
            padding="0"
            minWidth="initial"
            width="1.75rem"
            height="1.75rem"
            _focus={{ shadow: 0 }}
            fontSize="0.7rem"
            rounded="4px"
            onClick={() => handleDeleteCart(product._id)}
          >
            <FaMinus />
          </Button>
          <Box padding="0.35rem 0">
            <Text fontWeight="bold" fontSize="0.8rem" textAlign="center">
              {product.qty}
            </Text>
          </Box>
          <Button
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="bright-red"
            color="white"
            padding="0"
            minWidth="initial"
            width="1.75rem"
            height="1.75rem"
            _focus={{ shadow: 0 }}
            fontSize="0.7rem"
            rounded="4px"
            onClick={() => handleAddCart(product)}
          >
            <FaPlus />
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default CartCardProd
