import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import NavbarProvider from '../context/Navbar';
import theme from '../styles/theme';
import UserProvider from '../context/UserContext';
import { store } from '../app/store';
import { CartStatusProvider } from '../context/CartStatus';

import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<UserProvider>
				<AnimatePresence exitBeforeEnter>
					<ChakraProvider theme={theme}>
						<CartStatusProvider>
							<NavbarProvider>
								<Toaster position='top-center' reverseOrder={false} />
								<Component {...pageProps} />
							</NavbarProvider>
						</CartStatusProvider>
					</ChakraProvider>
				</AnimatePresence>
			</UserProvider>
		</Provider>
	);
};

export default MyApp;
