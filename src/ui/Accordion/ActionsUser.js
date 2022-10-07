import React, { useState } from "react";
import CountInput from "../CountInput";
import ButtonItem from "../Button";
import { Typography } from "@mui/material";
import StyledBlock from "../StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box } from "@mui/system";
import { handleOpenCart } from "../../store/cart/cartSlice";
import { handleTotalBadge } from "../../store/user/userSlice";
import { addToCart } from "../../store/cart/cartActions";
import { succsessAlert } from "../Alerts";

const ActionsUser = (props) => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const addCart = () => {
    console.log(props.item, "item");
    setAdd(true);
    dispatch(addToCart({ item: props.id }));
    dispatch(handleTotalBadge())
    succsessAlert('This item added to the cart');
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
