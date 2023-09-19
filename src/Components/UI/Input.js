import React, { useState } from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopyClick = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(props.siteInput);
    setIsCopied(true);

    // Reset copied status after a certain duration
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const toggleShowPassword = (event) => {
    event.preventDefault();

    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <div className={classes.inputWrapper}>
        <input
          id={props.id}
          type={showPassword ? "text" : props.type}
          placeholder={props.placeholder}
          value={props.siteInput}
          onChange={props.onChange}
          className={`${props.isValid === false ? props.className : ""} ${
            props.readOnly === false ? "notReadonly" : "readonly"
          }`}
          readOnly={!props.readOnly}
        />
        {props.type === "text" && props.isValid && (
          <div className={classes.actionbtn}>
            <button onClick={handleCopyClick}>
              {!isCopied && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#757575"
                >
                  <path
                    fill="#fff"
                    d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                  />
                </svg>
              )}

              {isCopied && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    fill="#fff"
                    d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
        {props.type === "password" && (
          <div className={classes.actionbtn}>
            {props.isValid && (
              <button onClick={handleCopyClick}>
                {!isCopied && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#757575"
                  >
                    <path
                      fill="#fff"
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                    />
                  </svg>
                )}

                {isCopied && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      fill="#fff"
                      d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    />
                  </svg>
                )}
              </button>
            )}

            <button onClick={toggleShowPassword}>
              {showPassword && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#5F6368"
                >
                  <path
                    fill="#fff"
                    d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                  />
                </svg>
              )}
              {!showPassword && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#5F6368"
                >
                  <path
                    fill="#fff"
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
