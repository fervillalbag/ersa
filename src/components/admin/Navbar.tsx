import React from 'react'
import NextLink from 'next/link'
import { Box, Flex, Text, Link } from '@chakra-ui/react'
import { RiHome4Line } from 'react-icons/ri'
import { GiBrain } from 'react-icons/gi'
import { VscCommentDiscussion } from 'react-icons/vsc'
import { MdOutlineLocalGroceryStore } from 'react-icons/md'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { FaRegImages } from 'react-icons/fa'
import { useRouter } from 'next/dist/client/router'

const Navbar: React.FC = () => {
  const router = useRouter()
  console.log(router.pathname)

  return (
    <Box height="100vh" position="relative">
      <Box
        // backgroundColor="blue"
        width="285px"
        height="full"
        position="fixed"
        overflowY="auto"
      >
        <Flex padding="2rem 0" justifyContent="center">
          <Text fontWeight="bold" fontSize="2rem" color="dark-blue">
            Admin
          </Text>
        </Flex>

        <Box>
          <NextLink href="/admin">
            <Link
              display="flex"
              alignItems="center"
              padding="1rem 1.75rem"
              color={
                router.pathname === '/admin' ? 'dark-blue' : 'dark-grayish-blue'
              }
              _hover={{
                textDecoration: 'none',
                backgroundColor:
                  router.pathname === '/admin' ? 'white' : 'hover-gray'
              }}
            >
              <RiHome4Line color="inherit" fontSize="1.5rem" />
              <Text
                as="span"
                display="block"
                fontWeight="semibold"
                color="inherit"
                marginLeft="1.25rem"
                fontSize="1.2rem"
              >
                Home
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/admin/header">
            <Link
              display="flex"
              alignItems="center"
              padding="1rem 1.75rem"
              color={
                router.pathname === '/admin/header'
                  ? 'dark-blue'
                  : 'dark-grayish-blue'
              }
              _hover={{
                textDecoration: 'none',
                backgroundColor:
                  router.pathname === '/admin/header' ? 'white' : 'hover-gray'
              }}
            >
              <FaRegImages color="inherit" fontSize="1.5rem" />
              <Text
                as="span"
                display="block"
                fontWeight="semibold"
                color="inherit"
                marginLeft="1.25rem"
                fontSize="1.2rem"
              >
                Header
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/admin/growth">
            <Link
              display="flex"
              alignItems="center"
              padding="1rem 1.75rem"
              color={
                router.pathname === '/admin/growth'
                  ? 'dark-blue'
                  : 'dark-grayish-blue'
              }
              _hover={{
                textDecoration: 'none',
                backgroundColor:
                  router.pathname === '/admin/growth' ? 'white' : 'hover-gray'
              }}
            >
              <GiBrain color="inherit" fontSize="1.5rem" />
              <Text
                as="span"
                display="block"
                fontWeight="semibold"
                color="inherit"
                marginLeft="1.25rem"
                fontSize="1.2rem"
              >
                Growth
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/admin/community">
            <Link
              display="flex"
              alignItems="center"
              padding="1rem 1.75rem"
              color={
                router.pathname === '/admin/community'
                  ? 'dark-blue'
                  : 'dark-grayish-blue'
              }
              _hover={{
                textDecoration: 'none',
                backgroundColor:
                  router.pathname === '/admin/community'
                    ? 'white'
                    : 'hover-gray'
              }}
            >
              <AiOutlineUsergroupDelete color="inherit" fontSize="1.5rem" />
              <Text
                as="span"
                display="block"
                fontWeight="semibold"
                color="inherit"
                marginLeft="1.25rem"
                fontSize="1.2rem"
              >
                Community
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/admin/review">
            <Link
              display="flex"
              alignItems="center"
              padding="1rem 1.75rem"
              color={
                router.pathname === '/admin/review'
                  ? 'dark-blue'
                  : 'dark-grayish-blue'
              }
              _hover={{
                textDecoration: 'none',
                backgroundColor:
                  router.pathname === '/admin/review' ? 'white' : 'hover-gray'
              }}
            >
              <VscCommentDiscussion color="inherit" fontSize="1.5rem" />
              <Text
                as="span"
                display="block"
                fontWeight="semibold"
                color="inherit"
                marginLeft="1.25rem"
                fontSize="1.2rem"
              >
                Review
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/admin/product">
            <Link
              display="flex"
              alignItems="center"
              padding="1rem 1.75rem"
              color={
                router.pathname === '/admin/product'
                  ? 'dark-blue'
                  : 'dark-grayish-blue'
              }
              _hover={{
                textDecoration: 'none',
                backgroundColor:
                  router.pathname === '/admin/product' ? 'white' : 'hover-gray'
              }}
            >
              <MdOutlineLocalGroceryStore color="inherit" fontSize="1.5rem" />
              <Text
                as="span"
                display="block"
                fontWeight="semibold"
                color="inherit"
                marginLeft="1.25rem"
                fontSize="1.2rem"
              >
                Products
              </Text>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
