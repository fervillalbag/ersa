import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Animation from '../components/Animation';
import { CartStatusContext } from '../context/CartStatus';

type LayoutIprops = {
	title?: string;
};

const Layout: React.FC<LayoutIprops> = ({ children, title }) => {
	const { statusCart } = useContext(CartStatusContext);

	useEffect(() => {
		const currentStorage = localStorage.getItem('cart-product');
		if (!currentStorage) {
			localStorage.setItem('cart-product', '[]');
		}
	}, []);

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
