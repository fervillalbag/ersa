import axiosPackage from 'axios';

const axios = axiosPackage.create({
	baseURL: 'https://ersa-rf7w3.ondigitalocean.app',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axios;
