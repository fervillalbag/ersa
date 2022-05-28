import axios from '../config/axios';
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

export const updateValue = async (
	data,
	id: string
): Promise<ValueInterface | null> => {
	const response = await axios({
		method: 'PUT',
		url: `/values/${id}`,
		data: { ...data },
	});

	console.log(response);
	return response.data;
};

export const createValue = async (data): Promise<ValueInterface | null> => {
	const response = await axios({
		method: 'POST',
		url: `/values/create`,
		data: { ...data },
	});

	console.log(response);
	return response.data;
};

export const deleteValue = async (
	id: string
): Promise<ValueInterface | null> => {
	const response = await axios({
		method: 'DELETE',
		url: `/values/${id}`,
	});

	return response.data;
};
