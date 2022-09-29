import React, { useEffect, useMemo } from "react";
import { Badge, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ButtonItem from "../../ui/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import StyledBlock from "../../ui/StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { handleOpenCart } from "../../store/cart/cartSlice";
import { handleOpenModal } from "../../store/ui/uiSlice";
export default function HeaderMenu() {
  const user = useSelector((state) => state.user);
  const ui = useSelector((state) => state.ui);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLogin = () => {
    navigate("/signin");
  };
  const handleOpenCreateModal = () => {
    dispatch(handleOpenModal(false));
  };
  
  return (
    <StyledBlock
      sx={{
        width: "30%",
        justifyContent: "space-around",
        
      }}
    >
      {user.userToken && (
        <>
          <nav>
            <NavLink
              style={{ display: "flex", color: "black" }}
              to="/home"
              className="test"
            >
              <PersonIcon />
              <Typography>{user.isAdmin ? "Admin" : "User"}</Typography>
            </NavLink>
          </nav>
          {user.isAdmin && (
            <ButtonItem
              onClick={handleOpenCreateModal}
              text="create"
              style={{ width: "30%", height: 30 }}
            />
          )}
          {!user.isAdmin && (
             <Box
             sx={{ cursor: 'pointer' }}
             onClick ={() => dispatch(handleOpenCart())}
           >
            <Badge color="primary" badgeContent={cart.totalItems}>
              <ShoppingCartIcon />
            </Badge>
            </Box>
          )}
        </>
      )}
      <ButtonItem
        onClick={user.userToken ? handleLogout : handleLogin}
        style={{ width: "30%", height: 30 }}
        text={user.userToken ? "Logout" : "Login"}
      />
    </StyledBlock>
  );
}
