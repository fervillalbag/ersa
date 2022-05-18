import { Description } from './Description';

type Value = {
	_id: string;
	title: string;
	description: Description[];
	createdAt: string;
	updatedAt: string;
};

export type ValueInterface = {
	message: string;
	success: boolean;
	values: Value[];
};
