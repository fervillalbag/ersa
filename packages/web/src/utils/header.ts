import { HeaderInfo } from '../interfaces';

export const getHeaderInfo = async (): Promise<HeaderInfo | null> => {
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
