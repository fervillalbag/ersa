import { Box, Grid } from '@chakra-ui/react';

import Layout from '../../layout';
import { getProducts } from '../../utils';
import { ProductsInterface } from '../../interfaces';
import Product from '../../components/Product';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
	const productsData = await getProducts();

	return {
		props: {
			productsData,
		},
		revalidate: 3600,
	};
};

type ProductPageProps = {
	productsData: ProductsInterface;
};

const Products = ({ productsData }: ProductPageProps) => {
	const products = productsData.products;

	return (
		<Layout title='Community | Products'>
			<Box maxWidth='1170px' margin='0 auto' width='90%' paddingBottom='4rem'>
				<Grid
					gridTemplateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
					}}
					gap='2rem 3rem'
				>
					{products.map(product => (
						<Product key={product._id} product={product} />
					))}
				</Grid>
			</Box>
		</Layout>
	);
};

export default Products;
