import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { styled } from "@mui/material/styles";

const StyledBtn = styled(Button)({
  border: "none",
  color: "#000000",
  fontSize:  20,
  "&.MuiButtonBase-root:hover": {
    border: "none",
    background: "none",
  },
  "&.MuiButtonBase-root:disabled": {
    border: "none",
    background: "none",
  },
});

const CountInput = ({count, handleDecrement, handleIncrement}) => {
  
  return (
    <ButtonGroup size="small" aria-label="small button group">
      <StyledBtn disabled={count === 1 ? true : false} onClick={handleDecrement}>-</StyledBtn>
      <StyledBtn sx={{ bgcolor: "#F6F6F6", fontSize: 14 }}>{count}</StyledBtn>
      <StyledBtn onClick={handleIncrement}>+</StyledBtn>
    </ButtonGroup>
  );
};

export default CountInput;
