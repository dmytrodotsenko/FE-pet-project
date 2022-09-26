import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListOfItems,
  getSearchedItems,
} from "../../store/items/itemActions";
import { setCurrentPage } from "../../store/items/itemsSlice";
import ListOfItems from "./Itemlist";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
const Paginate = ({ countOfItems }) => {
  const weapons = useSelector((state) => state.item);
  const user = useSelector((state) => state.user);
  const { category, sort, searchTitle, searchDesc, searchInput } =
    weapons.filterValue;
  const { items, pageCount, currentPage } = weapons;

  let itemsPerPage = Math.ceil(pageCount / countOfItems);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setCurrentPage(1));
      dispatch(
        getListOfItems({
          title: searchTitle,
          query: searchInput,
          description: searchDesc,
          filter: category,
          sort: sort,
          page: 1,
        })
      );
    
  }, [dispatch, category, sort, searchTitle, searchInput, searchDesc]);

  const handleChange = (e, p) => {
    dispatch(setCurrentPage(p));
    dispatch(
      getListOfItems({
        title: searchTitle,
        query: searchInput,
        description: searchDesc,
        filter: category,
        sort: sort,
        page: p,
      })
    );
  };

  return (
    <>
      <ListOfItems currentItems={items} />
      {user.userToken && (
        <Box sx={{ ml: "40%", mt: 5, mb: 5 }}>
          <Pagination
            count={itemsPerPage}
            size="large"
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Box>
      )}
    </>
  );
};

export default Paginate;
