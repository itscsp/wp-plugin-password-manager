import React from "react";
import classes from "./Input.module.css";

const Textarea = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        name="note"
        id={props.id}
        onChange={props.onChange}
        value={props.siteInput}
        className={`${props.isValid === false ? props.className : ""} ${
          props.readOnly === false ? "notReadonly" : "readonly"
        }`}
        readOnly={!props.readOnly}
      >
        {props.siteInput}
      </textarea>
    </div>
  );
};

export default Textarea;
