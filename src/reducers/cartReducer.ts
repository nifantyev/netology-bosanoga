import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderItem } from '../models';

const initialState = {
  owner: {
    phone: '',
    address: '',
  },
  items: [],
} as Order;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.owner.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.owner.address = action.payload;
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
});

export default cartSlice.reducer;
