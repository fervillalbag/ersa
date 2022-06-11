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
