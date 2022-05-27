import { Description } from './Description';

export type ValueType = {
	_id?: string;
	title: string;
	description: Description[];
	order: number;
	status: boolean;
	createdAt: string;
};

export type ValueInterface = {
	message: string;
	success: boolean;
	values: ValueType[];
};
