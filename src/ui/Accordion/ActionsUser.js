import React from 'react';
import CountInput from "../CountInput";
import ButtonItem from "../Button";
import { Typography } from '@mui/material';
import StyledBlock from '../StyledBlock';
const ActionsUser = (props) => {
    return (
            <StyledBlock
              sx={{
                width: "30%",
                justifyContent: "space-around",
                pointerEvents: "auto",
              }}
            >
              <CountInput />
              <ButtonItem text='add' style={{width: '20%'}} />
              <Typography sx={{ color: "text.secondary" }}>
                ${props.price}
              </Typography>
            </StyledBlock>
    );
};

export default ActionsUser;