import { createSlice } from "@reduxjs/toolkit";
import { getListOfItems } from "./itemActions";

const initialState = {
  loading: false,
  error: null,
  success: null,
  items: [],
  
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
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
    }
  },
});

export default itemSlice.reducer;
