import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, Heading, Image, Link, Text, Flex } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import Layout from '../layout'
import { Description } from '../interfaces/Description'
import { HeaderInfo } from '../interfaces/HeaderInfo'
import { GrowthInfo } from '../interfaces/GrowthInfo'
import { Growth } from '../interfaces/Growths'

interface HomeIprops {
  headerInfo: HeaderInfo
  growthInfo: GrowthInfo
  growths: Growth[]
}

export const getStaticProps: GetStaticProps = async () => {
  const URL = process.env.URL_ROOT

  const responseHeaderInfo = await fetch(`${URL}/api/header`)
  const headerInfo = await responseHeaderInfo.json()

  const responseGrowthInfo = await fetch(`${URL}/api/growthInfo`)
  const growthInfo = await responseGrowthInfo.json()

  const responseGrowths = await fetch(`${URL}/api/growth`)
  const growths = await responseGrowths.json()

  return {
    props: {
      headerInfo: headerInfo.data,
      growthInfo: growthInfo.data,
      growths: growths.data
    }
  }
}

const Home: React.FC<HomeIprops> = ({
  headerInfo,
  growthInfo,
  growths
}): JSX.Element => {
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
            {headerInfo.title}
          </Heading>

          {headerInfo.description.map((item: Description) => (
            <Text
              key={item.id}
              color="dark-grayish-blue"
              fontSize="1.125rem"
              marginTop="1rem"
              maxWidth={{ base: '100%', lg: '65%' }}
            >
              {item.text}
            </Text>
          ))}

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

      <Grid
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        maxWidth="1170px"
        margin="0 auto"
        width="90%"
        padding={{ base: '3rem 0 6rem 0', lg: '2rem 0 6rem 0' }}
        gap="3rem"
      >
        <Box>
          <Heading
            as="h3"
            fontSize={{ base: '2.2rem', lg: '2.6rem' }}
            color="dark-blue"
          >
            {growthInfo.title}
          </Heading>

          {growthInfo.description.map((item: Description) => (
            <Text
              key={item.id}
              color="dark-grayish-blue"
              fontSize="1.125rem"
              marginTop="1rem"
              maxWidth={{ base: '100%', lg: '65%' }}
            >
              {item.text}
            </Text>
          ))}
        </Box>
        <Box>
          {growths.map((item: Growth, index: number) => (
            <Grid
              key={item._id}
              gridTemplateColumns="70px 1fr"
              gridTemplateRows="repeat(2, auto)"
              gap="1rem"
              marginBottom="2rem"
            >
              <Box gridColumn="1/2">
                <Box
                  backgroundColor="bright-red"
                  color="white"
                  padding="0.45rem 1rem"
                  rounded="full"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="0.9rem"
                >
                  0{index + 1}
                </Box>
              </Box>
              <Box gridColumn="2/3" alignSelf="center">
                <Text fontWeight="bold" color="dark-blue" fontSize="1.2rem">
                  {item.title}
                </Text>
              </Box>
              <Box gridColumn={{ base: '1/3', lg: '2/3' }} gridRow="2/3">
                {item.description.map((itemDescription: Description) => (
                  <Text key={itemDescription.id} color="dark-grayish-blue">
                    {itemDescription.text}
                  </Text>
                ))}
              </Box>
            </Grid>
          ))}
        </Box>
      </Grid>

      <Box
        padding={{ base: '0 0 6rem 0', lg: '3rem 0 6rem 0' }}
        maxWidth="1170px"
        margin="0 auto"
        width="90%"
      >
        <Heading
          as="h3"
          textAlign="center"
          fontSize={{ base: '2.2rem', lg: '2.8rem' }}
          color="dark-blue"
          marginBottom="5rem"
        >
          What they’ve said
        </Heading>

        <Grid
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap="5rem 3rem"
          marginTop="4rem"
        >
          <Box backgroundColor="gray" padding="1.5rem" rounded="md">
            <Grid marginTop="-4rem" placeItems="center">
              <Image src="/avatar-anisha.png" alt="" width="100px" />
            </Grid>
            <Box marginTop="1rem">
              <Text
                fontWeight="bold"
                color="dark-blue"
                textAlign="center"
                marginBottom="0.7rem"
                fontSize="1.125rem"
              >
                Anisha Li
              </Text>
              <Text color="dark-grayish-blue" textAlign="center">
                “Manage has supercharged our team’s workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated.”
              </Text>
            </Box>
          </Box>
          <Box backgroundColor="gray" padding="1.5rem" rounded="md">
            <Grid marginTop="-4rem" placeItems="center">
              <Image src="/avatar-ali.png" alt="" width="100px" />
            </Grid>
            <Box marginTop="1rem">
              <Text
                fontWeight="bold"
                color="dark-blue"
                textAlign="center"
                marginBottom="0.7rem"
                fontSize="1.125rem"
              >
                Ali Bravo
              </Text>
              <Text color="dark-grayish-blue" textAlign="center">
                “We have been able to cancel so many other subscriptions since
                using Manage. There is no more cross-channel confusion and
                everyone is much more focused.”
              </Text>
            </Box>
          </Box>
          <Box backgroundColor="gray" padding="1.5rem" rounded="md">
            <Grid marginTop="-4rem" placeItems="center">
              <Image src="/avatar-richard.png" alt="" width="100px" />
            </Grid>
            <Box marginTop="1rem">
              <Text
                fontWeight="bold"
                color="dark-blue"
                textAlign="center"
                marginBottom="0.7rem"
                fontSize="1.125rem"
              >
                Richard Watts
              </Text>
              <Text color="dark-grayish-blue" textAlign="center">
                “Manage allows us to provide structure and process. It keeps us
                organized and focused. I can’t stop recommending them to
                everyone I talk to!”
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>

      <Box
        backgroundColor="bright-red"
        padding="3rem 0"
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" top={0} left={0}>
          <Image
            src="/bg-simplify-section-desktop.svg"
            width="100%"
            height="100%"
            objectFit="cover"
            alt=""
          />
        </Box>

        <Flex
          maxWidth="1170px"
          margin="0 auto"
          width="90%"
          justifyContent={{ base: 'flex-start', lg: 'space-between' }}
          alignItems="center"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box flex="1">
            <Text
              fontSize={{ base: '2.2rem', lg: '2.8rem' }}
              fontWeight="bold"
              color="white"
              lineHeight={1.2}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Simplify how your team works today.
            </Text>
          </Box>
          <Flex
            flex="1"
            justifyContent="flex-end"
            marginTop={{ base: '1rem', lg: '0' }}
          >
            <NextLink href="/" passHref>
              <Link
                display="inline-block"
                backgroundColor="white"
                color="bright-red"
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
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default Home
