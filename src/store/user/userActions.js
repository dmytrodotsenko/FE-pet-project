import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import { errorAlert, succsessAlert } from "../../ui/Alerts";
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(`${BASE_URL}/users/register/`, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ token: data.token, isAdmin: data["is_admin"] })
      );
      //   console.log(data, "dasdasda");
      return data;
    } catch (error) {
      
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const registerGoogle = createAsyncThunk(
  "user/registerGoogle",
  async ({ token, google_id, password, password_confirm }, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify({ token, google_id, password_confirm, password }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(`${BASE_URL}/users/google/register/`, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ token: data.token, isAdmin: data["is_admin"] })
      );
      //   console.log(data, "dasdasda");
      return data;
    } catch (error) {
      
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(`${BASE_URL}/users/login/`, config);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ token: data.token, isAdmin: data["is_admin"] })
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset",
  async ({ password, password_confirm, token }, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify({ password_confirm, password, token }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(`${BASE_URL}/users/password/confirm/`, config);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ token: data.token, isAdmin: data["is_admin"] })
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getProfile = createAsyncThunk(
  "items/getProfile",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/users/profile/`, {
        headers: {
          Authorization: "Token " + user.userToken,
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const attachGoogle = createAsyncThunk(
  "items/attachGoogle",
  async ({token, google_id}, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/users/google/add/`, {
        method: 'POST',
        body: JSON.stringify({token, google_id}),
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + user.userToken,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log('hereee')
        errorAlert(data.error.message);
        throw new Error(data.error.message);
      }
      if(response.ok){
      succsessAlert('Google account attach succsess')
      }
      return data;
    } catch (error) {
      console.log(error, 'sdasdasda')
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteGoogle = createAsyncThunk(
  "items/deleteGoogle",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/users/google/remove/`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + user.userToken,
        },
      });
      if(response.ok){
        succsessAlert('Your google account is disabled!')
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  }
);