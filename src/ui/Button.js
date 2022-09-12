import React from 'react';
import { Button } from '@mui/material';
const ButtonItem = (props) => {
    return (
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  ...props.style,
                  borderRadius: 24,
                  background: "#000000",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#000000",
                  },
                }}
              >
                {props.text}
              </Button>
    );
};

export default ButtonItem;