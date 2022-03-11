import React from 'react'
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Layout from '../../layout'
import Animation from '../../components/Animation'

const Product: React.FC = () => {
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
              <LazyLoadImage src="/product.jpeg" alt="" width="100%" />
            </Box>
          </Flex>
          <Box>
            <Text fontWeight="bold" fontSize="1.7rem" color="dark-blue">
              Sunglasses for summer
            </Text>

            <Flex>
              <Text color="dark-grayish-blue">Code:</Text>
              <Text color="dark-grayish-blue" marginLeft="0.25rem">
                4129
              </Text>
            </Flex>

            <Text fontWeight="bold" fontSize="2rem" color="dark-blue">
              $20
            </Text>

            <Box maxWidth={{ base: '100%', md: '80%' }}>
              <Text
                color="dark-grayish-blue"
                marginTop="1rem"
                fontWeight="semibold"
              >
                The updated Silvani Anorak features weatherproof but breathable,
                DryVent™ 2L fabric and a convenient, secure kangaroo pocket for
                powder day essentials.
              </Text>
              <Text
                color="dark-grayish-blue"
                marginTop="1rem"
                fontWeight="semibold"
              >
                The updated Silvani Anorak features weatherproof but breathable,
                DryVent™ 2L fabric and a convenient, secure kangaroo pocket for
                powder day essentials.
              </Text>
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
                12
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