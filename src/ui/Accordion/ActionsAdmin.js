import React from "react";
import ButtonItem from "../Button";
import { Typography } from "@mui/material";
import StyledBlock from "../StyledBlock";
const AdminActions = (props) => {
  return (
    <StyledBlock
      sx={{
        width: "30%",
        justifyContent: "space-around",
        pointerEvents: "auto",
      }}
    >
      <Typography sx={{ color: "text.secondary" }}>${props.price}</Typography>
      <ButtonItem bg="#6B6B6B" text="edit" style={{ width: "30%", height: 30 }} />
      <ButtonItem bg="#B73535" text="delete" style={{ width: "30%", height: 30  }} />
    </StyledBlock>
  );
};

export default AdminActions;
