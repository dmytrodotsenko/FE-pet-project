import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  isUpdateModal: false,
  openAlert: false,
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
});
export const {
  handleCloseModal,
  handleOpenModal,
  handleCloseAlert,
  handleOpenAlert,
} = uiSlice.actions;
export default uiSlice.reducer;
