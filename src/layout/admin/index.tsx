import React from 'react'
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react'
import Navbar from '../../components/admin/Navbar'
import { FaArrowLeft, FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/dist/client/router'

interface LayoutIprops {
  title?: string
  showNavbar?: boolean
  onClick?: () => void
}

const AdminLayout: React.FC<LayoutIprops> = ({
  children,
  title,
  showNavbar = true,
  onClick
}) => {
  const router = useRouter()

  return (
    <Grid gridTemplateColumns="285px 1fr">
      <Box>
        {showNavbar ? (
          <Navbar />
        ) : (
          <Box padding="2rem 3rem">
            <Button
              display="block"
              border="1px solid"
              borderColor="dark-blue"
              rounded="4px"
              width="100%"
              onClick={onClick}
              _focus={{ shadow: 0 }}
            >
              <Flex justifyContent="center" alignItems="center">
                <Text color="dark-blue">
                  <FaArrowLeft />
                </Text>
                <Text color="dark-blue" marginLeft="10px">
                  Volver
                </Text>
              </Flex>
            </Button>
          </Box>
        )}
      </Box>
      <Box backgroundColor="gray" padding="0 2rem" minHeight="100vh">
        <Flex
          padding="1.25rem 0"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontWeight="semibold"
            color="dark-grayish-blue"
            fontSize="1.5rem"
          >
            {router.pathname === '/admin' ? 'Hola Fernando!' : title}
          </Text>
          <Flex
            width="3rem"
            height="3rem"
            backgroundColor="dark-blue"
            rounded="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
          >
            <FaUserAlt color="white" />
          </Flex>
        </Flex>
        <Box paddingBottom="4rem">{children}</Box>
      </Box>
    </Grid>
  )
}

export default AdminLayout
