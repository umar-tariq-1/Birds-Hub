import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  return (
    <TextField
      {...(props.inputError && { error: true })}
      style={props.style}
      color="success"
      type="text"
      label={<>{props.icon}&nbsp;&nbsp;{props.label}</>}
      name={props.name}
      onChange={props.onChange}
      required
    />
  );
};

export default CustomTextField;
