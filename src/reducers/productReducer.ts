import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../models';
import { AsyncOperationStatus } from '../types';
import * as api from '../api';

interface ProductState {
  product: Product | null;
  loadingStatus: AsyncOperationStatus;
  error?: string;
  selectedSize?: string;
  count: number;
}

const initialState = {
  product: null,
  loadingStatus: 'idle',
  count: 1,
} as ProductState;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    increaseCount: (state) => {
      if (state.count < 10) {
        state.count += 1;
      }
    },
    decreaseCount: (state) => {
      if (state.count > 1) {
        state.count -= 1;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.loadingStatus = 'pending';
        state.error = undefined;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.product = action.payload;
        state.selectedSize = undefined;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.product = null;
        state.error = action.error.message;
      }),
});

export const fetchProduct = createAsyncThunk(
  'product/fetchStatus',
  async (productId: number, thunkAPI) => {
    const response = await api.fetchProduct(productId);
    const product = await response.json();
    return product;
  }
);

export const { selectSize, increaseCount, decreaseCount, setCount } =
  productSlice.actions;

export default productSlice.reducer;
