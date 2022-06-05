import axiosPackage from 'axios';

const axios = axiosPackage.create({
	baseURL: process.env.URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axios;
