import React,{ useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./navbar.css";
// import { FiMenu } from "react-icons/fi";
import { FaTractor } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import HamburgerButton from "../HamburgerButton/HamburgerButton";

const Navbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const navigate = useNavigate();

  const navLinkActiveTextColor = {
    //for textColor
    color: "aliceblue",
  };
  const navLinkInactiveTextColor = {};

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return (
    <nav className="navbar shadow-custom">
      <div className="container">
        <div style={{ display: "flex" }} className="logo">
          <FaTractor size={58} />
          <h2 style={{ marginTop: 8, marginLeft: 15 }}>KISAAN APP</h2>
        </div>
        <div
          className={`menu-icon shadow align-items-center justify-content-center ${showNavbar && "pressed"}`}
          style={{width:"51px"}}
        >
          <HamburgerButton handleShowNavbar={handleShowNavbar} showNavbar={showNavbar} />
          
          {/* <FiMenu color="#212529c0" size={43} /> */}
        </div>
        <div
          className={`nav-elements rounded ${
            showNavbar && "active shadow-custom"
          }`}
        >
          <ul>
            <li
              onClick={() => {
                navigate("/");
              }}
              className={`padd ${props.Home && "active-link"}`}
            >
              <NavLink
                style={
                  props.Home && !showNavbar
                    ? navLinkActiveTextColor
                    : navLinkInactiveTextColor
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li
              onClick={() => {
                navigate("/signup");
              }}
              className={`padd ${props.SignUp && "active-link"}`}
            >
              <NavLink
                style={
                  props.SignUp && !showNavbar
                    ? navLinkActiveTextColor
                    : navLinkInactiveTextColor
                }
                to="/signup"
              >
                SignUp
              </NavLink>
            </li>

            <li
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }}
              className={`padd ${props.Login && "active-link"}`}
            >
              <NavLink
                style={
                  props.Login && !showNavbar
                    ? navLinkActiveTextColor
                    : navLinkInactiveTextColor
                }
              >
                Login
              </NavLink>
            </li>

            <li
              onClick={() => {
                navigate("/about");
              }}
              className={`padd ${props.About && "active-link"}`}
            >
              <NavLink
                style={
                  props.About && !showNavbar
                    ? navLinkActiveTextColor
                    : navLinkInactiveTextColor
                }
                to="/about"
              >
                About
              </NavLink>
            </li>

            <li
              onClick={() => {
                navigate("/contact");
              }}
              className={`padd ${props.Contact && "active-link"}`}
            >
              <NavLink
                style={
                  props.Contact && !showNavbar
                    ? navLinkActiveTextColor
                    : navLinkInactiveTextColor
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div
            style={{ paddingBottom: "17px" }}
            className="close-navbar-button"
            onClick={handleShowNavbar}
          >
            <hr />
            <FiArrowRightCircle size={36} style={{ marginLeft: "40%" }} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
