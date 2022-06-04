import { useEffect, useState } from 'react';

const useCart = () => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('cart-product'));
		if (items) {
			setCart(items);
		}
	}, [cart]);

	return {
		cart,
	};
};

export default useCart;
