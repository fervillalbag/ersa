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
			const currentStorage = JSON.parse(localStorage.getItem('cart-product'));
			const exist = currentStorage.find(
				item => item._id === action.payload._id
			);

			if (exist) {
				const newState = currentStorage.map(item =>
					item._id === action.payload._id
						? { ...exist, qty: exist.qty + 1 }
						: item
				);

				localStorage.setItem('cart-product', JSON.stringify(newState));
			} else {
				const newValue = { ...action.payload, qty: 1 };
				const newState = [...currentStorage, newValue];
				localStorage.setItem('cart-product', JSON.stringify(newState));
			}
		},
		deleteProduct: (_, action: PayloadAction<string>) => {
			const currentStorage = JSON.parse(localStorage.getItem('cart-product'));
			const exist = currentStorage.find(item => item._id === action.payload);

			if (!exist) return null;

			if (exist.qty === 1) {
				const newState = currentStorage.filter(
					item => item._id !== action.payload
				);
				localStorage.setItem('cart-product', JSON.stringify(newState));
			} else {
				const newState = currentStorage.map(item =>
					item._id === action.payload ? { ...exist, qty: exist.qty - 1 } : item
				);
				localStorage.setItem('cart-product', JSON.stringify(newState));
			}
		},
		deleteAllProduct: (_state, action: PayloadAction<string>) => {
			const currentStorage = JSON.parse(localStorage.getItem('cart-product'));
			const exist = currentStorage.find(item => item._id === action.payload);

			if (!exist) return null;

			const newState = currentStorage.filter(
				item => item._id !== action.payload
			);
			localStorage.setItem('cart-product', JSON.stringify(newState));
		},
	},
});

export const { addProduct, deleteProduct, deleteAllProduct } =
	cartSlice.actions;
export default cartSlice.reducer;
