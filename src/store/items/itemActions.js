import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
export const getListOfItems = createAsyncThunk(
  "item/getItems",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // const config
      //  console.log(`${BASE_URL}/items/short/`);
      const { user } = getState();
      console.log(user.userToken, "userState");
      const url =
        user.userToken === null
          ? `${BASE_URL}/items/short/`
          : `${BASE_URL}/items/`;
      const response = await fetch(url, {
        headers: {
          Authorization:
            user.userToken === null ? "" : "Token " + user.userToken,
        },
      });
      const data = response.json();

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
