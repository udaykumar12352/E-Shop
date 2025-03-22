import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.total = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;