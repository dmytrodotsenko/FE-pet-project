import React from 'react';
import { Oval } from "react-loader-spinner";
import classes from './spinner.module.css';
const Spinner = () => {
    return (
        <>
        <Oval
          wrapperClass={classes.spinner}
          visible={true}
          ariaLabel="oval-loading"
        />
        </>
    );
};

export default Spinner;