import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import NavbarProvider from '../context/Navbar'
import CartProvider from '../context/Cart'

import theme from '../styles/theme'
import '../styles/globals.css'
import 'swiper/css'
import { AnimatePresence } from 'framer-motion'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <NavbarProvider>
            <Component {...pageProps} />
          </NavbarProvider>
        </CartProvider>
      </ChakraProvider>
    </AnimatePresence>
  )
}

export default MyApp
