import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccordionItem from "../../ui/Accordion/Accordion";
import { getListOfItems } from "../../store/items/itemActions";
import StyledBlock from "../../ui/StyledBlock";
import { Oval } from "react-loader-spinner";

const ListOfItems = () => {
  const weapons = useSelector((state) => state.item);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getListOfItems());
  }, [dispatch]);
  console.log(weapons.filterValue);

  return (
      <StyledBlock sx={{ flexDirection: "column" }}>
        {weapons.loading && (
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {weapons.items.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </StyledBlock>
  );
};

export default ListOfItems;
