import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionActions, Box, Button } from "@mui/material";

const AccordionItem = ({item}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (item) => (event, isExpanded) => {
    setExpanded(isExpanded ? item : false);
  };
  return (
    <Box sx={{width: '60%', mt: 5}}>
      <Accordion
        expanded={expanded === item.id}
        onChange={handleChange(item.id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {item.title}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
           {item.short_desc}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {item.description}
          </Typography>
        </AccordionDetails>
        <AccordionActions>
            <Button onClick={() => console.log(item.id)}>Hello</Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};

export default AccordionItem;
