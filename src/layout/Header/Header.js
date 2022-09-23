import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HeaderMenu from "./HeaderMenu";
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Header = (props) => {
  const user = useSelector((state) => state.user);

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
            <img src={require("../../assets/Logo.png")} alt="No logo loaded" />
            {user.userToken && (
              <Box sx={{ width: "90%" }}>
                <SearchBar />
              </Box>
            )}
            <HeaderMenu />
          </Box>
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
};

export default Header;
