import axios from '../config/axios';
import { AboutInterface } from '../interfaces/About';

export const getAboutInfo = async (): Promise<AboutInterface | null> => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/about`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateAbout = async (
	data,
	id: string
): Promise<AboutInterface | null> => {
	const response = await axios({
		method: 'PUT',
		url: `/about/${id}`,
		data: { ...data },
	});

	return response.data;
};
