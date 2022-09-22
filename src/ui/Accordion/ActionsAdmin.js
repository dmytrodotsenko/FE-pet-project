import React, { useState } from "react";
import ButtonItem from "../Button";
import { Typography } from "@mui/material";
import Modal from "../Modal/Modal";
import StyledBlock from "../StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenModal, handleOpenAlert } from "../../store/ui/uiSlice";
import { getItemById } from "../../store/items/itemActions";
const AdminActions = (props) => {
  
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  
  const handleOpenUpdateModal = () => {
    dispatch(handleOpenModal(true));
    dispatch(getItemById(props.id))
  };
  const handleOpenAlertDialog = () => {
    dispatch(handleOpenAlert());
    dispatch(getItemById(props.id))
  }
  return (
    <StyledBlock
      sx={{
        width: "30%",
        justifyContent: "space-around",
        pointerEvents: "auto",
      }}
    >
      <Typography sx={{ color: "text.secondary" }}>${props.price}</Typography>
      <ButtonItem
        onClick={handleOpenUpdateModal}
        bg="#6B6B6B"
        text="edit"
        style={{ width: "30%", height: 30 }}
      />
      <ButtonItem
        onClick={handleOpenAlertDialog}
        bg="#B73535"
        text="delete"
        style={{ width: "30%", height: 30 }}
      />
    </StyledBlock>
    
    
  );
};

export default AdminActions;
