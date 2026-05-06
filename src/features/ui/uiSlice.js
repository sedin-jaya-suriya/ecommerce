

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    search: "",
    category: "all",
    view: "grid",
  },
  reducers: {
    setSearch: (s, a) => {
      s.search = a.payload;
    },
    setCategory: (s, a) => {
      s.category = a.payload;
    },
    setView: (s, a) => {
      s.view = a.payload;
    },
  },
});

export const { setSearch, setCategory, setView } = uiSlice.actions;
export default uiSlice.reducer;