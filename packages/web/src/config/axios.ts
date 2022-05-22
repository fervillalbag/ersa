import axiosPackage from 'axios';

const axios = axiosPackage.create({
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axios;
