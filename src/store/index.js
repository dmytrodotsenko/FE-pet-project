import { configureStore } from "@reduxjs/toolkit";
import itemReducer from './items/itemsSlice';
import userReducer from './user/userSlice';
import uiReducer from "./ui/uiSlice";
import cartReducer from './cart/cartSlice';
import chatReducer from './chat/chatSlice'

export  const store = configureStore({
    reducer: {
        item: itemReducer,
        user: userReducer,
        ui: uiReducer,
        cart: cartReducer,
        chat: chatReducer,
    }
})