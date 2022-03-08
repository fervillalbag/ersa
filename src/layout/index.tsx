import React from 'react'
import { Box } from '@chakra-ui/react'
import Header from 'next/head'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

interface LayoutIprops {
  title?: string
}

const Layout: React.FC<LayoutIprops> = ({ children, title }) => {
  return (
    <Box>
      <Header>
        <title>{title || 'Landing Ersa'}</title>
      </Header>

      <Cart />
      <Navbar />
      {children}
      <Footer />
    </Box>
  )
}

export default Layout
