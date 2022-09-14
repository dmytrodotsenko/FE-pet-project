import React from "react";
import { Badge } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ButtonItem from "../../ui/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import StyledBlock from "../../ui/StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";

export default function HeaderMenu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLogin = () => {
    navigate("/signin");
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
            <ButtonItem text="create" style={{ width: "30%", height: 30 }} />
          )}
          {!user.isAdmin && (
            <Badge color="primary" badgeContent={3}>
              <ShoppingCartIcon />
            </Badge>
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
