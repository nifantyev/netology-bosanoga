import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncOperationStatus } from '../types';
import { Product } from '../models';
import * as api from '../api';

interface TopSalesState {
  loadingStatus: AsyncOperationStatus;
  error?: string;
  products: Product[];
}

const initialState = {
  loadingStatus: 'idle',
  error: undefined,
  products: [],
} as TopSalesState;

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTopSales.pending, (state, action) => {
        state.loadingStatus = 'pending';
        state.error = undefined;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.loadingStatus = 'success';
        state.products = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      }),
});

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchStatus',
  async (arg, thunkAPI) => {
    const response = await api.fetchTopSales();
    const data = await response.json();
    return data;
  }
);

export default topSalesSlice.reducer;
