import { Description } from './Description';

export type Product = {
	_id?: string;
	name: string;
	quantity: number;
	price: number;
	qty?: number;
	image: string;
	category: string;
	description: Description[];
	createdAt?: number;
};

export type ProductsInterface = {
	message: string;
	success: boolean;
	products: Product[];
};

export type ProductInterface = {
	message: string;
	success: boolean;
	product: Product;
};
