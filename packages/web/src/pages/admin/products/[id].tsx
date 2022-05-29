import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import Layout from '../../../layout/admin';
import { ProductType } from '../../../interfaces';
import { getProduct } from '../../../utils';

export type AdminProductItemProps = {
	product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const product = await getProduct(context.params.id as string);

	return {
		props: {
			product: product.product,
		},
	};
};

const AdminProductItem = ({ product }: AdminProductItemProps) => {
	console.log(product);

	return (
		<Layout>
			<Box>AdminProductItem</Box>
		</Layout>
	);
};

export default AdminProductItem;
