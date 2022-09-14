import { configureStore } from "@reduxjs/toolkit";
import itemReducer from './items/itemsSlice';
import userReducer from './user/userSlice'

export  const store = configureStore({
    reducer: {
        item: itemReducer,
        user: userReducer,
    }
})