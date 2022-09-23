import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfItems, getSearchedItems } from "../../store/items/itemActions";
import { setSearchedValue, setCurrentPage } from "../../store/items/itemsSlice";
import ListOfItems from "./Itemlist";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
const Paginate = ({countOfItems}) => {
  const [page, setPage] = useState(1);

  const weapons = useSelector((state) => state.item);
  const user = useSelector(state => state.user);
  const { category, sort } = weapons.filterValue;
  const { items, pageCount, searching, searchedItems, searchingValues, currentPage } = weapons;
  
  let itemsPerPage = Math.ceil(pageCount / countOfItems);

  
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (category === null && sort === null) {
      dispatch(getListOfItems({ filter: null, sort: null}));
    } else {
      dispatch(setCurrentPage(1))
      dispatch(
        getListOfItems({
          filter: category,
          sort: sort,
          page: 1,
        })
      );
    }
  }, [dispatch, category, sort]);
 
  const handleChange = (e, p) => {
    console.log(searchingValues, 'kkk')
    dispatch(setCurrentPage(p))
    if(searching){
      console.log(searchingValues, 'sdas')
      dispatch(getSearchedItems({
        title: searchingValues.titleFilter,
        description: searchingValues.descriptionFilter,
        query: searchingValues.query,
        page: p
      }))
    }
    else{
    dispatch(getListOfItems({
        filter: category,
        sort: sort,
        page: p
    }))}
  };

  return (
    <>
      <ListOfItems currentItems={searching ? searchedItems : items} />
      {user.userToken && 
      <Box sx={{ ml: "40%", mt: 5, mb: 5 }}>
        <Pagination
          count={itemsPerPage}
          size="large"
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>}
    </>
  );
};

export default Paginate;
