import { Description } from './Description';

export type ProductType = {
	_id?: string;
	name: string;
	quantity: number;
	price: number;
	qty?: number;
	image: string;
	status: boolean;
	category: string;
	description: Description[];
	createdAt?: number;
};

export type ProductsInterface = {
	message: string;
	success: boolean;
	products: ProductType[];
};

export type ProductInterface = {
	message: string;
	success: boolean;
	product: ProductType;
};
