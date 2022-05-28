import { Description } from './Description';

export type GrowthType = {
	_id?: string;
	title: string;
	description: Description[];
	createdAt: number;
};

export type GrowthInterface = {
	message: string;
	success: boolean;
	growth: GrowthType;
};
