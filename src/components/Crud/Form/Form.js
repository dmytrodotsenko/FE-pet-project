import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import StyledBlock from "../../../ui/StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../../store/items/itemActions";
import { handleCloseModal } from "../../../store/ui/uiSlice";
import { updateItem } from "../../../store/items/itemActions";

export const Form = () => {
  const ui = useSelector((state) => state.ui);
  const item = useSelector((state) => state.item);
  const {isUpdateModal} = ui;
  const {currentItem} = item;
  const dispatch = useDispatch();
  const getAllData = (e) => {
    const data = new FormData(e.currentTarget);
    const category = item.categories.find(el => el.title === data.get('category'))
    return {
      title: data.get('title'),
      description: data.get('description'),
      price: +data.get('price'),
      category: category.id
    }
  }
  console.log(isUpdateModal, 'kk')
  const handleClose = () => {
    dispatch(handleCloseModal())
    // dispatch(resetCurrentItem());
    console.log(item.currentItem, 'hello')
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = getAllData(event);
    if(!isUpdateModal){
      dispatch(createItem(data))
    }
    if(isUpdateModal){
      dispatch(updateItem({id: currentItem.id, body: data}))
    }
    handleClose();
    window.location.href = 'http://localhost:3000/home/admin'
  };
  
  return (
    <>
    {!item.loading && 
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          fullWidth
          margin="normal"
          required
          id="title"
          name="title"
          variant="outlined"
          type="text"
          label={"Title"}
          defaultValue={isUpdateModal ? currentItem.title : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          required
          id="description"
          name="description"
          variant="outlined"
          type="textarea"
          label="Description"
          defaultValue={isUpdateModal ? currentItem.description : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          required
          id="price"
          name="price"
          variant="outlined"
          type="number"
          label={"Price $"}
          defaultValue={isUpdateModal ? currentItem.price : ''}
        />
        <Box sx={{width: '100%'}}>
        <Typography sx={{textAlign: 'left'}}>Category</Typography>
        <Select
          fullWidth
          required
          id="category"
          name="category"
          variant="outlined"
          defaultValue={isUpdateModal ? currentItem.category.title : ''}
        >
          {item.categories.map((item) => (
            <MenuItem key={item.id} value={item.title}
              >{item.title}
            </MenuItem>
          ))}
        </Select>
        </Box>
        <StyledBlock>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </StyledBlock>
      </Box>}
    </>
  );
};
