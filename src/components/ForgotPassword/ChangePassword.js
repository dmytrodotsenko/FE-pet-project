import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonItem from "../../ui/Button";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const { token } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPass = data.get("password");
    const confirmPass = data.get("confirmPassword");
    try {
      const response = await fetch(`${BASE_URL}/users/password/confirm/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: newPass,
          password_confirm: confirmPass,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      if (response.ok) {
        setConfirm(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {!confirm && (
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
      {confirm && (
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
              Your password successfully changed.
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChangePassword;
