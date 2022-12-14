import { createSlice, current } from "@reduxjs/toolkit";
import { getListOfItems, getCategories, getItemById, getCountries } from "./itemActions";

const initialState = {
  loading: false,
  error: null,
  success: null,
  items: [],
  filterValue: {
    category: null,
    sort: null,
    searchTitle: '',
    searchDesc: '',
    searchInput: '',
    searchCountry: '',
  },
  categories: [],
  pageCount: 0,
  currentPage: 1,
  currentItem: null,
  countries: [],
  isInCart: false,
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
    setSearchedValue: (state, { payload }) => {
        state.filterValue.searchDesc = payload.descriptionFilter;
        state.filterValue.searchTitle = payload.titleFilter;
        state.filterValue.searchInput = payload.inputValue;
        state.filterValue.searchCountry = payload.countryFilter;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    toggleInCart: (state, {payload}) => {
      console.log('here')
      const data = current(state.items);
      const newData = data.map(item => {
        if(item.id === payload){
          return {
            ...item,
            in_cart: false,
          }
        }
        return item;
      })
      state.items = newData;
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
    [getCountries.fulfilled]: (state, { payload }) => {
      state.countries = payload;
    },
    [getItemById.pending]: (state) => {
      state.loading = true;
    },
    [getItemById.fulfilled]: (state, { payload }) => {
      state.currentItem = payload;
      state.loading = false;
    },
  },
});
export const {
  setFilteredValue,
  resetCurrentItem,
  setSearchedValue,
  setCurrentPage,
  toggleInCart
} = itemSlice.actions;
export default itemSlice.reducer;
