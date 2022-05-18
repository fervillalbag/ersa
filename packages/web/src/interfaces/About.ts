import { Description } from './Description';

export type AboutInterface = {
	message: string;
	success: boolean;
	about: {
		_id?: string;
		title: string;
		description: Description[];
		image: string;
	};
};
