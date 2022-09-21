import { createSlice } from "@reduxjs/toolkit";
import { getListOfItems, getCategories } from "./itemActions";

const initialState = {
  loading: false,
  error: null,
  success: null,
  items: [],
  filterValue: null,
  categories: [],
  
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setFilteredValue: (state, {payload}) => {
      state.filterValue = payload;
    }
  },
  extraReducers: {
    [getListOfItems.pending]: (state) => {
      state.loading = true;
    },
    [getListOfItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [getListOfItems.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
    },
    [getCategories.fulfilled]: (state, {payload}) => {
      state.categories = payload;
    }

  },
});
export const { setFilteredValue } = itemSlice.actions
export default itemSlice.reducer;
