import { configureStore } from "@reduxjs/toolkit";
import itemReducer from './items/itemsSlice';
import userReducer from './user/userSlice';
import uiReducer from "./ui/uiSlice";

export  const store = configureStore({
    reducer: {
        item: itemReducer,
        user: userReducer,
        ui: uiReducer,
    }
})