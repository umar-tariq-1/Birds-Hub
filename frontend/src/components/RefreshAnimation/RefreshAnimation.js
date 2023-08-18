import React from "react";
import "./RefreshAnimation.css";

const CustomRefreshAnimation = (props) => {
  return (
    <>
      <div
        style={{
          paddingBottom: "25px",
          paddingTop: "10px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div className="spinner"></div>
      </div>

      {/* <div className="loader">
        <div className="scanner mb-4">
          <span>Refeshing...</span>
        </div>
      </div> */}
    </>
  );
};

export default CustomRefreshAnimation;
