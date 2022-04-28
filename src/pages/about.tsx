import React from 'react'
import { Grid, Box, Heading, Text } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Layout from '../layout'
import Animation from '../components/Animation'

const About: React.FC = () => {
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
              {/* {aboutInfo.title} */}
            </Heading>

            <Box>
              <Text color="dark-grayish-blue" marginBottom="2rem">
                {/* {item.text} */}
              </Text>
            </Box>
          </Box>
          <Box className="image">
            <LazyLoadImage loading="lazy" effect="blur" src={''} alt="" />
          </Box>
        </Grid>
      </Animation>
    </Layout>
  )
}

export default About
