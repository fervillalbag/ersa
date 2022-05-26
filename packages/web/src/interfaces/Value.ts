import { Description } from './Description';

export type ValueType = {
	_id?: string;
	title: string;
	description: Description[];
	createdAt: string;
};

export type ValueInterface = {
	message: string;
	success: boolean;
	values: ValueType[];
};
