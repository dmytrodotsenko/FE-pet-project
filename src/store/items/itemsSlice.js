import { createSlice } from "@reduxjs/toolkit";
import { getListOfItems, getCategories, getItemById, getSearchedItems } from "./itemActions";

const initialState = {
  loading: false,
  error: null,
  success: null,
  items: [],
  filterValue: { category: null, sort: null },
  categories: [],
  pageCount: 0,
  currentItem: null,
  searching: false,
  searchedItems: [],
  
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
    }, 
    setSearchedValue: (state) => {
      state.searching = false;
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
    }, 
    [getSearchedItems.pending]: (state) => {
      state.loading = true;
    },
    [getSearchedItems.fulfilled]: (state, {payload}) =>{
      state.loading = false;
      state.searchedItems = payload.results;
      state.searching = true;
      state.pageCount = payload.count;
    }
    
  },
});
export const { setFilteredValue, resetCurrentItem, setSearchedValue } = itemSlice.actions;
export default itemSlice.reducer;
