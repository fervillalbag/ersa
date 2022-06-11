import jwt from 'jwt-decode';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export const UserAuth = () => {
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		const token = localStorage.getItem('ERSA_TOKEN_AUTH');

		if (!token) {
			setUser(null);
		} else {
			setUser(jwt(token));
		}
	}, []);

	return { user };
};
