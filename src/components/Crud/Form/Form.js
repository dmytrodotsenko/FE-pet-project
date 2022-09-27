import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import StyledBlock from "../../../ui/StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  updateItem,
  getCountries,
} from "../../../store/items/itemActions";
import { handleCloseModal } from "../../../store/ui/uiSlice";
import Autocomplete from "@mui/material/Autocomplete";
import ImageUploader from "react-images-upload";

export const Form = () => {
  const [image, setImage] = useState([]);
  const ui = useSelector((state) => state.ui);
  const item = useSelector((state) => state.item);
  const { isUpdateModal, openModal, error, errorMessage } = ui;
  const { currentItem, countries } = item;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  
  useEffect(() => {
    if (!openModal) {
      window.location.href = "http://localhost:3000/home/admin";
    }
  }, [openModal]);

  const onSetImage = (a, pictureDataURLs) => {
    setImage(image.concat(pictureDataURLs));
  };
  const getAllData = (e) => {
    const data = new FormData(e.currentTarget);
    const category = item.categories.find(
      (el) => el.title === data.get("category")
    );
    console.log(image)
    const country = countries.find((el) => el.label === data.get("country"));
    return {
      title: data.get("title"),
      description: data.get("description"),
      price: +data.get("price"),
      category: category.id,
      country: country.id,
      image: image[0]
    };
  };

  const handleClose = () => {
    dispatch(handleCloseModal());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = getAllData(event);
    console.log(data, 'dsadas')
    if (!isUpdateModal) {
      dispatch(createItem(data));
    }
    if (isUpdateModal) {
      dispatch(updateItem({ id: currentItem.id, body: data }));
    }
  };

  return (
    <>
      {!item.loading && (
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
            error={error}
            helperText={errorMessage}
            fullWidth
            margin="normal"
            required
            id="title"
            name="title"
            variant="outlined"
            type="text"
            label={"Title"}
            defaultValue={isUpdateModal ? currentItem.title : ""}
          />
          <TextField
            error={error}
            helperText={errorMessage}
            fullWidth
            margin="normal"
            required
            id="description"
            name="description"
            variant="outlined"
            type="textarea"
            label="Description"
            defaultValue={isUpdateModal ? currentItem.description : ""}
          />
          <TextField
            error={error}
            helperText={errorMessage}
            fullWidth
            margin="normal"
            required
            id="price"
            name="price"
            variant="outlined"
            type="number"
            label={"Price $"}
            defaultValue={isUpdateModal ? currentItem.price : ""}
          />
          
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ textAlign: "left" }}>Category</Typography>
            <Select
              error={error}
              fullWidth
              required
              id="category"
              name="category"
              variant="outlined"
              defaultValue={
                isUpdateModal
                  ? currentItem.category.title
                  : item.categories[0].title
              }
            >
              {item.categories.map((item) => (
                <MenuItem key={item.id} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={countries}
              sx={{ mt: 2 }}
              renderInput={(params) => (
                <TextField
                  id="country"
                  name="country"
                  {...params}
                  label={isUpdateModal ? currentItem.country.title : "Country"}
                />
              )}
            />
            <Typography sx={{mt: 2, ml: '45%'}}>Image: </Typography>
            <ImageUploader
              withIcon={true}
              withPreview={true}
              buttonText="Choose image"
              onChange={onSetImage}
              imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </Box>
          <StyledBlock>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </StyledBlock>
        </Box>
      )}
    </>
  );
};
