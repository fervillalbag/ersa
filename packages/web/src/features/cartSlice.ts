import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../interfaces';

const initialState =
	typeof window !== 'undefined'
		? JSON.parse(localStorage.getItem('cart-product') as string) || []
		: null;

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (_, action: PayloadAction<ProductType>) => {
			const currentLocalStorage = JSON.parse(
				localStorage.getItem('cart-product')
			);

			const exist = currentLocalStorage.find(
				(x: ProductType) => x._id === action.payload._id
			);

			if (exist) {
				const stateRepeated = currentLocalStorage.map((item: ProductType) =>
					item._id === action.payload._id
						? { ...exist, qty: exist.qty + 1 }
						: item
				);

				const newState = [...stateRepeated, action.payload];
				localStorage.setItem('cart-product', JSON.stringify(newState));
			} else {
				if (currentLocalStorage.length === 0) {
					const newValue = { ...action.payload, qty: 1 };
					const newState = [...currentLocalStorage, newValue];

					localStorage.setItem('cart-product', JSON.stringify(newState));
				} else {
					const newState = currentLocalStorage.map(item =>
						item._id === action.payload._id
							? { ...action.payload, qty: 1 }
							: item
					);

					localStorage.setItem('cart-product', JSON.stringify(newState));
				}
			}
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
