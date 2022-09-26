import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonItem from "../../ui/Button";
import { resetPassword } from "../../store/user/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = () => {
  const { token } = useParams();
  const user = useSelector((state) => state.user);
  const { success, error } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      window.location.href = `http://localhost:3000/home/${
        user.isAdmin ? "admin" : "user"
      }`;
    }
  }, [success, navigate, user.isAdmin]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPass = data.get("password");
    const confirmPass = data.get("confirmPassword");
    dispatch(
      resetPassword({
        password: newPass,
        password_confirm: confirmPass,
        token: token,
      })
    );
  };

  return (
    <>
      {!success && (
        <Card
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "50%",
            ml: "25%",
            mt: "10%",
          }}
        >
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Please enter new password to change it:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
              component="form"
              noValidate
            >
              <TextField
                error={error}
                helperText={error}
                margin="normal"
                required
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                variant="standard"
                type="password"
              />
              <TextField
                error={error}
                helperText={error}
                margin="normal"
                required
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                variant="standard"
              />
              <ButtonItem
                type="submit"
                text="change password"
                style={{ mt: 5 }}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChangePassword;
