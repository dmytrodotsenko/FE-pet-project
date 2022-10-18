import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";

export const getReasonsForIssue = createAsyncThunk(
    "chat/reasons",
    async (arg, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const response = await fetch(`${BASE_URL}/chats/subjects`, {
          headers: {
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        const results = data.map((el) => ({ label: el.title, id: el.id }));
        return results;
      } catch (error) {}
    }
  );
  export const createChat = createAsyncThunk(
    "chat/createChat",
    async ({ subject, text }, {getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const config = {
          method: "POST",
          body: JSON.stringify({ subject, text }),
          headers: {
            Authorization: "Token " + user.userToken,
            "Content-type": "application/json",
          },
        };
        const response = await fetch(`${BASE_URL}/chats/create/`, config);
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
  export const getChats = createAsyncThunk(
    "chat/chats",
    async ({archive}, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const response = await fetch(`${BASE_URL}/chats/?is_archive=${archive}`, {
          headers: {
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        // const results = data.map((el) => ({ label: el.title, id: el.id }));
        return data;
      } catch (error) {}
    }
  );

  export const getMessanges = createAsyncThunk(
    "chat/messanges",
    async ({id}, { getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const response = await fetch(`${BASE_URL}/chats/${id}/messages/`, {
          headers: {
            Authorization: "Token " + user.userToken,
          },
        });
        const data = await response.json();
        console.log(data, '123')
        return data.reverse();
      } catch (error) {}
    }
  );
  export const sendMessage = createAsyncThunk(
    "chat/send",
    async ({ text, id }, {getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const config = {
          method: "POST",
          body: JSON.stringify({text }),
          headers: {
            Authorization: "Token " + user.userToken,
            "Content-type": "application/json",
          },
        };
        const response = await fetch(`${BASE_URL}/chats/${id}/messages/`, config);
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
  export const archivateChat = createAsyncThunk(
    "chat/archive",
    async ({id, isArchive}, {getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const config = {
          method: "PATCH",
          body: JSON.stringify({is_archive: isArchive }),
          headers: {
            Authorization: "Token " + user.userToken,
            "Content-type": "application/json",
          },
        };
        const response = await fetch(`${BASE_URL}/chats/${id}/`, config);
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
  export const deleteChat = createAsyncThunk(
    "chat/archive",
    async ({id}, {getState, rejectWithValue }) => {
      try {
        const { user } = getState();
        const config = {
          method: "DELETE",
          headers: {
            Authorization: "Token " + user.userToken,
            "Content-type": "application/json",
          },
        };
        const response = await fetch(`${BASE_URL}/chats/${id}/`, config);
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