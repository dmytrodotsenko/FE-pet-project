import React, { useEffect, useMemo } from "react";
import { Badge, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonItem from "../../ui/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import StyledBlock from "../../ui/StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenCart } from "../../store/cart/cartSlice";
import { handleOpenModal } from "../../store/ui/uiSlice";
import { getProfile } from "../../store/user/userActions";
import AccountMenu from "./AccountMenu";

export default function HeaderOptions() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, userToken } = user;
  useEffect(() => {
    if (userToken) {
      dispatch(getProfile());
    }
  }, [dispatch, userToken]);
  
  const handleLogin = () => {
    navigate("/signin");
  };
  return (
    <>
      <StyledBlock
        sx={{
          width: "30%",
          justifyContent: "space-around",
        }}
      >
        {user.userToken && (
          <>
            {!user.isAdmin && userInfo.cart && (
              <Box
                sx={{ cursor: "pointer", ml: 5 }}
                onClick={() => dispatch(handleOpenCart())}
              >
                <Badge
                  color="primary"
                  badgeContent={userInfo.cart.total_items_amount}
                >
                  <ShoppingCartIcon />
                </Badge>
              </Box>
            )}
            {user.userToken && (
              <StyledBlock>
                <Typography>{userInfo.name}</Typography>
                <AccountMenu />
              </StyledBlock>
            )}
          </>
        )}
        {!userToken && (
          <ButtonItem
            onClick={handleLogin}
            style={{ width: "30%", height: 30 }}
            text={"Login"}
          />
        )}
      </StyledBlock>
    </>
  );
}
