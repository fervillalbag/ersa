import React from 'react'
import { Grid, Box, Button, Text, Image } from '@chakra-ui/react'
import { BsFillTrashFill } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartCardProd: React.FC = () => {
  return (
    <Box borderBottom="1px solid #d3d3d3" paddingBottom="1.375rem">
      <Grid
        gridTemplateColumns="40px 80px 1fr auto"
        gap="0.75rem"
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
        <Box>
          <Image
            src="/product.jpeg"
            width="100%"
            height="100%"
            objectFit="cover"
            alt=""
          />
        </Box>
        <Box>
          <Text fontSize="0.85rem">Descr</Text>
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
            width="1.8rem"
            height="1.8rem"
            _focus={{ shadow: 0 }}
            fontSize="0.7rem"
            rounded="4px"
          >
            <FaMinus />
          </Button>
          <Box padding="0.35rem 0">
            <Text fontWeight="bold" fontSize="0.8rem" textAlign="center">
              2
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
            width="1.8rem"
            height="1.8rem"
            _focus={{ shadow: 0 }}
            fontSize="0.7rem"
            rounded="4px"
          >
            <FaPlus />
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default CartCardProd
