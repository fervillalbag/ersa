import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import Header from 'next/head'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'
import Animation from '../components/Animation'
import { CartStatusContext } from '../context/CartStatus'

interface LayoutIprops {
  title?: string
}

const Layout: React.FC<LayoutIprops> = ({ children, title }) => {
  const { statusCart } = useContext(CartStatusContext)

  return (
    <Box
      height={statusCart ? '100vh' : 'initial'}
      overflowY={statusCart ? 'hidden' : 'initial'}
    >
      <Header>
        <title>{title || 'Landing Ersa'}</title>
      </Header>

      <Cart />
      <Navbar />
      <Box
        height={statusCart ? '100vh' : 'initial'}
        overflowY={statusCart ? 'hidden' : 'initial'}
      >
        {children}
      </Box>
      <Animation>
        <Footer />
      </Animation>
    </Box>
  )
}

export default Layout
