import { Avatar, Divider, Drawer, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenCart, handleChangeItemCount, deleteItemFromCart } from "../../store/cart/cartSlice";
import CountInput from "../../ui/CountInput";
import StyledBlock from "../../ui/StyledBlock";
import CloseIcon from "@mui/icons-material/Close";
import ButtonItem from "../../ui/Button";
import { getCartList, updateCart, deleteCartItem } from "../../store/cart/cartActions";
import { toggleInCart } from "../../store/items/itemsSlice";
import Spinner from "../../ui/Spinner/Spinner";

const Cart = () => {
  const cartCtx = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartOpen, cartItems, loading, totalPrice } = cartCtx;
  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch, cartOpen]);
  const handleClose = () => {
    dispatch(handleOpenCart());
  };

  const handleCartOperation = (id, amount, operation) => {
    dispatch(updateCart({ id, amount }));
    dispatch(handleChangeItemCount({ id: id, operation: operation }));
  };
  const handleDeleteItem = (id, cartId, amount) => {
    dispatch(toggleInCart(cartId));
    dispatch(deleteItemFromCart(id))
    dispatch(deleteCartItem({id, amount}))
  }
  return (
    <>
      {loading && <Spinner />}
      <Drawer
        open={cartCtx.cartOpen}
        onClose={handleClose}
        anchor="right"
        PaperProps={{
          sx: { width: "80%", backgroundColor: "#ECF0F1" },
        }}
      >
        <StyledBlock
          sx={{ p: 4, justifyContent: "center", flexDirection: "column" }}
        >
          <Typography variant="h4">Your Cart</Typography>
          <Typography variant="body1" color={"gray"}>
            Here you can see your products...
          </Typography>

          {cartItems.map((i) => (
            <Paper
              key={i.id}
              elevation={0}
              sx={{
                mt: 2,
                width: "90%",
                padding: 4,
              }}
            >
              <Box
                display={"flex"}
                sx={{ pt: 2, pb: 2 }}
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Avatar src={i.item.image} sx={{ width: 80, height: 50 }} />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ width: "20%" }}
                >
                  <Typography variant="h6">
                    {i.item.title} | {i.item.category.title}
                  </Typography>
                </Box>
                <Box sx={{ width: "10%" }}>
                  <CountInput
                    handleIncrement={() =>
                      handleCartOperation(i.id, i.amount + 1, "+")
                    }
                    handleDecrement={() =>
                      handleCartOperation(i.id, i.amount - 1, "-")
                    }
                    count={i.amount}
                  />
                </Box>
                <Typography variant="body1">${i.price}</Typography>
                <Box sx={{cursor: 'pointer'}} onClick={() => handleDeleteItem(i.id, i.item.id, i.amount)}>
                  <CloseIcon />
                </Box>
              </Box>
            </Paper>
          ))}
          <StyledBlock
            sx={{
              width: "100%",
              mt: 2,
              mr: 3,
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Typography variant="body1">Total price: ${totalPrice}</Typography>
            <ButtonItem style={{ mt: 2, width: 100 }} text="Buy" />
          </StyledBlock>
        </StyledBlock>
      </Drawer>
    </>
  );
};

export default Cart;
