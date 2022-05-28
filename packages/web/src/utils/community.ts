import axios from '../config/axios';
import { BannerInterface } from '../interfaces/Community';

export const getBanners = async (): Promise<BannerInterface | null> => {
	try {
		const banners = await axios({
			method: 'GET',
			url: '/banner',
		});

		return banners.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getCommunityInfo = async () => {
	try {
		const community = await axios({
			method: 'GET',
			url: '/community',
		});

		return community.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
