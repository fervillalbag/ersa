import { ValueInterface } from '../interfaces';

export const getValues = async (): Promise<ValueInterface | null> => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/values`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getValue = async (id: string) => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/values/${id}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
