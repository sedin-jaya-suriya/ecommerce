
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addCart: (state, action) => {
      const { product, qty } = action.payload;
      const exist = state.items.find((i) => i.id === product.id);
      const currentQty = exist ? exist.quantity : 0;
      if (currentQty + qty > product.stock) return;

      if (exist) {
        exist.quantity += qty;
      } else {
        state.items.push({ ...product, quantity: qty });
      }
    },

    removeCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;