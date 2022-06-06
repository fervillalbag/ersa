import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Animation from '../components/Animation';
import { CartStatusContext } from '../context/CartStatus';
import useCart from '../utils/cart';
import { CART_PRODUCT_LOCAL_STORAGE } from '../utils/constants';

type LayoutIprops = {
	title?: string;
};

const Layout: React.FC<LayoutIprops> = ({ children, title }) => {
	const { statusCart } = useContext(CartStatusContext);
	const cart = useCart();

	useEffect(() => {
		const currentStorage = localStorage.getItem(CART_PRODUCT_LOCAL_STORAGE);
		if (!currentStorage) {
			localStorage.setItem(CART_PRODUCT_LOCAL_STORAGE, '[]');
		}
	}, [cart]);

	return (
		<Box
			height={statusCart ? '100vh' : 'initial'}
			overflowY={statusCart ? 'hidden' : 'initial'}
		>
			<Head>
				<title>{title || 'Landing Ersa'}</title>
			</Head>

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
	);
};

export default Layout;
