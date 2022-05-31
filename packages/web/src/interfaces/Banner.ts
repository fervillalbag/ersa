import { Description } from './Description';

export type BannerType = {
	title: string;
	description: Description;
	image: string;
	status: boolean;
	order: number;
};

export type BannersInterface = {
	message: string;
	success: boolean;
	banners: BannerType[];
};

export type BannerInterface = {
	message: string;
	success: boolean;
	banner: BannerType;
};
