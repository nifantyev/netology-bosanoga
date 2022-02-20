import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../models';
import * as api from '../api';
import { AsyncOperationStatus } from '../types';

interface CartState {
  address: string;
  phone: string;
  agreement: boolean;
  items: OrderItem[];
  postingStatus: AsyncOperationStatus;
  error?: string;
}

const initialState = {
  address: '',
  phone: '',
  agreement: false,
  items: [],
  postingStatus: 'idle',
} as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAgreement: (state, action: PayloadAction<boolean>) => {
      state.agreement = action.payload;
    },
    addItem: (state, action: PayloadAction<OrderItem>) => {
      const { id, title, size, count, price } = action.payload;
      const index = state.items.findIndex(
        (o) => o.id === id && o.size === size
      );
      if (index === -1) {
        state.items.push({ id, title, size, count, price });
      } else {
        state.items[index].count += count;
      }
      state.postingStatus = 'idle';
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: number; size: string }>
    ) => {
      const { id, size } = action.payload;
      const index = state.items.findIndex(
        (o) => o.id === id && o.size === size
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(postOrder.pending, (state, action) => {
        state.postingStatus = 'pending';
        state.error = undefined;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.postingStatus = 'success';
        state.address = '';
        state.phone = '';
        state.agreement = false;
        state.items = [];
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.postingStatus = 'error';
        state.error = action.error.message;
      }),
});

export const postOrder = createAsyncThunk(
  'cart/postOrderStatus',
  async (arg, { getState }) => {
    const {
      cart: { address, phone, items },
    } = getState() as {
      cart: { address: string; phone: string; items: OrderItem[] };
    };
    await api.postOrder({
      owner: { address, phone },
      items,
    });
  }
);

export const { setAddress, setPhone, setAgreement, addItem, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
