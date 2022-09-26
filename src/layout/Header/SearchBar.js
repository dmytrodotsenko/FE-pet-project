import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, FormControlLabel } from "@mui/material";
import { setFilteredValue, setCurrentPage  } from "../../store/items/itemsSlice";
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
  });
  const items = useSelector((state) => state.item);
  const [inputValue, setInputValue] = useState("");
  const { titleFilter, descriptionFilter } = searchFilters;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleChangeFilters =  (event) => {
    setSearchFilters({
      ...searchFilters,
      [event.target.name]: event.target.checked,
    });
    
  };
  const  handleSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(
      getListOfItems({
        title: titleFilter,
        description: descriptionFilter,
        query: inputValue,
      })
    )
    dispatch(setFilteredValue({...searchFilters, inputValue: inputValue}))
  }

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
        <ButtonItem onClick={handleSearch} text='search' />
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
            label="Search by Description"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeFilters}
                checked={descriptionFilter}
                name="descriptionFilter"
              />
            }
            label="Search by Title"
          />
        </StyledBlock>
      </FormControl>
    </>
  );
}
