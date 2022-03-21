import React from 'react'
import { Box, Grid, Text, Flex } from '@chakra-ui/react'
import Navbar from '../../components/admin/Navbar'
import { FaUserAlt } from 'react-icons/fa'

const AdminLayout: React.FC = ({ children }) => {
  return (
    <Grid gridTemplateColumns="285px 1fr">
      <Navbar />
      <Box backgroundColor="gray" height="8000px" padding="0 2rem">
        <Flex
          padding="1.25rem 0"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight="bold" color="dark-blue" fontSize="1.5rem">
            Hola Fernando!
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
        <Box>{children}</Box>
      </Box>
    </Grid>
  )
}

export default AdminLayout
