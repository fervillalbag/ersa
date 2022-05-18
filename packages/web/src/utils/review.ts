import { Review } from '../interfaces';

export const getReviews = async (): Promise<Review | null> => {
	try {
		const URL = process.env.URL_ROOT_LOCAL;
		const response = await fetch(`${URL}/api/review`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
