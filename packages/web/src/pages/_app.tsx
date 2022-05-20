import React from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import NavbarProvider from '../context/Navbar';
import { CartStatusProvider } from '../context/CartStatus';
import { CartContextProvider } from '../context/CartContext';

import theme from '../styles/theme';
import '../styles/globals.css';
import 'swiper/css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<CartContextProvider>
			<AnimatePresence exitBeforeEnter>
				<ChakraProvider theme={theme}>
					<CartStatusProvider>
						<NavbarProvider>
							<Component {...pageProps} />
							<Toaster position='top-center' reverseOrder={false} />
						</NavbarProvider>
					</CartStatusProvider>
				</ChakraProvider>
			</AnimatePresence>
		</CartContextProvider>
	);
};

export default MyApp;
