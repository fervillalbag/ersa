import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

import Layout from '../layout/admin'

const AdminIndexPage: NextPage = () => {
  return (
    <Box>
      <Layout>
        <Text>Admin Index</Text>
      </Layout>
    </Box>
  )
}

export default AdminIndexPage
