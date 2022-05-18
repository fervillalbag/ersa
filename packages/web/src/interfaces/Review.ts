import { Description } from './Description';

type Review = {
	_id: string;
	name: string;
	avatar: string;
	description: Description[];
};

export type ReviewInterface = {
	message: string;
	success: boolean;
	reviews: Review[];
};
