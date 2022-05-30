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

export const updateProduct = async (
	data,
	id: string
): Promise<ProductInterface | null> => {
	const response = await axios({
		method: 'PUT',
		url: `/product/${id}`,
		data: { ...data },
	});

	return response.data;
};

export const deleteProduct = async (
	id: string
): Promise<ProductInterface | null> => {
	const response = await axios({
		method: 'DELETE',
		url: `/product/${id}`,
	});

	return response.data;
};

export const createProduct = async (data): Promise<ProductInterface | null> => {
	const response = await axios({
		method: 'POST',
		url: `/product/create`,
		data: { ...data },
	});

	return response.data;
};
