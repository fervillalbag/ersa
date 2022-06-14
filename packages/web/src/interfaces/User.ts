export type UserType = {
	_id?: string;
	name: string;
	email: string;
	password: string;
	role: string;
};

export type UserResponse = {
	message: string;
	success: boolean;
	user: UserType;
};
