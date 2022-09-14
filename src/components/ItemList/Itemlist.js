import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccordionItem from "../../ui/Accordion/Accordion";
import { getListOfItems } from "../../store/items/itemActions";

const ListOfItems = () => {
  const weapons = useSelector((state) => state.item);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfItems());
  }, [dispatch]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {weapons.items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default ListOfItems;
