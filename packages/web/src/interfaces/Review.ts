import { Description } from './Description';

export type ReviewType = {
	_id: string;
	name: string;
	avatar: string;
	order: number;
	status: boolean;
	description: Description[];
};

export type ReviewInterface = {
	message: string;
	success: boolean;
	reviews: ReviewType[];
};
