import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../interfaces';

const initialState = {
	value:
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('cart-product') as string)
			: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<ProductType>) => {
			const currentLocalStorage = JSON.parse(
				localStorage.getItem('cart-product')
			);

			const exist = currentLocalStorage.find(
				(x: ProductType) => x._id === action.payload._id
			);

			if (exist) {
				const newState = currentLocalStorage.map((item: ProductType) =>
					item._id === action.payload._id
						? { ...exist, qty: exist.qty + 1 }
						: item
				);

				state.value = newState;
				localStorage.setItem('cart-product', JSON.stringify(newState));
			} else {
				const newValue: ProductType = { ...action.payload, qty: 1 };
				const newState: ProductType[] = [...state.value, newValue];

				state.value.push(...newState);
				localStorage.setItem('cart-product', JSON.stringify(newState));
			}
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
