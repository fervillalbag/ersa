import React from 'react'
import { Text } from '@chakra-ui/react'
import { NextPage } from 'next'

import Layout from '../layout/admin'

const AdminIndexPage: NextPage = () => {
  return (
    <Layout>
      <Text>Admin Index</Text>
    </Layout>
  )
}

export default AdminIndexPage
