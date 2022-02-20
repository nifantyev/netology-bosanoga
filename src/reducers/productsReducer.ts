import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../models';
import { AsyncOperationStatus } from '../types';
import * as api from '../api';

interface ProductsState {
  products: Product[];
  selectedCategoryId?: number;
  search: string;
  offset: number;
  hasMore: boolean;
  loadingStatus: AsyncOperationStatus;
  error?: string;
}

const initialState = {
  products: [],
  search: '',
  offset: 0,
  hasMore: true,
  loadingStatus: 'idle',
} as ProductsState;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.offset = 0;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loadingStatus = 'pending';
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingStatus = 'success';
        state.offset += action.payload.length;
        state.hasMore = action.payload.length >= 6;
        state.products = state.products.concat(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      }),
});

export const fetchProducts = createAsyncThunk(
  'products/fetchStatus',
  async (arg, { getState }) => {
    const state = getState() as {
      products: {
        selectedCategoryId?: number;
        offset?: number;
        search?: string;
      };
    };
    const { selectedCategoryId, offset, search } = state.products;
    const response = await api.fetchProducts({
      categoryId: selectedCategoryId,
      offset,
      q: search,
    });
    const products = response.json();
    return products;
  }
);

export const { selectCategory, clearProducts, setSearch } =
  productsSlice.actions;

export default productsSlice.reducer;
