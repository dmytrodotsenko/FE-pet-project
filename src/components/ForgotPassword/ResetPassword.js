import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material";
import ButtonItem from "../../ui/Button";
import { BASE_URL } from "../../config";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const RessetPassword = () => {
    const [sendingEmail, setSendingEmail] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
   if(email !== '' && email.includes('@')){
    fetch(`${BASE_URL}/users/password/forgot/`,{
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({email: email})
    }).then(response => {
        setSendingEmail(true);
        console.log(response, 'dataaaa')
    })
   }
  };
  return (
    <>
    {!sendingEmail && <Card
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
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            variant="standard"
          />
          <ButtonItem type="submit" text="reset" style={{mt: 5}}  />
        </Box>
      </CardContent>
    </Card>}
    {sendingEmail &&<Card
      sx={{
        mt: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "50%",
        ml: "25%",
        mt: "10%",
      }}>
      <CardActionArea sx={{display: 'flex'}}>
        <CheckCircleOutlineIcon sx={{ml: 19, width: 50, height: 50, color: 'green'}}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Successfully
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your password should be changed, please check your email address and continue with next steps.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>}
    </>
  );
};

export default RessetPassword;
