import { createSlice, current } from "@reduxjs/toolkit";
import { getCartList } from "./cartActions";

const initialState = {
  cartOpen: false,
  cartItems: [],
  loading: false,
  totalItems: 0,
  
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
    handleIncreaseItem: (state, { payload }) => {
      const data = current(state.cartItems);
      const currentObj = data.find((el) => el.id === payload);
      const newData = data.map((obj) => {
        if (obj.id === payload) {
          return {
            ...obj,
            amount: currentObj.amount + 1,
            price: +currentObj.price + +currentObj.item.price,
          };
        }
        return obj;
      });
      state.cartItems = newData;
    },
  },
  extraReducers: {
    [getCartList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cartItems = payload.item_units;
      state.totalItems = payload.total_items_amount;
    },
    [getCartList.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default cartSlice.reducer;
export const { handleOpenCart, handleTotalBadge, handleIncreaseItem } =
  cartSlice.actions;
