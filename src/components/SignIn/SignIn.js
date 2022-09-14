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
import { userLogin } from "../../store/user/userActions";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../store/user/userSlice";

export default function SignIn() {
  const [validateEmpty, setValidateEmpty] = useState({
    email: false,
    password: false,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email === "") {
      setValidateEmpty({ email: true, password: false });
    }
    if (password === "") {
      setValidateEmpty({ email: false, password: true });
    }
    if (password === "" && email === "") {
      setValidateEmpty({ email: true, password: true });
    }

    dispatch(userLogin({ email: email, password: password }));
  };

  useEffect(() => {
    if (user.success === true) {
      navigate("/home");
      dispatch(resetState());
    }
  }, [navigate, user.success, dispatch]);
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
              Welcome Back
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                error={validateEmpty.email}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                variant="standard"
                helperText={user.error}
              />
              <TextField
                margin="normal"
                error={validateEmpty.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                helperText={user.error}
              />
            
              <ButtonItem
                type="submit"
                style={{ mt: 3, mb: 2 }}
                text="Log in"
              />
              <Grid
                container
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item sx={{ color: "gray" }}>
                  Don't have an account?
                  <Link href="/signup" variant="body2" sx={{ ml: 1 }}>
                    {"Sign Up"}
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
