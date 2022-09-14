import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import StyledBlock from "./StyledBlock";
const FilterSelect = (props) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <StyledBlock>
      <Typography sx={{ mr: 2 }}>{props.name}</Typography>
      <FormControl>
        <InputLabel sx={{ mt: -1.5 }} id={props.labelId}>
          {props.label}
        </InputLabel>
        <Select
          sx={{ width: 164, height: 30, bgcolor: "#F6F6F6", borderRadius: 8 }}
          labelId={props.labelId}
          id={props.id}
          value={value}
          label={props.label}
          onChange={handleChange}
        >
         {props.filterItems.map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
         ))}
        </Select>
      </FormControl>
    </StyledBlock>
  );
};

export default FilterSelect;
