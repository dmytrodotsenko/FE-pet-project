import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccordionItem from "../../ui/Accordion/Accordion";
import StyledBlock from "../../ui/StyledBlock";
import Spinner from "../../ui/Spinner/Spinner";

const ListOfItems = ({ currentItems }) => {
  const weapons = useSelector((state) => state.item);
  return (
    <StyledBlock sx={{ flexDirection: "column" }}>
      {weapons.loading && (
        <Spinner/>
      )}
      {currentItems.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </StyledBlock>
  );
};

export default ListOfItems;
