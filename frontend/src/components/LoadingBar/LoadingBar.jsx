import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const LoadingBar = (props) => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div style={{ width: props.width }}>
        <LinearProgress variant="determinate" value={props.value} />
      </div>
      <div className="ps-3">
        <Typography variant="body2" color="text.secondary">
          {props.value || 0}%
        </Typography>
      </div>
    </div>
  );
};

export default LoadingBar;
