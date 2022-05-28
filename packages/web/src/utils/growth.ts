import axios from '../config/axios';
import { GrowthInterface } from '../interfaces';

export const getGrowthInfo = async (): Promise<GrowthInterface | null> => {
	try {
		const response = await axios({
			method: 'GET',
			url: `/growth`,
		});

		console.log(response);

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateGrowth = async (
	data,
	id: string
): Promise<GrowthInterface | null> => {
	const response = await axios({
		method: 'PUT',
		url: `/growth/${id}`,
		data: { ...data },
	});

	return response.data;
};
