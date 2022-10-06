import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
export const getCartList = createAsyncThunk(
  "cart/getCart",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const url = `http://127.0.0.1:8000/api/v1/cart/`;
      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + user.userToken,
        },
      });
      const data = await response.json();
      console.log(data, 'dasdas')
      return data;
    } catch (error) {}
  }
);
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ item }, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const response = await fetch(`${BASE_URL}/cart/unit/`, {
          method: "POST",
          body: JSON.stringify({ item }),
          headers: {
            "Content-type": "application/json",
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  );
  export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, amount }, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const response = await fetch(`${BASE_URL}/cart/unit/${id}/`, {
          method: "PATCH",
          body: JSON.stringify({ amount }),
          headers: {
            "Content-type": "application/json",
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  );
  export const deleteCartItem = createAsyncThunk(
    "cart/delete",
    async ({ id, amount }, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const response = await fetch(`${BASE_URL}/cart/unit/${id}/`, {
          method: "DELETE",
          body: JSON.stringify({ amount }),
          headers: {
            "Content-type": "application/json",
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  );
  export const buyItems = createAsyncThunk(
    "cart/buyItems",
    async (arg, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const url = `http://127.0.0.1:8000/api/v1/cart/buy/`;
        const response = await fetch(url, {
          headers: {
            "Content-type": "application/json",
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  );