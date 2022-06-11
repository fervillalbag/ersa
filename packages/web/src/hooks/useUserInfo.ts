import jwt from 'jwt-decode';

export const UserAuth = () => {
	const token =
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('ERSA_TOKEN_AUTH') as string)
			: null;

	if (token) {
		const info = jwt(token);
		return info;
	} else {
		return null;
	}
};
