import { useState } from "react";
import React from "react";

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";

const CustomPasswordField = React.forwardRef(function CustomPasswordField(
  props,
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      {...(props.inputError && { error: true })}
      required
      style={props.style}
      variant="outlined"
      {...props}
      ref={ref}
      onClick={props.handleTooltipOpen}
    >
      <InputLabel color="success" htmlFor="outlined-adornment-password">
        {
          <>
            {props.icon}&nbsp;&nbsp;{props.label}
          </>
        }
      </InputLabel>
      <OutlinedInput
        color="success"
        id={props.id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          props.showIcon ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        label={
          <>
            {props.icon}&nbsp;{props.label}
          </>
        }
        name={props.name}
        onChange={props.handleChange}
      />
    </FormControl>
  );
});

export default CustomPasswordField;
