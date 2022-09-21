import * as React from "react";
import { Container } from "@mui/system";
import FilterSelect from "../../ui/FilterSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/items/itemActions";
export default function BasicSelect() {

  const items = useSelector(state => state.item);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);
  return (
    <Container
      sx={{ px: 25, flexWrap:'wrap', display: "flex", justifyContent: "space-around" }}
      
    >
      <FilterSelect
        id="cat-filter"
        labelId="label-cat-id"
        label="All categories"
        filterItems={items.categories}
        name="Filter by Categories"
      />
      {/* <FilterSelect
        id="cat-filter"
        labelId="label-cat-id"
        label="Relevance"
        filterItems={["One", "Two", "Three"]}
        name="Sort by"
      /> */}
    </Container>
  );
}
