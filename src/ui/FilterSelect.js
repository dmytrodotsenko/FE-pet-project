import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import StyledBlock from "./StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredValue } from "../store/items/itemsSlice";
const FilterSelect = (props) => {
  const [value, setValue] = useState("");
  const item = useSelector(state => state.item);
  const dispatch = useDispatch();
  const handleChange = (event, child) => {
    setValue(event.target.value);
    dispatch(setFilteredValue(child.props.id))
  };
  return (
    <StyledBlock>
      <Typography sx={{ mr: 2 }}>{props.label}</Typography>
      <FormControl>
        <InputLabel sx={{ mt: -1.5 }} id={props.labelId}>
          {props.name}
        </InputLabel>
        <Select
          name = {props.name}
          sx={{ width: 164, height: 30, bgcolor: "#F6F6F6", borderRadius: 8 }}
          labelId={props.labelId}
          id={props.id}
          value={value}
          label={props.label}
          onChange={handleChange}
        >
         {props.filterItems.map(item => (
            <MenuItem key={item.id} id={item.id} value={item.title}>{item.title}</MenuItem>
         ))}
        </Select>
      </FormControl>
    </StyledBlock>
  );
};

export default FilterSelect;
