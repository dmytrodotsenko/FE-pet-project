import React from 'react';
import { Card } from '@mui/material';
import {CardActionArea} from '@mui/material';
import {Typography} from '@mui/material';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {CardContent} from '@mui/material';
const SuccsessReset = () => {
    return (
        <div>
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
          <CardActionArea sx={{ display: "flex" }}>
            <CheckCircleOutlineIcon
              sx={{ ml: 19, width: 50, height: 50, color: "green" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Successfully
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your password should be changed, please check your email address
                and continue with next steps.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
    );
};

export default SuccsessReset;