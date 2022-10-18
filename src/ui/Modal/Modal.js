import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal } from "../../store/ui/uiSlice";
import { Form } from "../../components/Crud/Form/Form";
import { Box } from "@mui/material";
import { createItem } from "../../store/items/itemActions";
import ChatForm from "../../pages/Chat/ChatForm";
export default function Modal() {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleCloseModal());
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Dialog fullWidth open={ui.openModal} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        {ui.isChatModal && 'Enter message and type of your issue'}
          {ui.isUpdateModal && 'Please enter all fields'}
        </DialogTitle>
        <DialogContent>
          {ui.isChatModal  ? <ChatForm/> : <Form /> }
        </DialogContent>
      </Dialog>
    </Box>
  );
}
