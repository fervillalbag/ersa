import React from 'react'
import axios from 'axios'
import { Grid, Box, Heading, Text } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Layout from '../layout'
import { GetStaticProps } from 'next'
import { AboutInfo } from '../interfaces/AboutInfo'
import { Description } from '../interfaces/Description'
import Animation from '../components/Animation'

interface AboutIprops {
  aboutInfo: AboutInfo
}

export const getStaticProps: GetStaticProps = async () => {
  const URL = process.env.URL_ROOT

  try {
    const responseAboutInfo = await axios.get(`${URL}/api/about`)
    const aboutInfo = await responseAboutInfo.data

    return {
      props: {
        aboutInfo: aboutInfo.data
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error)
  }
}

const About: React.FC<AboutIprops> = ({ aboutInfo }) => {
  return (
    <Layout title="About Us">
      <Animation>
        <Grid
          gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          maxWidth="1170px"
          margin="0 auto"
          width="90%"
          paddingTop={{ base: '0', lg: '2rem' }}
          paddingBottom="4rem"
          gap="2rem 5rem"
        >
          <Box>
            <Heading as="h3" color="dark-blue" marginBottom="2rem">
              {aboutInfo.title}
            </Heading>

            <Box>
              {aboutInfo.description.map((item: Description) => (
                <Text
                  key={item.id}
                  color="dark-grayish-blue"
                  marginBottom="2rem"
                >
                  {item.text}
                </Text>
              ))}
            </Box>
          </Box>
          <Box className="image">
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              src="/about-work.jpeg"
              alt=""
            />
          </Box>
        </Grid>
      </Animation>
    </Layout>
  )
}

export default About
