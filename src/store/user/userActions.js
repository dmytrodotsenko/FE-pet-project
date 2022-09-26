import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
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