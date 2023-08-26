import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const{inputError,style,icon,label,name,onChange}=props
  return (
    <TextField
      {...(inputError && { error: true })}
      style={style}
      color="success"
      type="text"
      label={<>{icon}&nbsp;&nbsp;{label}</>}
      name={name}
      onChange={onChange}
      required
    />
  );
};

export default CustomTextField;
