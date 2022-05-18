import { GrowthInterface } from '../interfaces';

export const getGrowthInfo = async (): Promise<GrowthInterface | null> => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/growth`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
