import { Box } from '@mui/material';
import React from 'react';
import ListOfItems from '../ItemList/Itemlist';


const HomePage = () => {
    return (
        <Box sx={{mt: 15}}>
            <ListOfItems/>
        </Box>
    );
};

export default HomePage;