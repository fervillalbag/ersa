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
	const URL_API = 'https://ersa-2uw4k.ondigitalocean.app';
	const URL_API_RESPONSE = URL_API + '/header/' + id;

	const response = await axios({
		method: 'PUT',
		url: URL_API_RESPONSE,
		data: { ...data },
	});

	console.log(response);
	return response.data;
};
