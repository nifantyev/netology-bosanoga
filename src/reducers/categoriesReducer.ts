import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '../models';
import { AsyncOperationStatus } from '../types';
import * as api from '../api';

interface CategoriesState {
  categories: Category[];
  loadingStatus: AsyncOperationStatus;
  error?: string;
}

const initialState = {
  categories: [],
  loadingStatus: 'idle',
} as CategoriesState;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loadingStatus = 'pending';
        state.error = undefined;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingStatus = 'success';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      }),
});

export const fetchCategories = createAsyncThunk(
  'categories/fetchStatus',
  async (arg, thunkAPI) => {
    const response = await api.fetchCategories();
    const categories = response.json();
    return categories;
  }
);

export default categoriesSlice.reducer;
