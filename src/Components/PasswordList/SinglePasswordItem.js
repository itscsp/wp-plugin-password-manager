import React from "react";
import { useEffect, useState, useReducer } from "react";
import Input from "../UI/Input";
import Model from "../UI/Model";
import Textarea from "../UI/Textarea";
import classes from "./SinglePasswordItem.module.css";
import inputReducer from "../../inputReducer"; // Import the reducer

const SinglePasswordItem = (props) => {
  const initialState = {
    inputURL: props.selectedPassword.website,
    inputURLValid: true,
    inputUserName: props.selectedPassword.username,
    inputUserNameValid: true,
    inputPassword: props.selectedPassword.password,
    inputPasswordValid: true,
    inputNote: props.selectedPassword.note,
    inputNoteValid: false,
    formValid: false,
  };

  const id = props.selectedPassword.id;
  const [edit, setEdit] = useState(false);



  const [formValid, setFormValid] = useState(true);
  const [userData, setUserData] = useState([]);

  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const urlChangeHandler = (event) => {
    const inputValue = event.target.value;

    // Modified URL pattern to allow inputs like "chethan.s@idaksh.in"
    const urlPattern =
      /^(https?:\/\/(www\.)?)?[a-zA-Z0-9\-\.]+\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

    // Test the input value against the new pattern
    const isValid = urlPattern.test(inputValue);
    dispatchInput({ type: "URL", val: inputValue, isValid });
  };

  const usernameChangeHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue) {
      dispatchInput({ type: "USERNAME", val: inputValue, isValid: true });
    } else {
      dispatchInput({ type: "USERNAME", val: inputValue, isValid: false });
    }
  };

  const passwordChangeHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      // setInputPassword(inputValue);
      // setInputPasswordValid(true);
      dispatchInput({ type: "PASSWORD", val: inputValue, isValid: true });
    } else {
      // setInputPassword(inputValue);
      // setInputPasswordValid(false);
      dispatchInput({ type: "PASSWORD", val: inputValue, isValid: false });
    }
  };

  useEffect(() => {
    if (
      inputState.inputURLValid &&
      inputState.inputUserNameValid &&
      inputState.inputPasswordValid
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [inputState.inputURL, inputState.inputUserName, inputState.inputPassword]);

  const noteChangeHandler = (event) => {
    // setInputNote(event.target.value);
    const inputValue = event.target.value;
    dispatchInput({ type: "NOTE", val: inputValue, isValid: true });
  };

  let editedData = [];

  const editButtonHandler = (event) => {
    event.preventDefault();

    if (edit) {
      const storedUserDataJSON = localStorage.getItem("storedUserData");

      if (storedUserDataJSON) {
        // Parse the existing data into an array
        const userDataArray = JSON.parse(storedUserDataJSON);

        // Find the index of the object to edit (based on ID or any other criteria)
        const indexToEdit = userDataArray.findIndex((item) => item.id === id);

        if (indexToEdit !== -1) {
          // Update the properties of the object
          editedData = {
            id: id,
            website: inputState.inputURL,
            username: inputState.inputUserName,
            password: inputState.inputPassword,
            note: inputState.inputNote, // Include note if needed
          };

          userDataArray[indexToEdit] = editedData;

          // Convert the updated array to a JSON string
          const updatedUserDataJSON = JSON.stringify(userDataArray);

          // Store the updated JSON string in local storage
          localStorage.setItem("storedUserData", updatedUserDataJSON);
        }
      }
    }
    setEdit((props) => !props);
  };

  const deleteButtonHandler = (event) => {
    event.preventDefault();
    const storedUserDataJSON = localStorage.getItem("storedUserData");

    if (storedUserDataJSON) {
      // Parse the existing data into an array
      const userDataArray = JSON.parse(storedUserDataJSON);
      const indexToDelete = userDataArray.findIndex((item) => item.id === id);

      if (indexToDelete !== -1) {
        // Remove the object from the array
        userDataArray.splice(indexToDelete, 1);

        // Convert the updated array to a JSON string
        const updatedUserDataJSON = JSON.stringify(userDataArray);

        // Store the updated JSON string in local storage
        localStorage.setItem("storedUserData", updatedUserDataJSON);
        props.onClose();
      }
    }
  };

  return (
    <Model onClose={props.onClose}>
      <main>
        <h3> {edit == true ? "Edit" : "Manage"} password</h3>
        <form className={classes["password-form"]}>
          <Input
            id="site-url"
            type="url"
            label="Site URL"
            placeholder="https://example.com"
            siteInput={inputState.inputURL}
            readOnly={edit}
            onChange={urlChangeHandler}
            isValid={inputState.inputURLValid}
            className={classes.invalid}
          />
          <Input
            id="username"
            type="text"
            label="Username"
            siteInput={inputState.inputUserName}
            readOnly={edit}
            onChange={usernameChangeHandler}
            isValid={inputState.inputUserNameValid}
            className={classes.invalid}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="******"
            siteInput={inputState.inputPassword}
            readOnly={edit}
            value={inputState.inputPassword}
            isValid={inputState.inputPasswordValid}
            onChange={passwordChangeHandler}
            className={classes.invalid}
          />
          <Textarea
            id="note"
            label="Note"
            placeholder=""
            siteInput={inputState.inputNote}
            readOnly={edit}
            onChange={noteChangeHandler}
            isValid={inputState.inputNoteValid}
            className={classes.invalid}
          />

          <div className="flex justify-end gap-10">
            {!edit && (
              <button
                onClick={deleteButtonHandler}
                type="button"
                className="{classes.cancel}"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              onClick={editButtonHandler}
              disabled={formValid}
            >
              {!edit && "Edit"}
              {edit && "Submit"}
            </button>

            <button onClick={props.onClose}>Close</button>
          </div>
        </form>
      </main>
    </Model>
  );
};

export default SinglePasswordItem;
