import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../components/ItemList/PaginateItems";
import FilterBar from "./FilterBar";
import { handleOpenModal } from "../../store/ui/uiSlice";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOpenChat = () => {
    dispatch(handleOpenModal("chat"));
  };
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
      <Box sx={{ mt: 5 }}>
        <Paginate countOfItems={5} />
      </Box>
      <Box
        onClick={handleOpenChat}
        sx={{
          cursor: "pointer",
          position: "fixed",
          bottom: 0,
          right: 0,
          mb: 4,
          mr: 5,
        }}
      >
        {!user.isAdmin && <ContactMailIcon sx={{ height: 50, width: 50, color: "green" }} />}
      </Box>
    </>
  );
};

export default HomePage;
