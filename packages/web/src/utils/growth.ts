import axios from 'axios';
import { GrowthInterface } from '../interfaces';

export const getGrowthInfo = async (): Promise<GrowthInterface | null> => {
	try {
		const response = await axios({
			method: 'GET',
			url: `/growth`,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
