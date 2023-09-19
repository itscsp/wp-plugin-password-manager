import Model from "../UI/Model";
import React from "react";
import classes from "./AddPassword.module.css";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import { useEffect, useState } from "react";

const AddPassword = (props) => {
  const [inputURL, setInputURL] = useState("");
  const [inputURLValid, setInputURLValid] = useState();
  const [inputUserName, setInputUserName] = useState("");
  const [inputUserNameValid, setInputUserNameValid] = useState();
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordValid, setInputPasswordValid] = useState();
  const [inputNote, setInputNote] = useState("");
  const [inputNoteValid, setInputNoteValid] = useState();
  const [formValid, setFormValid] = useState(false);

  const urlChangeHandler = (event) => {
    const inputValue = event.target.value;

    // Modified URL pattern to allow inputs like "chethan.s@idaksh.in"
    const urlPattern = /^(https?:\/\/(www\.)?)?[a-zA-Z0-9\-\.]+\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

    // Test the input value against the new pattern
    const isValid = urlPattern.test(inputValue);
    if (isValid) {
      setInputURL(inputValue);
      setInputURLValid(isValid);
    } else {
      setInputURL(inputValue);
      setInputURLValid(isValid);
    }
  };

  const usernameChangeHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue) {
      setInputUserNameValid(true);
      setInputUserName(inputValue);
    } else {
      setInputUserNameValid(false);
      setInputUserName(inputValue);
    }
  };

  const passwordChangeHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      setInputPassword(inputValue);
      setInputPasswordValid(true);
    } else {
      setInputPassword(inputValue);
      setInputPasswordValid(false);
    }
  };

  useEffect(() => {
    if (inputURLValid && inputUserNameValid && inputPasswordValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [inputURLValid, inputUserNameValid, inputPasswordValid]);

  const noteChangeHandler = (event) => {
    const inputValue = event.target.value;

    setInputNote(inputValue);
  };

  let userDataArray = [];

  const addPasswordHandler = (event) => {
    event.preventDefault();

    if (inputURL && inputUserName && inputPassword) {
      // Create a new data object
      const newData = {
        id: Math.random() * 10,
        website: inputURL,
        username: inputUserName,
        password: inputPassword,
        note: inputNote // Include note if needed
      };

      // Retrieve existing data from local storage
      const storedUserDataJSON = localStorage.getItem("storedUserData");

      // Initialize an array to hold the data

      // If existing data is present, parse it into an array
      if (storedUserDataJSON) {
        userDataArray = JSON.parse(storedUserDataJSON);
      }

      // Add the new data to the array
      userDataArray.push(newData);

      // Convert the updated array to a JSON string
      const updatedUserDataJSON = JSON.stringify(userDataArray);

      // Store the updated JSON string in local storage
      localStorage.setItem("storedUserData", updatedUserDataJSON);

      // Clear input fields and reset validation
      setInputURL("");
      setInputUserName("");
      setInputPassword("");
      setInputNote("");
      setInputURLValid(false);
      setInputUserNameValid(false);
      setInputPasswordValid(false);
      setInputNoteValid(false);
      props.onClose();
    }
  };

  return (
    <Model onClose={props.onClose}>
      <h3 slot="title" id="title" className="dialog-title">
        Add new password
      </h3>
      <main>
        <form
          className={classes["password-form"]}
          onSubmit={addPasswordHandler}
        >
          <Input
            id="site-url"
            type="url"
            label="Site URL"
            siteInput={inputURL}
            placeholder="https://example.com"
            onChange={urlChangeHandler}
            isValid={inputURLValid}
            className={classes.invalid}
            readOnly="false"
          />
          <Input
            id="username"
            type="text"
            label="Username"
            siteInput={inputUserName}
            onChange={usernameChangeHandler}
            isValid={inputUserNameValid}
            className={classes.invalid}
            readOnly="false"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            onChange={passwordChangeHandler}
            siteInput={inputPassword}
            isValid={inputPasswordValid}
            className={classes.invalid}
            readOnly="false"
          />

          <Textarea
            id="note"
            label="Note"
            placeholder="Write your note here..."
            onChange={noteChangeHandler}
            siteInput={inputNote}
            isValid={inputNoteValid}
            className={classes.invalid}
            readOnly="false"
          />

          <div className="flex justify-end gap-10">
            <button
              onClick={props.onClose}
              type="button"
              className="{classes.cancel}"
            >
              Cancel
            </button>
            <button type="submit" disabled={!formValid}>
              Save
            </button>
          </div>
        </form>
      </main>
    </Model>
  );
};

export default AddPassword;
