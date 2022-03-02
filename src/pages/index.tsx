import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, Heading, Image, Link, Text } from '@chakra-ui/react'

import Layout from '../layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <Box
        position="absolute"
        zIndex="-1"
        right={{ base: '-30rem', lg: '-12rem' }}
        top={{ base: '-24rem', lg: '-16rem' }}
      >
        <Image src="/bg-tablet-pattern.svg" alt="" />
      </Box>

      <Grid
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        maxWidth="1170px"
        width="90%"
        margin="0 auto"
        padding="2rem 0 4rem 0"
        alignItems="center"
        gap="2rem 4rem"
      >
        <Box order={{ base: '2', lg: 'initial' }}>
          <Heading
            as="h1"
            fontSize={{ base: '2.8rem', lg: '3.6rem' }}
            color="dark-blue"
          >
            Bring everyone together to build better products.
          </Heading>
          <Text
            color="dark-grayish-blue"
            fontSize="18px"
            marginTop="1rem"
            maxWidth={{ base: '100%', lg: '65%' }}
          >
            Manage makes it simple for software teams to plan day-to-day tasks
            while keeping the larger team goals in view
          </Text>

          <NextLink href="/" passHref>
            <Link
              display="inline-block"
              backgroundColor="bright-red"
              color="white"
              padding="12px 30px"
              rounded="30px"
              fontWeight="semibold"
              fontSize="14px"
              marginTop="1rem"
              _hover={{ textDecoration: 'none' }}
            >
              Get Started
            </Link>
          </NextLink>
        </Box>
        <Box>
          <Image
            src="/illustration-intro.svg"
            width="100%"
            objectFit="cover"
            alt=""
          />
        </Box>
      </Grid>
    </Layout>
  )
}

export default Home
