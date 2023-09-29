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

  const{inputError,handleTooltipOpen,icon,label,id,showIcon,handleChange,style,name}=props
  const restProps=(({ inputError,handleTooltipOpen,icon,label,id,showIcon,handleChange,style,name, ...rest }) => rest)({ ...props });
  return (
    <FormControl
      {...(inputError && { error: true })}
      required
      style={style}
      variant="outlined"
      {...(restProps)}
      ref={ref}
      onClick={handleTooltipOpen}
    >
      <InputLabel color="success" htmlFor={id}>
        {
          <>
            {icon}&nbsp;&nbsp;{label}
          </>
        }
      </InputLabel>
      <OutlinedInput
        color="success"
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          showIcon ? (
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
            {icon}&nbsp;{label}
          </>
        }
        name={name}
        inputProps={{
        autoComplete: 'new-password',
        }}
        onChange={handleChange}
      />
    </FormControl>
  );
});

export default CustomPasswordField;
