import { Box } from '@mui/material';
import React from 'react';
import AccordionItem from '../../ui/Accordion';
const DUMMY_WEAPON = [{
    id: 1,
    title: 'Bayraktar',
    short_desc: 'Bayraktar is remote flying object.....',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    id: 2,
    title: 'Javelin',
    short_desc: 'Javelin is weapon against tanks',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    id: 3,
    title: 'HIMARS',
    short_desc: 'Himars very big calibr of weapon',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
}]
const ListOfItems = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {DUMMY_WEAPON.map(item => (
                <AccordionItem key={item.id} item={item} />
            ))}
        </Box>
    );
};

export default ListOfItems;