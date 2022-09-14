import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonItem from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/user/userActions";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      registerUser({
        email: data.get("email"),
        name: data.get("name"),
        password: data.get("password"),
      })
    );
  };

  useEffect(() => {
    if (user.success) {
      navigate("/home");
    }
  }, [user.success, navigate]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 20,
              mx: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Create new account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={user.error !== null}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
              />
              <TextField
                error={user.error !== null}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                variant="standard"
              />
              <TextField
                error={user.error !== null}
                helperText={user.error}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                sx={{
                  "&  .MuiFormHelperText-root.Mui-error": {
                    fontSize: 18,
                    margin: 0,
                    paddingLeft: 10,
                  },
                }}
              />
              <ButtonItem
                type="submit"
                style={{ mt: 3, mb: 2 }}
                text="Sing up"
              />
              <Grid
                container
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item sx={{ color: "gray" }}>
                  Already have account?
                  <Link href="/signin" variant="body2" sx={{ ml: 1 }}>
                    {"Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${require("../../assets/signin.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </>
  );
}
