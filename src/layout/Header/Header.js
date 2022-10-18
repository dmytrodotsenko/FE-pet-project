import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HeaderOptions from "./HeaderOptions";
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import { useMatch } from "react-router-dom";


const Header = (props) => {
  const user = useSelector((state) => state.user);
  const dialogs = useMatch('/messages');
  const chat = useMatch('/chat/:id')
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          background: "white",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              width: "70%",
              alignItems: "center",
            }}
          >
            <img
              onClick={() =>
                (window.location.href = `http://localhost:3000/home/${
                  user.isAdmin ? "admin" : "user"
                }`)
              }
              src={require("../../assets/Logo.png")}
              alt="No logo loaded"
              style={{cursor: 'pointer'}}
            />
            {user.userToken && (
              <Box sx={{ width: "90%" }}>
                {(!dialogs && !chat) && <SearchBar />}
              </Box>
            )}
            <HeaderOptions />
            {(user.isAdmin === true || user.userToken === null) ? null : <Cart/>}
          </Box>
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
};

export default Header;
