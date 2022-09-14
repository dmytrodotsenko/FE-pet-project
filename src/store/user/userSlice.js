import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./userActions";
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
let userToken;
let isAdmin;
if (userDetails) {
  userToken = userDetails.token;
  isAdmin = userDetails.isAdmin;
} else {
  userToken = null;
  isAdmin = null;
}
const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  isAdmin,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userDetails");
      state.userToken = null;
      state.isAdmin = null;
    },
    resetState: (state) => {
        state.error = null;
        state.success = false;
    }, 
    googleLogin: (state, {payload}) => {

          state.userToken = payload.token;
          state.isAdmin = payload['is_admin'];
          state.success = true;
    }
  },
  extraReducers: {
    // USER REGISTER REDUCERS
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.token;
      state.isAdmin = payload['is_admin'];
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    // USER LOGIN REDUCERS
    [userLogin.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [userLogin.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.token;
        state.isAdmin = payload['is_admin'];
        state.success = true;
      },
      [userLogin.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      },
  },
});
export const { logout, resetState, googleLogin } = userSlice.actions
export default userSlice.reducer;
