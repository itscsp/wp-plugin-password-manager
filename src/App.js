import React from 'react';
import { useState } from "react";
import Header from './Components/Layout/Header';
import AddPassword from "./Components/Addpassword/AddPassword";
import PasswordList from "./Components/PasswordList/PasswordList";

export default function App() {
  const [formIsShow, setFormIsShow] = useState(false);

  const showFormHandler = () => {
    setFormIsShow(true);
  };

  const hideFormHandler = () => {
    setFormIsShow(false);
  };

  return (
    <div className="container">
      {formIsShow && <AddPassword onClose={hideFormHandler} />}
      <Header onClick={showFormHandler} />
      <PasswordList formStatus={formIsShow} />
    </div>
  );
}

