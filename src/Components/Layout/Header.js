import React from 'react';
import classes from "./Header.module.css";
import AddPasswordButton from "./AddPasswordButton";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h2>Password Manager</h2>
      <AddPasswordButton onClick={props.onClick} />
    </header>
  );
};

export default Header;
