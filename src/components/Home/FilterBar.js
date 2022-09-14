import * as React from "react";
import { Container } from "@mui/system";
import FilterSelect from "../../ui/FilterSelect";

export default function BasicSelect() {
  return (
    <Container
      sx={{ px: 25, flexWrap:'wrap', display: "flex", justifyContent: "space-around" }}
      
    >
      <FilterSelect
        id="cat-filter"
        labelId="label-cat-id"
        label="All categories"
        filterItems={["One", "Two", "Three"]}
        name="Filter by Categories"
      />
      <FilterSelect
        id="cat-filter"
        labelId="label-cat-id"
        label="All countries"
        filterItems={["One", "Two", "Three"]}
        name="Filter by Countries"
      />
      <FilterSelect
        id="cat-filter"
        labelId="label-cat-id"
        label="Relevance"
        filterItems={["One", "Two", "Three"]}
        name="Sort by"
      />
    </Container>
  );
}
