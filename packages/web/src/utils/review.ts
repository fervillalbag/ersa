import { ReviewInterface } from '../interfaces';

export const getReviews = async (): Promise<ReviewInterface | null> => {
	try {
		const URL = process.env.URL_API;
		const response = await fetch(`${URL}/reviews`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
