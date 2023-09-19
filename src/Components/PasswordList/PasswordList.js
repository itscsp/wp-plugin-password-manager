import React from "react";
import AvailablePassword from "./AvailablePassword";
import classes from "./PasswordList.module.css";

import { StrictMode } from "react";
const PasswordList = (props) => {
  return (
    <StrictMode>
      <h3 className={classes.heading}>Recently Saved Passwords</h3>
      <AvailablePassword formStatus={props.formStatus} />
    </StrictMode>
  );
};

export default PasswordList;
