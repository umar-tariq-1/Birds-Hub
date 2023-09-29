import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const{inputError,style,icon,label,name,onChange,type}=props
  return (
    <TextField
      {...(inputError && { error: true })}
      style={style??{}}
      color="success"
      type={type??"text"}
      label={icon?<>{icon}&nbsp;&nbsp;{label}</>:<>{label}</>}
       name ={name} 
      onChange={onChange}
      required={true}
      inputProps={{
        autoComplete: 'new-password',
      }}
    />
  );
};

export default CustomTextField;
