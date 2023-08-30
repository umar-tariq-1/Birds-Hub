import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const{inputError,style,icon,label,name,onChange,required,type,value,onClick}=props
  return (
    <TextField
      {...(inputError && { error: true })}
      style={style??{}}
      color="success"
      type={type??"text"}
      label={icon?<>{icon}&nbsp;&nbsp;{label}</>:<>{label}</>}
      {...(name ? { name : name }:{})}
     {...(value ? { value : value }:{})}
      inputProps={{ 'aria-label': 'controlled' }}
      onChange={onChange}
      required={required??true}
    />
  );
};

export default CustomTextField;
