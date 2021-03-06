import axios from '../config/axios';
import { HeaderInterface } from '../interfaces';

export const getHeaderInfo = async (): Promise<HeaderInterface | null> => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/header`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateHeader = async (
	data,
	id: string
): Promise<HeaderInterface | null> => {
	const response = await axios({
		method: 'PUT',
		url: `/header/${id}`,
		data: { ...data },
	});

	return response.data;
};
