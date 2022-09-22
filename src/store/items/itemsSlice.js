import { createSlice } from "@reduxjs/toolkit";
import { getListOfItems, getCategories, getItemById } from "./itemActions";

const initialState = {
  loading: false,
  error: null,
  success: null,
  items: [],
  filterValue: { category: null, sort: null },
  categories: [],
  pageCount: 0,
  currentItem: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setFilteredValue: (state, { payload }) => {
      if (typeof payload === "number") {
        state.filterValue.category = payload;
      }
      if (typeof payload === "string") {
        state.filterValue.sort = payload;
      }
    },
    resetCurrentItem: (state) => {
      state.currentItem = null;
    }
  },
  extraReducers: {
    [getListOfItems.pending]: (state) => {
      state.loading = true;
    },
    [getListOfItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload.results;
      state.pageCount = payload.count;
      
    },
    [getListOfItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload;
    },
    [getItemById.pending]: (state) => {
      state.loading = true;
    },
    [getItemById.fulfilled]: (state, {payload}) => {
      state.currentItem = payload
      state.loading = false;
    }
    
  },
});
export const { setFilteredValue, resetCurrentItem } = itemSlice.actions;
export default itemSlice.reducer;
