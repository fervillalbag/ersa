import type { GetServerSideProps } from 'next';
import toast from 'react-hot-toast';
import { Box, Grid, Text, Flex, Button, Heading } from '@chakra-ui/react';
import { RiShoppingCartFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Layout from '../../layout';
import { ProductInterface } from '../../interfaces';
import { getProduct } from '../../utils';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/cartSlice';

type ProductProps = {
	productData: ProductInterface;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const productData = await getProduct(context.params.id.toString());
	return {
		props: {
			productData,
		},
	};
};

const Product = ({ productData }: ProductProps) => {
	const product = productData.product;
	const dispatch = useDispatch();

	return (
		<Layout title={`${product.name} | Landing Ersa`}>
			<Grid
				gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				maxWidth='1170px'
				margin='0 auto'
				width='90%'
				padding={{ base: '0 0 4rem 0', md: '2rem 0 4rem 0' }}
				gap='2rem 0'
				alignItems='center'
			>
				<Flex justifyContent='center'>
					<Box width={{ base: '100%', md: '400px' }}>
						<LazyLoadImage
							src={product.image}
							alt=''
							width='100%'
							height='400px'
							effect='blur'
						/>
					</Box>
				</Flex>
				<Box>
					<Heading variant={`subtitle`} marginBottom={`5px`}>
						{product.name}
					</Heading>

					<Flex>
						<Text color='dark-grayish-blue'>Code:</Text>
						<Text color='dark-grayish-blue' marginLeft='0.25rem'>
							{product._id.slice(0, 10)}
						</Text>
					</Flex>

					<Text fontWeight='bold' fontSize='2rem' color='dark-blue'>
						${product.price}
					</Text>

					<Box maxWidth={{ base: '100%', md: '80%' }}>
						{product.description.map(paragraph => (
							<Box key={paragraph.id} marginTop='1rem'>
								<Text variant={`description`}>{paragraph.text}</Text>
							</Box>
						))}
					</Box>

					<Flex marginTop='1rem'>
						<Text color='dark-blue' fontWeight='semibold' fontSize='0.9rem'>
							Available:
						</Text>
						<Text
							color='dark-blue'
							fontWeight='bold'
							marginLeft='0.25rem'
							fontSize='0.9rem'
						>
							{product.quantity}
						</Text>
					</Flex>

					<Flex marginTop='1rem'>
						<Button
							minWidth='initial'
							backgroundColor='dark-blue'
							display='inline-block'
							fontSize='0.9rem'
							rounded='full'
							fontWeight='bold'
							padding='0.75rem 2rem'
							color='white'
							height='auto'
							onClick={() => toast.success('Compra realizada 😳')}
						>
							Buy now
						</Button>
						<Button
							minWidth='initial'
							borderWidth='2px'
							borderStyle='solid'
							borderColor='bright-red'
							display='inline-block'
							fontSize='1.25rem'
							rounded='full'
							fontWeight='bold'
							padding='0.75rem 2rem'
							color='bright-red'
							marginLeft='1rem'
							height='auto'
							onClick={() => {
								toast.success('Agregado al carrito');
								dispatch(addProduct(product));
							}}
						>
							<RiShoppingCartFill />
						</Button>
					</Flex>
				</Box>
			</Grid>
		</Layout>
	);
};

export default Product;
