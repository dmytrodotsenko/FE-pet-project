import { createSlice } from "@reduxjs/toolkit";
import { getReasonsForIssue, getChats, getMessanges } from "./chatActions";
const initialState = {
  subjects: [],
  loading: false,
  dialogs: [],
  messanges: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: {
        [getReasonsForIssue.fulfilled]: (state, {payload}) => {
            state.subjects = payload;
            state.loading = false;
        },
        [getReasonsForIssue.pending]: (state) => {
            state.loading = true;
            
        },
        [getChats.fulfilled]: (state, {payload}) => {
            console.log(payload, 'payload')
            state.dialogs = payload
        },
        [getMessanges.fulfilled]: (state, {payload}) => {
            state.messanges = payload;
        }
    },
})

export default chatSlice.reducer;