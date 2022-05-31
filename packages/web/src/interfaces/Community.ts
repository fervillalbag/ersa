import { Description } from './Description';

export type BannerType = {
	_id?: string;
	title: string;
	description: Description[];
	image: string;
	status: boolean;
	order: number;
	createdAt: Date;
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

export type CommunityType = {
	_id?: string;
	title: string;
	description: Description[];
};

export type CommunityInterface = {
	message: string;
	success: boolean;
	community: CommunityType;
};
