import { createSlice, current } from "@reduxjs/toolkit";
import { getCartList } from "./cartActions";

const initialState = {
  cartOpen: false,
  cartItems: [],
  loading: false,
  totalItems: 0,
  totalPrice: 0,
  totalUAH: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleOpenCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    handleTotalBadge: (state) => {
      state.totalItems += 1;
    },
    handleChangeItemCount: (state, { payload }) => {
      const data = current(state.cartItems);
      const currentObj = data.find((el) => el.id === payload.id);
      const newData = data.map((obj) => {
        if (obj.id === payload.id) {
          return {
            ...obj,
            amount:
              payload.operation === "+"
                ? currentObj.amount + 1
                : currentObj.amount - 1,
            price:
              payload.operation === "+"
                ? +currentObj.price + +currentObj.item.price
                : +currentObj.price - +currentObj.item.price,
          };
        }
        return obj;
      });
      state.cartItems = newData;
      state.totalPrice =
        payload.operation === "+"
          ? +state.totalPrice + +currentObj.item.price
          : +state.totalPrice - +currentObj.item.price;
    },
    deleteItemFromCart: (state, { payload }) => {
      const data = current(state.cartItems);
      const currentObj = data.find((el) => el.id === payload);
      state.cartItems = data.filter((el) => el.id !== payload);
      state.totalPrice = +state.totalPrice - +currentObj.price
    },
  },
  extraReducers: {
    [getCartList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cartItems = payload.item_units;
      state.totalItems = payload.total_items_amount;
      state.totalPrice = payload.total_price;
      state.totalUAH = payload.total_price_uah;
    },
    [getCartList.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default cartSlice.reducer;
export const {
  handleOpenCart,
  handleTotalBadge,
  handleChangeItemCount,
  deleteItemFromCart,
} = cartSlice.actions;
