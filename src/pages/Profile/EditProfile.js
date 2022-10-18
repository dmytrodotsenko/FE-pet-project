import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../../store/user/userActions";
const EditProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const onSetImage = (a, pictureDataURLs) => {
    setImage(image.concat(pictureDataURLs));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      UpdateProfile({
        phone_number: data.get("number"),
        address: data.get("address"),
        avatar: image[0],
      })
    );
    setTimeout(() => {
        window.location.href = "http://localhost:3000/profile"
    }, 2000)
    
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "60%",
        ml: 30,
      }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Typography variant="h5">
        Please fill the values what you want to change:
      </Typography>
      <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonText="Choose new avatar"
        onChange={onSetImage}
        imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <TextField
        // error={error}
        // helperText={errorMessage}
        fullWidth
        margin="normal"
        required
        id="name"
        name="name"
        variant="standard"
        type="text"
        label={"Full name"}
        defaultValue={userInfo.name}
      />
      <TextField
        // error={error}
        // helperText={errorMessage}
        fullWidth
        disabled
        margin="normal"
        required
        id="email"
        name="email"
        variant="standard"
        type="text"
        label={"Email"}
        defaultValue={userInfo.email}
      />
      <TextField
        // error={error}
        // helperText={errorMessage}
        fullWidth
        margin="normal"
        required
        id="address"
        name="address"
        variant="standard"
        type="text"
        label="Address"
        defaultValue={userInfo.address}
      />
      <TextField
        // error={error}
        // helperText={errorMessage}
        fullWidth
        margin="normal"
        required
        id="number"
        name="number"
        variant="standard"
        type="number"
        label={"Phone"}
        defaultValue={userInfo.phone_number}
      />
      <Button type="submit">Edit profile</Button>
    </Box>
  );
};

export default EditProfile;
