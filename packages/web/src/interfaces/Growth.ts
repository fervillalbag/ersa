import { Description } from './Description';

export type GrowthInterface = {
	message: string;
	success: boolean;
	growth: {
		_id?: string;
		title: string;
		description: Description[];
		createdAt: number;
	};
};
