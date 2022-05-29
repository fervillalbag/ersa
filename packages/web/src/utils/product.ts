import axios from '../config/axios';
import { ProductInterface, ProductsInterface } from '../interfaces';

export const getProducts = async (): Promise<ProductsInterface | null> => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/product`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getProduct = async (
	id: string
): Promise<ProductInterface | null> => {
	try {
		const response = await axios({
			method: 'GET',
			url: `/product/${id}`,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
