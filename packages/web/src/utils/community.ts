import axios from '../config/axios';
import { BannerInterface } from '../interfaces/Banner';
import { BannersInterface } from '../interfaces/Community';

export const getBanners = async (): Promise<BannersInterface | null> => {
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

export const getBanner = async (id: string): Promise<BannerInterface> => {
	const banner = await axios({
		method: 'GET',
		url: `/banner/${id}`,
	});

	return banner.data;
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

export const updateCommunityInfo = async (data, id: string) => {
	try {
		const community = await axios({
			method: 'PUT',
			url: `/community/${id}`,
			data: { ...data },
		});

		return community.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateBanner = async (data, id: string) => {
	try {
		const banner = await axios({
			method: 'PUT',
			url: `/banner/${id}`,
			data: { ...data },
		});

		return banner.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteBanner = async (id: string) => {
	try {
		const banner = await axios({
			method: 'DELETE',
			url: `/banner/${id}`,
		});

		return banner.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createBanner = async data => {
	try {
		const banner = await axios({
			method: 'POST',
			url: `/banner/create`,
			data: { ...data },
		});

		return banner.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
