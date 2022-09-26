import { createSlice } from "@reduxjs/toolkit";
import { createItem, updateItem } from "../items/itemActions";
const initialState = {
  openModal: false,
  isUpdateModal: false,
  openAlert: false,
  error: false,
  errorMessage: '',
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    handleOpenModal: (state, { payload }) => {
      if (payload === true) {
        state.openModal = true;
        state.isUpdateModal = true;
      } else {
        state.isUpdateModal = false;
        state.openModal = true;
      }
    },
    handleCloseModal: (state) => {
      state.openModal = false;
    },
    handleOpenAlert: (state) => {
      state.openAlert = true;
    },
    handleCloseAlert: (state) => {
      state.openAlert = false;
    },
  },
  extraReducers: {
    [createItem.rejected]: (state, {payload}) => {
        state.error = true;
        state.openModal = true;
        state.errorMessage = payload
      },
      [createItem.fulfilled]: (state) => {
        state.openModal = false
        state.error = false;
      },
      [updateItem.rejected]: (state, {payload}) => {
        state.error = true;
        state.openModal = true;
        state.errorMessage = payload
      },
      [updateItem.fulfilled]: (state) => {
        state.openModal = false
        state.error = false;
      },
  }
});
export const {
  handleCloseModal,
  handleOpenModal,
  handleCloseAlert,
  handleOpenAlert,
} = uiSlice.actions;
export default uiSlice.reducer;
