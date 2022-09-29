import React, { useState } from "react";
import CountInput from "../CountInput";
import ButtonItem from "../Button";
import { Typography } from "@mui/material";
import StyledBlock from "../StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box } from "@mui/system";
import { handleOpenCart, handleTotalBadge } from "../../store/cart/cartSlice";
import { addToCart } from "../../store/cart/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionsUser = (props) => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const addCart = () => {
    console.log(props.item, "item");
    setAdd(true);
    dispatch(addToCart({ item: props.id }));
    dispatch(handleTotalBadge())
    toast.success("This item added to the cart", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // window.location.href = "http://localhost:3000/home/admin";
  };
  const openCart = () => {
    dispatch(handleOpenCart());
  };
  return (
    <StyledBlock
      sx={{
        width: "30%",
        justifyContent: "space-around",
        pointerEvents: "auto",
      }}
    >
      {!props.inCart && !add && (
        <>
          <ButtonItem
            onClick={addCart}
            text="add to cart"
            style={{ width: "100%", mr: 2 }}
          />
          <ToastContainer />
        </>
      )}
      {(props.inCart || add) && (
        <StyledBlock onClick={openCart}>
          <AddShoppingCartIcon style={{ fill: "green" }} />
          <Typography color="green" variant="subtitle1">
            Added to cart
          </Typography>
        </StyledBlock>
      )}
      <Typography sx={{ color: "text.secondary" }}>${props.price}</Typography>
    </StyledBlock>
  );
};

export default ActionsUser;
