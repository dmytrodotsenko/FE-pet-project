import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseAlert } from "../store/ui/uiSlice";
import { deleteItem } from "../store/items/itemActions";
export default function AlertDialog() {
  const ui = useSelector((state) => state.ui);
  const item = useSelector((state) => state.item);
  const { currentItem } = item;
  const dispatch = useDispatch();
  const { openAlert } = ui;

  const handleClose = () => {
    dispatch(handleCloseAlert());
  };
  const handleConfirm = () => {
    dispatch(handleCloseAlert());
    dispatch(deleteItem(currentItem.id));
    handleClose();
    window.location.href = "http://localhost:3000/home/admin";
  };

  return (
    <div>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are tou sure that you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
