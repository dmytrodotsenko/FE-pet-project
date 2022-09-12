import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";

const Header = (props) => {
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          background: "white",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            noWrap
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img src={require("../../assets/Logo.png")} alt="No logo loaded" />
            <Box sx={{ width: "90%" }}>
              <SearchBar />
            </Box>
          </Box>
          <nav>
            <NavLink to="/" className="test">
              Home
            </NavLink>
            
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
};

export default Header;
