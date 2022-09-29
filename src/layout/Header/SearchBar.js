import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, FormControlLabel } from "@mui/material";
import { setSearchedValue, setCurrentPage } from "../../store/items/itemsSlice";
import ButtonItem from "../../ui/Button";
import StyledBlock from "../../ui/StyledBlock";
import { useDispatch, useSelector } from "react-redux";
import { getListOfItems } from "../../store/items/itemActions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginTop: 40,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F6F6F6",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#F6F6F6",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar() {
  const [searchFilters, setSearchFilters] = useState({
    titleFilter: false,
    descriptionFilter: false,
    countryFilter: false
  });
  const items = useSelector((state) => state.item);
  const { category, sort } = items.filterValue;
  const [inputValue, setInputValue] = useState("");
  const { titleFilter, descriptionFilter, countryFilter } = searchFilters;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChangeFilters = (event) => {
    setSearchFilters({
      ...searchFilters,
      [event.target.name]: event.target.checked,
    });
  };
  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(
      getListOfItems({
        title: titleFilter,
        description: descriptionFilter,
        query: inputValue,
        sort: sort,
        filter: category,
        country: countryFilter,
      })
    );
    dispatch(setSearchedValue({ ...searchFilters, inputValue: inputValue }));
  };
  
 
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleChange}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
        <ButtonItem style={{width: 100}} onClick={handleSearch} text="search" />    
      </Search>
      <FormControl>
        <StyledBlock sx={{ flexWrap: "wrap", ml: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeFilters}
                checked={titleFilter}
                name="titleFilter"
              />
            }
            label="Description"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeFilters}
                checked={descriptionFilter}
                name="descriptionFilter"
              />
            }
            label="Title"
          />
           <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeFilters}
                checked={countryFilter}
                name="countryFilter"
              />
            }
            label="Country"
          />
        </StyledBlock>
      </FormControl>
    </>
  );
}
