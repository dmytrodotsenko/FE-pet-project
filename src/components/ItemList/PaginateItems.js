import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfItems } from "../../store/items/itemActions";
import ListOfItems from "./Itemlist";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
const Paginate = ({countOfItems}) => {
  const [page, setPage] = useState(1);

  const weapons = useSelector((state) => state.item);
  const user = useSelector(state => state.user);
  const { category, sort } = weapons.filterValue;
  const { items, pageCount } = weapons;
  const itemsPerPage = Math.ceil(pageCount / countOfItems);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('rerender?')
    if (category === null && sort === null) {
      dispatch(getListOfItems({ filter: null, sort: null}));
    } else {
      setPage(1);
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
    setPage(p);
    dispatch(getListOfItems({
        filter: category,
        sort: sort,
        page: p
    }))
  };

  return (
    <>
      <ListOfItems currentItems={items} />
      {user.userToken && 
      <Box sx={{ ml: "40%", mt: 5, mb: 5 }}>
        <Pagination
          count={itemsPerPage}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>}
    </>
  );
};

export default Paginate;
