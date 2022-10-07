import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  resetPassword,
  getProfile,
  registerGoogle,
  attachGoogle,
} from "./userActions";
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
let userToken;
let isAdmin;
let isGoogleLogin;
if (userDetails) {
  userToken = userDetails.token;
  isAdmin = userDetails.isAdmin;
  isGoogleLogin = {
    isRedister: userDetails.isRegistred,
    googleId: userDetails.googleId,
    googleToken: userDetails.googleToken,
  };
} else {
  userToken = null;
  isAdmin = null;
  isGoogleLogin = null;
}
const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  isAdmin,
  error: null,
  success: false,
  isGoogleLogin,
  isGoogleAccount: false,
  totalCartAmount: 0,
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
    googleLogin: (state, { payload }) => {
      state.userToken = payload.token;
      state.isAdmin = payload["is_admin"];
      state.success = true;
    },
    handleTotalBadge: (state) => {
      state.totalCartAmount += 1;
    },
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
      state.isAdmin = payload["is_admin"];
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [registerGoogle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerGoogle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.token;
      state.isAdmin = payload["is_admin"];
      state.success = true;
    },
    [registerGoogle.rejected]: (state, { payload }) => {
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
      state.isAdmin = payload["is_admin"];
      state.success = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    //RESET PASSWORD
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.token;
      state.isAdmin = payload["is_admin"];
      state.success = true;
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
      if(payload.cart){
      state.totalCartAmount = payload.cart.total_items_amount;
      }
    },
    [getProfile.pending]: (state, { payload }) => {
      state.loading = true;
      
    },
    [attachGoogle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});
export const { logout, resetState, googleLogin, handleTotalBadge } = userSlice.actions;
export default userSlice.reducer;
