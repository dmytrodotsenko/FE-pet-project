import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonItem from "../../ui/Button";
import { BASE_URL } from "../../config";
import SuccsessReset from "./SuccsessReset";
const RessetPassword = () => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [erorMessage, setErorMessage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    try {
      const response = await fetch(`${BASE_URL}/users/password/forgot/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      if (response.ok) {
        setSendingEmail(true);
      }
    } catch (error) {
      setErorMessage(error.message);
    }
  };
  return (
    <>
      {!sendingEmail && (
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
              For resset your password please enter your e-mail:
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
                error={erorMessage !== null}
                margin="normal"
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                variant="standard"
                helperText={erorMessage}
              />
              <ButtonItem type="submit" text="reset" style={{ mt: 5 }} />
            </Box>
          </CardContent>
        </Card>
      )}
      {sendingEmail && <SuccsessReset />}
    </>
  );
};

export default RessetPassword;
