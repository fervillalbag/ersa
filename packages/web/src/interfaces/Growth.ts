import { Description } from './Description';

export type GrowthInfo = {
	message: string;
	success: boolean;
	growth: {
		_id?: string;
		title: string;
		description: Description[];
		createdAt: number;
	};
};
