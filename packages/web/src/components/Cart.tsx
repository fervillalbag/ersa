import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

import CartCardProd from './CartCardProd';
import { CartStatusContext } from '../context/CartStatus';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ProductType } from '../interfaces';

const Cart: React.FC = () => {
	const { statusCart, setStatusCart } = useContext(CartStatusContext);
	const [currentHeight, setCurrentHeight] = useState(null);
	// const { cart } = useCart();

	const cart = useSelector((state: RootState) => state.cart) || [];
	console.log(cart);

	// console.log(cart);

	const ref = useRef(null);

	useEffect(() => {
		if (ref && ref.current && ref.current.clientHeight) {
			// console.log('called')
		}
		setCurrentHeight(ref.current.clientHeight);
		return () => {
			setCurrentHeight(0);
		};
	}, []);

	return (
		<>
			<Box
				display={statusCart ? { base: 'block', lg: 'none' } : { base: 'none' }}
				backgroundColor='white'
				position='fixed'
				width='100vw'
				height='100vh'
				zIndex='300'
			></Box>

			<Box overflow='hidden' position='relative' zIndex='400'>
				<Box
					display={statusCart ? 'block' : 'none'}
					backgroundColor='rgba(0,0,0,0.5)'
					position='fixed'
					top='0'
					left='0'
					width='100vw'
					height={{ base: currentHeight, md: '100vh' }}
					zIndex='400'
					onClick={() => setStatusCart(false)}
				/>
				<Box
					ref={ref}
					display={statusCart ? 'block' : 'none'}
					position='fixed'
					backgroundColor='white'
					left='0'
					top='0'
					width={{ base: '100%', md: '320px' }}
					height={{ base: '100%', md: '100vh' }}
					zIndex='500'
					overflowY='hidden'
				>
					<Flex
						flexDirection='column'
						justifyContent='space-between'
						height={{ base: currentHeight, md: '100vh' }}
					>
						<Box>
							<Flex
								alignItems='center'
								justifyContent='space-between'
								padding='0.9rem 1.25rem'
							>
								<Text fontSize='1.4rem' fontWeight='bold'>
									Cart shopping
								</Text>
								<Button
									display='flex'
									justifyContent='center'
									alignItems='center'
									minWidth='initial'
									_focus={{ shadow: 0 }}
									padding={{ base: '0.25rem 0', md: '0' }}
									margin='0'
									onClick={() => setStatusCart(false)}
								>
									<Text
										as='span'
										textAlign='center'
										display='block'
										fontSize={{ base: '1.45rem', md: '1.25rem' }}
										color='red.500'
									>
										<FaTimes />
									</Text>
								</Button>
							</Flex>

							<Box
								padding='0 1.25rem'
								height={{
									base: `calc(100vh - 128px - 69px)`,
									// md: `calc(100vh - 70px - 8rem)`,
								}}
								overflowY='auto'
							>
								{/* {cart.length === 0 ? (
									<Box>No existen productos en el carrito</Box>
								) : (
									cart.map((item: ProductType) => (
										<CartCardProd product={item} key={item._id} />
									))
								)} */}
							</Box>
						</Box>

						<Flex
							flexDirection='column'
							padding='0 1.25rem'
							backgroundColor='vary-light-gray'
							height='8rem'
							justifyContent='center'
							position='absolute'
							width='100%'
							bottom='0'
							left='0'
						>
							<Flex width='full' justifyContent='space-between'>
								<Text fontWeight='bold'>Total</Text>
								<Text fontWeight='bold'>$340</Text>
							</Flex>
							<Box marginTop='1rem'>
								<Button
									padding='1.5rem 0'
									minWidth='initial'
									backgroundColor='dark-blue'
									rounded='4px'
									color='white'
									width='full'
								>
									Go to cart
								</Button>
							</Box>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default Cart;
