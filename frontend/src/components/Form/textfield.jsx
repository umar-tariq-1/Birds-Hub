import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const{inputError,style,icon,label,name,onChange,size,required}=props
  return (
    <TextField
      {...(inputError && { error: true })}
      style={style??{}}
      color="success"
      type="text"
      label={icon?<>{icon}&nbsp;&nbsp;{label}</>:<>{label}</>}
      name={name}
      size={size??"medium"}
      onChange={onChange}
      required={required??true}
    />
  );
};

export default CustomTextField;
