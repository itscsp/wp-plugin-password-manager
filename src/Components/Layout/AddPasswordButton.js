import React from 'react';

import classes from "./AddPasswordButton.module.css";

const AddPasswordButton = (props) => {
  return (
    <button onClick={props.onClick} className={classes.btn}>
      ADD
    </button>
  );
};
export default AddPasswordButton;
