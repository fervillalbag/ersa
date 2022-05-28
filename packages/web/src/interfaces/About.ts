import { Description } from './Description';

export type AboutType = {
	_id?: string;
	title: string;
	description: Description[];
	image: string;
};

export type AboutInterface = {
	message: string;
	success: boolean;
	about: AboutType;
};
