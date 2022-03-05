import React, { useContext } from 'react'
import NextLink from 'next/link'
import { Box, Grid, Image, Flex, Link, Button } from '@chakra-ui/react'
import { FaBars, FaTimes } from 'react-icons/fa'

import { NavbarContext } from '../context/Navbar'

const Navbar: React.FC = () => {
  const { showNavbar, setShowNavbar } = useContext(NavbarContext)

  return (
    <Box maxWidth="1170px" margin="0 auto" width="90%" padding="2rem 0">
      <Grid
        gridTemplateColumns={{ base: '150px 1fr', lg: '150px 1fr 200px' }}
        alignItems="center"
      >
        <Box>
          <NextLink href="/">
            <Link>
              <Image src="/logo.svg" alt="" width="100%" objectFit="contain" />
            </Link>
          </NextLink>
        </Box>

        <Button
          display={{ base: 'inline-block', lg: 'none' }}
          justifySelf="end"
          fontSize="24px"
          color="dark-blue"
          _focus={{ boxShadow: 0 }}
          onClick={() => setShowNavbar(true)}
        >
          <FaBars />
        </Button>

        <Flex
          alignItems="center"
          justifyContent="center"
          position={{ base: 'fixed', lg: 'initial' }}
          transform={{
            base: `${showNavbar ? 'translateY(0)' : 'translateY(2000px)'}`,
            lg: 'initial'
          }}
          backgroundColor={{ base: 'white', lg: 'transparent' }}
          width={{ base: '100vw', lg: 'auto' }}
          height={{ base: '100vh', lg: 'auto' }}
          flexDirection={{ base: 'column', lg: 'row' }}
          top={{ base: 0, lg: 'initial' }}
          left={{ base: 0, lg: 'initial' }}
          zIndex="200"
        >
          <Button
            display={{ base: 'block', lg: 'none' }}
            fontSize="24px"
            color="red.400"
            position="fixed"
            top="32px"
            right="20px"
            _focus={{ boxShadow: '0' }}
            onClick={() => setShowNavbar(false)}
          >
            <FaTimes />
          </Button>

          <NextLink href="/" passHref>
            <Link
              color="dark-blue"
              fontWeight="semibold"
              marginRight={{ base: 0, lg: '30px' }}
              marginBottom={{ base: '15px', lg: 0 }}
              fontSize={{ base: '24px', lg: '16px' }}
              _hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
              _focus={{ shadow: 0 }}
            >
              Home
            </Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link
              color="dark-blue"
              fontWeight="semibold"
              marginRight={{ base: 0, lg: '30px' }}
              marginBottom={{ base: '15px', lg: 0 }}
              fontSize={{ base: '24px', lg: '16px' }}
              _hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
              _focus={{ shadow: 0 }}
            >
              Products
            </Link>
          </NextLink>
          <NextLink href="/about" passHref>
            <Link
              color="dark-blue"
              fontWeight="semibold"
              marginRight={{ base: 0, lg: '30px' }}
              marginBottom={{ base: '15px', lg: 0 }}
              fontSize={{ base: '24px', lg: '16px' }}
              _hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
              _focus={{ shadow: 0 }}
            >
              About Us
            </Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link
              color="dark-blue"
              fontWeight="semibold"
              marginRight={{ base: 0, lg: '30px' }}
              marginBottom={{ base: '15px', lg: 0 }}
              fontSize={{ base: '24px', lg: '16px' }}
              _hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
              _focus={{ shadow: 0 }}
            >
              Plans
            </Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link
              color="dark-blue"
              fontWeight="semibold"
              fontSize={{ base: '24px', lg: '16px' }}
              _hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
              _focus={{ shadow: 0 }}
            >
              Community
            </Link>
          </NextLink>
        </Flex>

        <Flex display={{ base: 'none', lg: 'flex' }} justifyContent="flex-end">
          <NextLink href="/" passHref>
            <Link
              display="inline-block"
              backgroundColor="bright-red"
              color="white"
              padding="12px 30px"
              rounded="30px"
              fontWeight="semibold"
              fontSize="14px"
              _hover={{ textDecoration: 'none' }}
            >
              Get Started
            </Link>
          </NextLink>
        </Flex>
      </Grid>
    </Box>
  )
}

export default Navbar
