import React from 'react'
import { Box, Grid, Text, Flex } from '@chakra-ui/react'
import Navbar from '../../components/admin/Navbar'
import { FaUserAlt } from 'react-icons/fa'
import { useRouter } from 'next/dist/client/router'

interface LayoutIprops {
  title?: string
}

const AdminLayout: React.FC<LayoutIprops> = ({ children, title }) => {
  const router = useRouter()

  return (
    <Grid gridTemplateColumns="285px 1fr">
      <Navbar />
      <Box backgroundColor="gray" padding="0 2rem">
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
