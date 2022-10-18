import React from 'react';
import { Box } from '@mui/system';

import { Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { UpdateProfile } from '../../store/user/userActions';
const PasswordChange = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        dispatch(
          UpdateProfile({
            password: data.get('password'),
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
          width: '60%', 
          ml: 30,
          mt: 20
        }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Typography variant="h5">Set new password to confirm</Typography>
        <TextField
          // error={error}
          // helperText={errorMessage}
          fullWidth
          margin="normal"
          required
          id="password"
          name="password"
          variant="standard"
          type="password"
          label={"New Password"}
        //   defaultValue={userInfo.name}
        />
        <TextField
          // error={error}
          // helperText={errorMessage}
          fullWidth
          margin="normal"
          required
          id="confirmpass"
          name="confirmpass"
          variant="standard"
          type="password"
          label={"Confirm Password"}
        //   defaultValue={userInfo.email}
        />
        <Button type='submit'>Change password</Button>
        </Box>
    );
};

export default PasswordChange;