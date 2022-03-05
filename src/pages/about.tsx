import React from 'react'
import { Grid, Box, Heading, Text, Image } from '@chakra-ui/react'

import Layout from '../layout'

const About: React.FC = () => {
  return (
    <Layout>
      <Grid
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        maxWidth="1170px"
        margin="0 auto"
        width="90%"
        paddingBottom="4rem"
        gap="2rem 5rem"
      >
        <Box>
          <Heading as="h3" color="dark-blue" marginBottom="2rem">
            A clear mission
          </Heading>

          <Text
            color="dark-grayish-blue"
            marginBottom="2rem"
            fontWeight="semibold"
          >
            We have the winning combination of the most comprehensive packaged
            banking functionality and the most advanced, native and cloud
            agnostic technology, helping banks transform faster at the lowest
            cost of implementation.
          </Text>

          <Text
            color="dark-grayish-blue"
            marginBottom="2rem"
            fontWeight="semibold"
          >
            We equip banks with modern, highly scalable and profitable
            technology, so that they have the freedom and flexibility to
            innovate for their clients. Our software is native and cloud
            agnostic; It works in any cloud, from any provider, with the same
            fluidity as it does on-site. Our architecture is API-first, which
            enables banks to collaborate and easily integrate with third-party
            products and fintechs in our MarketPlace.
          </Text>

          <Text
            color="dark-grayish-blue"
            marginBottom="2rem"
            fontWeight="semibold"
          >
            We use distributed databases to help banks reduce their
            infrastructure costs, with elastic scaling, active backup, and
            optimized security. We use AI, machine learning and predictive
            analytics to support banks in achieving greater efficiencies and
            resilience in their businesses. We support developers through the
            Temenos Developer Portal, with more than 700 published APIs.
          </Text>

          <Text
            color="dark-grayish-blue"
            marginBottom="2rem"
            fontWeight="semibold"
          >
            We also streamline banks` time to market, thanks to our packaged
            model banking functionality. We understand the particularities of
            each place - regulations, taxes and language - and we include them
            in our country model banks. We have more than 25 years of experience
            in developing software in this way. Our continuous deployment
            methodology makes it easy for customers to roll out their changes
            and business innovation quickly and securely, essentially by coding
            in the morning what they will roll out in the afternoon.
          </Text>
        </Box>
        <Box>
          <Image src="/about-work.jpeg" alt="" />
        </Box>
      </Grid>
    </Layout>
  )
}

export default About
