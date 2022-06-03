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
			const exist = state.value.find(
				(x: ProductType) => x._id === action.payload._id
			);

			if (exist) {
				const newState = state.value.map(item =>
					item._id === exist._id ? { ...exist, qty: exist.qty + 1 } : item
				);

				state.value = [...newState];
				localStorage.setItem('cart-product', JSON.stringify(state.value));
			} else {
				const newValue = { ...action.payload, qty: 1 };
				const newState = [...state.value, newValue];

				state.value.push(...newState);
				localStorage.setItem('cart-product', JSON.stringify(newState));
			}
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
