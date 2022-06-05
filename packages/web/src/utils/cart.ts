import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useCart = () => {
	const [cart, setCart] = useState([]);
	const status = useSelector((state: RootState) => state.cart.status);

	useEffect(() => {
		setCart(JSON.parse(localStorage.getItem('cart-product')));
		console.log(JSON.parse(localStorage.getItem('cart-product')));
	}, []);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('cart-product'));
		if (items) {
			setCart(items);
		}
	}, [status]);

	return {
		cart,
	};
};

export default useCart;
