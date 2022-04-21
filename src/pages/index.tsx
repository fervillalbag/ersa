import React from 'react'
import NextLink from 'next/link'
import { Box, Grid, Heading, Image, Link, Text, Flex } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Layout from '../layout'
import { Description } from '../interfaces/Description'
import { HeaderInfo } from '../interfaces/HeaderInfo'
import { GrowthInfo } from '../interfaces/GrowthInfo'
import { Growth } from '../interfaces/Growths'
import { ReviewInfo } from '../interfaces/ReviewInfo'
import { Review } from '../interfaces/ReviewItem'
import Animation from '../components/Animation'

interface HomeIprops {
  headerInfo: HeaderInfo
  growthInfo: GrowthInfo
  growths: Growth[]
  reviewInfo: ReviewInfo
  reviews: Review[]
}

export const getStaticProps: GetStaticProps = async () => {
  const URL =
    process.env.NEXT_PUBLIC_ENV !== 'development'
      ? process.env.URL_ROOT
      : process.env.URL_ROOT_LOCAL

  try {
    const responseHeaderInfo = await fetch(`${URL}/api/header`)
    const headerInfo = await responseHeaderInfo.json()

    const responseGrowthInfo = await fetch(`${URL}/api/growthInfo`)
    const growthInfo = await responseGrowthInfo.json()

    const responseGrowths = await fetch(`${URL}/api/growthItems`)
    const growths = await responseGrowths.json()

    const responseReviewInfo = await fetch(`${URL}/api/reviewInfo`)
    const reviewInfo = await responseReviewInfo.json()

    const responseReviews = await fetch(`${URL}/api/review`)
    const reviews = await responseReviews.json()

    return {
      props: {
        headerInfo: headerInfo.data,
        growthInfo: growthInfo.data,
        growths: growths.data,
        reviewInfo: reviewInfo.data,
        reviews: reviews.data
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error)
  }
}

const Home: React.FC<HomeIprops> = ({
  headerInfo,
  growthInfo,
  growths,
  reviewInfo,
  reviews
}) => {
  return (
    <Layout title="Home Page">
      <Animation>
        <Grid
          gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          maxWidth="1170px"
          width="90%"
          margin="0 auto"
          padding="2rem 0 4rem 0"
          alignItems="center"
          gap="2rem 4rem"
          position="relative"
          _before={{
            content: `''`,
            display: 'block',
            width: { base: '20rem', md: '30rem' },
            height: { base: '25rem', md: '60rem' },
            position: 'absolute',
            right: { base: 0, md: -100 },
            bottom: { base: 440, md: 0 },
            backgroundColor: 'hsl(13, 100%, 96%)',
            borderRadius: '30rem',
            zIndex: -100,
            transform: 'rotate(40deg)'
          }}
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
            <LazyLoadImage
              src={headerInfo.image}
              width="100%"
              alt=""
              effect="blur"
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
      </Animation>

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
          {reviewInfo.title}
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
          {reviews.map((review: Review) => (
            <Box
              backgroundColor="gray"
              padding="1.5rem"
              rounded="md"
              key={review._id}
            >
              <Grid marginTop="-4rem" placeItems="center">
                <Image src={review.avatar} alt="" width="100px" />
              </Grid>
              <Box marginTop="1rem">
                <Text
                  fontWeight="bold"
                  color="dark-blue"
                  textAlign="center"
                  marginBottom="0.7rem"
                  fontSize="1.125rem"
                >
                  {review.name}
                </Text>
                {review.description.map((item: Description) => (
                  <Text
                    color="dark-grayish-blue"
                    textAlign="center"
                    key={item.id}
                  >
                    {item.text}
                  </Text>
                ))}
              </Box>
            </Box>
          ))}
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
