import React from "react";
import { useState, useEffect } from "react";
import { StrictMode } from "react";
import classes from "./AvailablePassword.module.css";
import SinglePasswordItem from "./SinglePasswordItem";

function DynamicFavicon({ website }) {
  const faviconUrl = `https://www.google.com/s2/favicons?sz=256&domain_url=${website}`;

  return <img width="24" height="24" src={faviconUrl} alt="Favicon" />;
}

const AvailablePassword = (props) => {
  const [formIsShow, setFormIsShow] = useState(false);
  const [passwordData, setPasswordData] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);

  useEffect(() => {
    const storedUserDataJSON = localStorage.getItem("storedUserData");
    if (storedUserDataJSON) {
      const parsedUserData = JSON.parse(storedUserDataJSON);
      setPasswordData(parsedUserData);
    }
  }, [formIsShow, props.formStatus]);

  const showFormHandler = (password) => {
    setFormIsShow(true);
    setSelectedPassword(password); // Store the selected password data in state
  };

  const hideFormHandler = () => {
    setFormIsShow(false);
  };

  const passwordItem = passwordData.map((pass) => (
    <div
      onClick={() => showFormHandler(pass)} // Pass the password data when clicked
      key={pass.id}
      className={classes.cardWrapper}
    >
      <p>
        <DynamicFavicon website={pass.website} />
        <span id="website">{pass.website}</span>
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#5F6368"
      >
        <path d="m10 7 5 5-5 5z" />
      </svg>
    </div>
  ));

  return (
    <StrictMode>
      <div className={classes.card}>
        {passwordItem.length ? passwordItem : "No Password Available"}
      </div>
      {formIsShow && (
        <SinglePasswordItem
          selectedPassword={selectedPassword}
          onClose={hideFormHandler}
        />
      )}
    </StrictMode>
  );
};

export default AvailablePassword;
