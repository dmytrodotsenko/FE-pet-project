import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import ActionsUser from "./ActionsUser";
import AdminActions from "./ActionsAdmin";
import StyledBlock from "../StyledBlock";
import { useSelector } from "react-redux";

const AccordionItem = ({ item }) => {
  const user = useSelector((state) => state.user);
  const [expanded, setExpanded] = useState(false);
  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  return (
    <Box sx={{ width: "90%", mt: 5 }}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          sx={{ height: 84, pointerEvents: "none" }}
          expandIcon={
            <ExpandMoreIcon
              sx={{ pointerEvents: "auto" }}
              onClick={toggleAccordion}
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <StyledBlock
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <StyledBlock
              sx={{
                width: "50%",
                justifyContent: "space-around",
              }}
            >
              <Box>
                <img
                  style={{ width: 180, height: 84 }}
                  alt="no data"
                  src={item.image}
                ></img>
              </Box>
              <Box sx={{ width: "90%", display: "flex", alignItems: 'center' }}>
                <Typography>
                {item.title} | {item.category.title} | 
                </Typography>
                <StyledBlock sx={{ml: 1}}>
                <img style={{width: 30, height: 15, marginRight: 10}} src={item.country  ? item.country.image : item.image} alt='country' />
                <Typography>{item.country ? item.country.title : 'hello'}</Typography>
                </StyledBlock>
              </Box>
            </StyledBlock>
            {user.isAdmin === false && <ActionsUser price={item.price} />}
            {user.isAdmin === true && <AdminActions id={item.id} price={item.price} />}
            {user.isAdmin === null && (
              <Typography sx={{ color: "text.secondary" }}>
                ${item.price}
              </Typography>
            )}
          </StyledBlock>
        </AccordionSummary>
        <AccordionDetails sx={{display: 'flex'}}>
          <Box sx={{width: '50%'}}>
           <Typography>{item.description}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccordionItem;
