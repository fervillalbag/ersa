import axios from '../config/axios';

export const loginUser = async data => {
	try {
		const response = await axios({
			method: 'POST',
			url: '/user/login',
			data: { ...data },
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getUser = async (id: string) => {
	try {
		const response = await axios({
			method: 'GET',
			url: `/user/${id}`,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
