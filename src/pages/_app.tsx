import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import NavbarProvider from '../context/Navbar'
import CartProvider from '../context/Cart'
import { CartContextProvider } from '../context/CartContext'

import theme from '../styles/theme'
import '../styles/globals.css'
import 'swiper/css'
import 'react-lazy-load-image-component/src/effects/blur.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <ChakraProvider theme={theme}>
        <CartContextProvider>
          <CartProvider>
            <NavbarProvider>
              <Component {...pageProps} />
            </NavbarProvider>
          </CartProvider>
        </CartContextProvider>
      </ChakraProvider>
    </AnimatePresence>
  )
}

export default MyApp
