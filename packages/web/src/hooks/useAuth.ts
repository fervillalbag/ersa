import { useContext, useEffect } from 'react';
import jwt from 'jwt-decode';

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

	const logout = () => {
		setUser(null);
		localStorage.setItem('ERSA_TOKEN_AUTH', '');
	};

	return { user, logout };
};
