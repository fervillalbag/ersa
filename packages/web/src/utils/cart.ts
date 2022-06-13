import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import { CART_PRODUCT_LOCAL_STORAGE } from './constants';

const useCart = () => {
	const [cart, setCart] = useState([]);
	const status = useSelector((state: RootState) => state.cart.status);

	useEffect(() => {
		setCart(JSON.parse(localStorage.getItem(CART_PRODUCT_LOCAL_STORAGE)));
	}, []);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem(CART_PRODUCT_LOCAL_STORAGE));
		if (items) {
			setCart(items);
		}
	}, [status]);

	return {
		cart,
	};
};

export default useCart;
