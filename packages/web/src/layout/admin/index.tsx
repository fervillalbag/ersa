import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react';
import { FaArrowLeft, FaBars, FaUser } from 'react-icons/fa';

import Navbar from '../../components/admin/Navbar';
import Aside from '../../components/admin/Aside';
import useCart from '../../utils/cart';
import { CART_PRODUCT_LOCAL_STORAGE } from '../../utils/constants';

type LayoutIprops = {
	title?: string;
	showNavbar?: boolean;
	onClick?: () => void;
};

const Layout: React.FC<LayoutIprops> = ({
	children,
	title,
	showNavbar = true,
	onClick,
}) => {
	const router = useRouter();
	const cart = useCart();

	useEffect(() => {
		const currentStorage = localStorage.getItem(CART_PRODUCT_LOCAL_STORAGE);
		if (!currentStorage) {
			localStorage.setItem(CART_PRODUCT_LOCAL_STORAGE, '[]');
		}
	}, [cart]);

	return (
		<Grid
			gridTemplateColumns={{
				base: '1fr',
				md: '250px 1fr',
				xl: '250px 1fr 300px',
			}}
			className='scrollbar-hide'
			height={`100vh`}
			overflow={`hidden`}
		>
			<Box display={{ base: 'none', md: 'block' }}>
				{showNavbar ? (
					<Navbar />
				) : (
					<Box padding='2rem 3rem'>
						<Button
							display='block'
							border='1px solid'
							borderColor='dark-blue'
							rounded='4px'
							width='100%'
							onClick={onClick}
							_focus={{ shadow: 0 }}
						>
							<Flex justifyContent='center' alignItems='center'>
								<Text color='dark-blue'>
									<FaArrowLeft />
								</Text>
								<Text color='dark-blue' marginLeft='10px'>
									Volver
								</Text>
							</Flex>
						</Button>
					</Box>
				)}
			</Box>
			<Flex
				display={{ base: 'flex', md: 'none' }}
				padding={{ base: '1rem', md: '0' }}
				justifyContent={`space-between`}
			>
				<Button>
					<FaBars />
				</Button>
				<Button>
					<FaUser />
				</Button>
			</Flex>

			<Box
				width={{ base: '100vw', md: 'initial' }}
				backgroundColor='#fff'
				padding={{ base: '0 1rem', md: '0 60px' }}
				minHeight='100vh'
				className='scrollbar-hide'
				overflowY={`auto`}
			>
				<Flex
					padding={{ base: '0', md: '1.25rem 0' }}
					alignItems='center'
					justifyContent='space-between'
				>
					<Text
						fontWeight='bold'
						color='#79746C'
						fontSize='24px'
						textTransform={`uppercase`}
					>
						{router.pathname === '/admin' ? `Bienvenido` : title}
					</Text>
				</Flex>
				<Box paddingBottom='4rem'>{children}</Box>
			</Box>
			<Box display={{ base: 'none', lg: 'block' }}>
				<Aside />
			</Box>
		</Grid>
	);
};

export default Layout;
