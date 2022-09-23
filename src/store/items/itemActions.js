import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
export const getListOfItems = createAsyncThunk(
  "item/getItems",
  async ({ filter, sort, page }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const url =
        user.userToken === null
          ? `${BASE_URL}/items/short/`
          : `${BASE_URL}/items/?category=${filter ? filter : ""}&sorting=${
              sort ? sort : ""
            }&page=${page ? page : 1}`;

      const response = await fetch(url, {
        headers: {
          Authorization:
            user.userToken === null ? "" : "Token " + user.userToken,
        },
      });
      const data = await response.json();

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

export const getCategories = createAsyncThunk(
  "items/getCategories",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/items/categories/`, {
        headers: {
          Authorization: "Token " + user.userToken,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  }
);
export const createItem = createAsyncThunk(
  "item/createItem",
  async (
    { title, description, price, category },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState();
      const url = `${BASE_URL}/items/create/`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ title, description, price, category }),
        headers: {
          "Content-type": "application/json",
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
export const getItemById = createAsyncThunk(
  "items/getItemById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/items/${id}/`, {
        headers: {
          Authorization: "Token " + user.userToken,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  }
);
export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, body }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/items/${id}/`, {
        method: "PUT",
        body: JSON.stringify({ ...body }),
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
export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(`${BASE_URL}/items/${id}/`, {
        method: "DELETE",
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
export const getSearchedItems = createAsyncThunk(
  "items/search",
  async ({ query, description, title, page }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const response = await fetch(
        `${BASE_URL}/items/?q=${query}&t=${title}&d=${description}&page=${page}`,
        {
          headers: {
            Authorization: "Token " + user.userToken,
          },
        }
      );
      const data = await response.json();
      console.log(data, "resp");
      return data;
    } catch (error) {}
  }
);
