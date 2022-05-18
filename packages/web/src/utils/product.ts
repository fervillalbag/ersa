import { ProductType } from '../interfaces';

export const getProducts = async (): Promise<ProductType[] | null> => {
	try {
		const URL = process.env.URL_ROOT_LOCAL;
		const response = await fetch(`${URL}/api/product`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
