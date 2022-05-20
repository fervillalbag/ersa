import axiosPackage from 'axios';

const axios = axiosPackage.create({
	baseURL: 'https://ersa-2uw4k.ondigitalocean.app',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axios;
