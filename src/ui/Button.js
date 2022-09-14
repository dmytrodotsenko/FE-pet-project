import React from 'react';
import { Button } from '@mui/material';



const ButtonItem = (props) => {
    return (
        <Button
                onClick={props.onClick}
                type={props.type || 'button'}
                fullWidth
                variant="contained"
                sx={{
                  ...props.style,
                  borderRadius: 24,
                  background: props.bg || '#000000', 
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: props.bg || "#000000",
                  },
                }}
              >
                {props.text}
              </Button>
    );
};

export default ButtonItem;