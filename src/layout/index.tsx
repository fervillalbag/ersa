import React from 'react'
import { Box } from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
      <Footer />
    </Box>
  )
}

export default Layout
