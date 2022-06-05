import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../interfaces';

type initialStateProps = {
	value: ProductType[] | [];
	status: boolean;
};

const initialState: initialStateProps = {
	value:
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('cart-product') as string) || []
			: null,
	status: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<ProductType>) => {
			const currentStorage = JSON.parse(localStorage.getItem('cart-product'));
			const exist = currentStorage.find(
				(item: ProductType) => item._id === action.payload._id
			);

			if (exist) {
				const newState = currentStorage.map((item: ProductType) =>
					item._id === action.payload._id
						? { ...exist, qty: exist.qty + 1 }
						: item
				);

				state.status = !state.status;
				localStorage.setItem('cart-product', JSON.stringify(newState));
			} else {
				const newValue = { ...action.payload, qty: 1 };
				const newState = [...currentStorage, newValue];

				state.status = !state.status;
				localStorage.setItem('cart-product', JSON.stringify(newState));
			}
		},
		deleteProduct: (state, action: PayloadAction<string>) => {
			const currentStorage = JSON.parse(localStorage.getItem('cart-product'));
			const exist = currentStorage.find(
				(item: ProductType) => item._id === action.payload
			);

			if (!exist) return null;

			if (exist.qty === 1) {
				const newState = currentStorage.filter(
					item => item._id !== action.payload
				);

				state.status = !state.status;
				localStorage.setItem('cart-product', JSON.stringify(newState));
			} else {
				const newState = currentStorage.map((item: ProductType) =>
					item._id === action.payload ? { ...exist, qty: exist.qty - 1 } : item
				);

				state.status = !state.status;
				localStorage.setItem('cart-product', JSON.stringify(newState));
			}
		},
		deleteAllProduct: (state, action: PayloadAction<string>) => {
			const currentStorage = JSON.parse(localStorage.getItem('cart-product'));
			const exist = currentStorage.find(
				(item: ProductType) => item._id === action.payload
			);

			if (!exist) return null;

			const newState = currentStorage.filter(
				item => item._id !== action.payload
			);

			state.status = !state.status;
			localStorage.setItem('cart-product', JSON.stringify(newState));
		},
	},
});

export const { addProduct, deleteProduct, deleteAllProduct } =
	cartSlice.actions;
export default cartSlice.reducer;
