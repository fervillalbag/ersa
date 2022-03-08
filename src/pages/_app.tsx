import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import NavbarProvider from '../context/Navbar'

import theme from '../styles/theme'
import '../styles/globals.css'
import 'swiper/css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <NavbarProvider>
        <Component {...pageProps} />
      </NavbarProvider>
    </ChakraProvider>
  )
}

export default MyApp
