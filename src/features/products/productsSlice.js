
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ITEMS_PER_PAGE = 4;

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return data.map((p) => ({
      ...p,
      stock: Math.floor(Math.random() * 100) + 1,
    }));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    displayedItems: [],
    page: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    status: "idle",
  },
  reducers: {

    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
      state.page = 1;
      state.displayedItems = action.payload.slice(0, state.itemsPerPage);
    },

    loadMore: (state) => {
      if (state.displayedItems.length < state.filteredItems.length) {
        state.page += 1;
        state.displayedItems = state.filteredItems.slice(
          0,
          state.page * state.itemsPerPage
        );
      }
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    b.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.page = 1;
      state.displayedItems = action.payload.slice(0, state.itemsPerPage);
      state.status = "success";
    });
    b.addCase(fetchProducts.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setFilteredItems, loadMore } = productsSlice.actions;
export default productsSlice.reducer;