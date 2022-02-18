import { configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import topSalesReducer from '../reducers/topSalesReducer';
import categoriesReducer from '../reducers/categoriesReducer';
import productsReducer from '../reducers/productsReducer';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';

const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
