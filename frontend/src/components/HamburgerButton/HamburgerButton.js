import React from "react";
import "./HamburgerButton.css";

const HamburgerButton = (props) => {
  return (
    <div>
      <input
        onChange={props.handleShowNavbar}
        id="checkbox2"
        type="checkbox"
        checked={props.showNavbar}
      />
      <label className="toggle toggle2" htmlFor="checkbox2">
        <div id="bar4" className="bars"></div>
        <div id="bar5" className="bars"></div>
        <div id="bar6" className="bars"></div>
      </label>
    </div>
  );
};

export default HamburgerButton;
