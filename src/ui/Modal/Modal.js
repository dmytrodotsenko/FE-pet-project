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
          {`Please fill all fields to ${ui.isUpdateModal ? 'Update this item' : 'Create new item'}`}
        </DialogTitle>
        <DialogContent>
          <Form />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
