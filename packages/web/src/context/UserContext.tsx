import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

type UserContextProps = {
	children: React.ReactNode;
};

const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
