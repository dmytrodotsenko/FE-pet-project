import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ListOfItems from "../ItemList/Itemlist";
import FilterBar from "./FilterBar";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Typography variant="h4">CATALOG</Typography>
      </Box>
      {user.userToken ? (
        <Box sx={{ mt: 5 }}>
          <FilterBar />
        </Box>
      ) : null}

      <Box sx={{mt: 5}}>
            <ListOfItems/>
        </Box>
    </>
  );
};

export default HomePage;
