import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Link
} from '@chakra-ui/react'

const Footer: React.FC = () => {
  return (
    <Box backgroundColor="hsl(233, 12%, 13%)" padding="72px 0">
      <Grid
        maxWidth="1200px"
        width="90%"
        margin="0 auto"
        gridRowGap={{ base: '32px', lg: '0' }}
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: '1fr 3fr 2fr'
        }}
        templateRows={{
          base: 'repeat(5, max-content)',
          md: 'repeat(3, max-content)',
          lg: '1fr max-content'
        }}
      >
        <NextLink href="/">
          <Link
            gridColumn="1/2"
            gridRow="1/2"
            margin={{ base: '0 auto', md: 'initial' }}
          >
            <Image src="/logowhite.svg" />
          </Link>
        </NextLink>

        <Flex justifyContent="space-evenly">
          <Flex direction="column">
            <NextLink href="/">
              <Text
                as="a"
                color="#fff"
                marginBottom="16px"
                cursor="pointer"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Home
              </Text>
            </NextLink>
            <NextLink href="/">
              <Text
                as="a"
                color="#fff"
                marginBottom="16px"
                cursor="pointer"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Pricing
              </Text>
            </NextLink>
            <NextLink href="/">
              <Text
                as="a"
                color="#fff"
                marginBottom="16px"
                cursor="pointer"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Products
              </Text>
            </NextLink>
            <NextLink href="/">
              <Text as="a" color="#fff" cursor="pointer">
                About Us
              </Text>
            </NextLink>
          </Flex>
          <Flex direction="column">
            <NextLink href="/">
              <Text
                as="a"
                color="#fff"
                marginBottom="16px"
                cursor="pointer"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Careers
              </Text>
            </NextLink>
            <NextLink href="/">
              <Text
                as="a"
                color="#fff"
                marginBottom="16px"
                cursor="pointer"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Community
              </Text>
            </NextLink>
            <NextLink href="/">
              <Text as="a" color="#fff" cursor="pointer">
                Privacy Policy
              </Text>
            </NextLink>
          </Flex>
        </Flex>

        <Box gridRow={{ base: '3/4', lg: 'initial' }}>
          <Grid
            templateColumns={{ base: '1fr 80px', lg: '1fr 100px' }}
            gridColumnGap="16px"
          >
            <Input
              color="hsl(228, 39%, 23%)"
              border="none"
              backgroundColor="#fff"
              height="50px"
              borderRadius="50px"
              padding="0 20px"
              _focus={{ outline: 'none' }}
              placeholder="Updates in your inbox.."
            />
            <Button
              display="block"
              width="100%"
              background="hsl(12, 88%, 59%)"
              color="#fff"
              fontWeight="500"
              height="50px"
              textAlign="center"
              rounded={30}
              _hover={{ cursor: 'pointer' }}
            >
              <Text>Go</Text>
            </Button>
          </Grid>
        </Box>

        <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
          <NextLink href="/">
            <Box as="a" marginRight="16px">
              <Image src="/icon-facebook.svg" />
            </Box>
          </NextLink>
          <NextLink href="/">
            <Box as="a" marginRight="16px">
              <Image src="/icon-youtube.svg" />
            </Box>
          </NextLink>
          <NextLink href="/">
            <Box as="a" marginRight="16px">
              <Image src="/icon-pinterest.svg" />
            </Box>
          </NextLink>
          <NextLink href="/">
            <Box as="a" marginRight="16px">
              <Image src="/icon-twitter.svg" />
            </Box>
          </NextLink>
          <NextLink href="/">
            <Box as="a">
              <Image src="/icon-instagram.svg" />
            </Box>
          </NextLink>
        </Flex>

        <Flex
          gridColumn={{ base: 'initial', lg: '3/4' }}
          justifyContent={{ base: 'center', lg: 'flex-end' }}
          alignItems="center"
        >
          <Text color="hsl(227, 12%, 61%)" textAlign="right">
            Copyright 2020. All Rights Reserved
          </Text>
        </Flex>
      </Grid>
    </Box>
  )
}

export default Footer
