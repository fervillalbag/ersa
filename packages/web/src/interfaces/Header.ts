import { Description } from './Description';

export type HeaderInterface = {
	message: string;
	success: boolean;
	header: {
		_id?: string;
		title: string;
		description: Description[];
		image: string;
		createdAt: number;
	};
};
