import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Grid, Image, Flex, Link, Button, Text } from '@chakra-ui/react';
import { FaBars, FaShoppingCart, FaTimes } from 'react-icons/fa';

import { NavbarContext } from '../context/Navbar';
import { CartStatusContext } from '../context/CartStatus';
import useCart from '../utils/cart';

const Navbar: React.FC = () => {
	const { showNavbar, setShowNavbar } = useContext(NavbarContext);
	const { setStatusCart } = useContext(CartStatusContext);
	const { cart } = useCart();

	const { pathname } = useRouter();

	useEffect(() => {
		setShowNavbar(false);
	}, []);

	return (
		<Box maxWidth='1170px' margin='0 auto' width='90%' padding='2rem 0'>
			<Grid
				gridTemplateColumns={{ base: '150px 1fr', lg: '150px 1fr auto' }}
				alignItems='center'
			>
				<Box>
					<NextLink href='/'>
						<Link>
							<Image src='/logo.svg' alt='' width='100%' objectFit='contain' />
						</Link>
					</NextLink>
				</Box>

				<Box
					display={{ base: 'flex', lg: 'none' }}
					alignItems='center'
					justifyContent='flex-end'
				>
					<Button
						position='relative'
						_focus={{ shadow: 0 }}
						onClick={() => setStatusCart(true)}
						_hover={{ backgroundColor: `transparent` }}
						backgroundColor={`transparent`}
					>
						<Text fontSize='1.9rem'>
							<FaShoppingCart />
						</Text>

						{cart && cart.length >= 0 ? (
							<Flex
								justifyContent='center'
								alignItems='center'
								width='1.5rem'
								height='1.5rem'
								backgroundColor='bright-red'
								rounded='full'
								fontSize='0.85rem'
								fontWeight='semibold'
								color='white'
								position='absolute'
								bottom='-0.5rem'
								right='0.3rem'
							>
								{cart.length}
							</Flex>
						) : (
							<Flex
								justifyContent='center'
								alignItems='center'
								width='1.5rem'
								height='1.5rem'
								backgroundColor='bright-red'
								rounded='full'
								fontSize='0.85rem'
								fontWeight='semibold'
								color='white'
								position='absolute'
								bottom='-0.5rem'
								right='0.3rem'
							>
								0
							</Flex>
						)}
					</Button>
					<Button
						justifySelf='end'
						fontSize='24px'
						color='dark-blue'
						_focus={{ boxShadow: 0 }}
						backgroundColor={`transparent`}
						onClick={() => setShowNavbar(true)}
					>
						<FaBars />
					</Button>
				</Box>

				<Flex
					alignItems='center'
					justifyContent='center'
					position={{ base: 'fixed', lg: 'initial' }}
					transform={{
						base: `${showNavbar ? 'translateY(0)' : 'translateY(2000px)'}`,
						lg: 'initial',
					}}
					backgroundColor={{ base: 'white', lg: 'transparent' }}
					width={{ base: '100vw', lg: 'auto' }}
					height={{ base: '100vh', lg: 'auto' }}
					flexDirection={{ base: 'column', lg: 'row' }}
					top={{ base: 0, lg: 'initial' }}
					left={{ base: 0, lg: 'initial' }}
					zIndex='200'
				>
					<Button
						display={{ base: 'block', lg: 'none' }}
						fontSize='24px'
						color='red.400'
						position='fixed'
						top='32px'
						right='20px'
						_focus={{ boxShadow: '0' }}
						backgroundColor={`transparent`}
						onClick={() => setShowNavbar(false)}
					>
						<FaTimes />
					</Button>

					<NextLink href='/' passHref>
						<Link
							color={
								pathname === '/'
									? { base: 'bright-red' }
									: { base: 'dark-blue' }
							}
							fontWeight='semibold'
							marginRight={{ base: 0, lg: '30px' }}
							marginBottom={{ base: '15px', lg: 0 }}
							fontSize={{ base: '24px', lg: '16px' }}
							_hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
							_focus={{ shadow: 0 }}
							onClick={() => setShowNavbar(false)}
						>
							Home
						</Link>
					</NextLink>
					<NextLink href='/product' passHref>
						<Link
							color={
								pathname === '/product'
									? { base: 'bright-red' }
									: { base: 'dark-blue' }
							}
							fontWeight='semibold'
							marginRight={{ base: 0, lg: '30px' }}
							marginBottom={{ base: '15px', lg: 0 }}
							fontSize={{ base: '24px', lg: '16px' }}
							_hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
							_focus={{ shadow: 0 }}
							onClick={() => setShowNavbar(false)}
						>
							Products
						</Link>
					</NextLink>
					<NextLink href='/about' passHref>
						<Link
							color={
								pathname === '/about'
									? { base: 'bright-red' }
									: { base: 'dark-blue' }
							}
							fontWeight='semibold'
							marginRight={{ base: 0, lg: '30px' }}
							marginBottom={{ base: '15px', lg: 0 }}
							fontSize={{ base: '24px', lg: '16px' }}
							_hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
							_focus={{ shadow: 0 }}
							onClick={() => setShowNavbar(false)}
						>
							About Us
						</Link>
					</NextLink>
					<NextLink href='/community' passHref>
						<Link
							color={
								pathname === '/community'
									? { base: 'bright-red' }
									: { base: 'dark-blue' }
							}
							fontWeight='semibold'
							fontSize={{ base: '24px', lg: '16px' }}
							_hover={{ textDecoration: 'none', color: 'dark-grayish-blue' }}
							_focus={{ shadow: 0 }}
							onClick={() => setShowNavbar(false)}
						>
							Community
						</Link>
					</NextLink>
				</Flex>

				<Flex
					display={{ base: 'none', lg: 'flex' }}
					justifyContent='flex-end'
					alignItems='center'
					position='relative'
					zIndex='100'
				>
					<NextLink href='/' passHref>
						<Button variant={`primary`}>
							<Link _hover={{ textDecor: 'none' }}>Get Started</Link>
						</Button>
					</NextLink>

					<Button
						position='relative'
						onClick={() => setStatusCart(true)}
						backgroundColor={`transparent`}
						_hover={{ backgroundColor: `transparent` }}
						_active={{ backgroundColor: `transparent` }}
						_focus={{ shadow: 0 }}
					>
						<Text fontSize='1.9rem'>
							<FaShoppingCart />
						</Text>

						{cart && cart.length >= 0 ? (
							<Flex
								justifyContent='center'
								alignItems='center'
								width='1.5rem'
								height='1.5rem'
								backgroundColor='bright-red'
								rounded='full'
								fontSize='0.85rem'
								fontWeight='semibold'
								color='white'
								position='absolute'
								bottom='-0.5rem'
								right='0.3rem'
							>
								{cart.length}
							</Flex>
						) : (
							<Flex
								justifyContent='center'
								alignItems='center'
								width='1.5rem'
								height='1.5rem'
								backgroundColor='bright-red'
								rounded='full'
								fontSize='0.85rem'
								fontWeight='semibold'
								color='white'
								position='absolute'
								bottom='-0.5rem'
								right='0.3rem'
							>
								0
							</Flex>
						)}
					</Button>
				</Flex>
			</Grid>
		</Box>
	);
};

export default Navbar;
