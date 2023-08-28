import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import Navbar from "../../components/Navbar/navbar";
import "./signUp.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSnackbar } from "notistack";
import CustomTextField from "../../components/Form/textfield";
import CustomToolTip from "../../components/Tooltip/tooltip";
import CustomPasswordField from "../../components/Form/passwordfield";
import CustomLoadingAnimation from "../../components/LoadingAnimation/loadingAnimation";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import{ validate, capitalize } from "./Validation";
import { trimObject } from "../../utils/objectFunctiions/trimObject";
import { findKeyWithEmptyStringValue } from "../../utils/objectFunctiions/findKeyWithEmptyStringValue";
import { useAutoAnimate } from '@formkit/auto-animate/react';

function SignUp() {
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [inputErrors, setinputErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();
  const { enqueueSnackbar } = useSnackbar();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value.trim() });
    setError("");
    setinputErrors({});
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    var trimmedData=trimObject((({ password, confirmPassword, ...rest }) => rest)({ ...userData }));
    trimmedData={...trimmedData,password:userData.password,confirmPassword:userData.confirmPassword}
    const emptyKey=findKeyWithEmptyStringValue(trimmedData);

    if(emptyKey !== null){
      setError(`${capitalize(
        emptyKey.replace(/([A-Z])/g, " $1")
      )} must not be empty`);
      setinputErrors({[emptyKey]:1});
      enqueueSnackbar("Couldn't register", { variant: "error" });
      return;
    }

    if (
      validate(
        trimmedData.firstName,
        trimmedData.lastName,
        trimmedData.phone,
        trimmedData.password,
        trimmedData.confirmPassword,
        setError,
        setinputErrors,
        enqueueSnackbar
      )
    ) {
      setError("");
      setinputErrors({});
    } else {
      return;
    }

    try {
      setLoading(true);
      // console.log("clicked")
      const url = process.env.REACT_APP_BASE_URL + "/register";
      
      await axios.post(url, trimmedData);
      //console.log(res)
      setLoading(false);
      enqueueSnackbar("Successfully registered", { variant: "success" });
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Server not working. Try again later");
      }
      enqueueSnackbar("Couldn't register", { variant: "error" });
    }
  };

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const styleFirstHalf = {
    width: "49.5%",
    marginTop: "1%",
    marginBottom: "3%",
  };
  const styleSecondHalf = {
    width: "49.5%",
    marginBottom: "3%",
    marginLeft: "1%",
    marginTop: "1%",
  };
  const styleFull = {
    width: "100%",
    marginBottom: "3%",
  };
  const passwordToottipTitle = (
    <div>
      <>Password must have:</>
      <br />
      <>• 6-20 characters</>
      <br />
      <>• Atleast 1 numeric digit,</>
      <br />
      <>• 1 uppercase letter,</>
      <br />
      <>• 1 lowercase letter</>
    </div>
  );

  return (
    <>
      {loading && <CustomLoadingAnimation />}
      <Navbar SignUp={1} data-aos />
      <div
        className="d-flex align-items-center justify-content-center custom-center"
        style={{
          width: "100%",
        }}
      >
        <div
          className="container pb-5 mx-auto"
          style={{
            backgroundColor: "#eee",
          }}
        >
          <div
            className="shadow-custom card mx-auto"
            style={{
              maxWidth: "500px",
              minWidth: "350px",
            }}
            data-aos="zoom-out-up"
          >
            <div className="card-body px-4 px-md-5">
              <h2
                className="text-uppercase fw-bold text-center mb-4"
                style={{
                  letterSpacing: "1px",
                  fontFamily: "Titillium Web, sans-serif",
                  fontSize: "200%",
                }}
              >
                Registration
              </h2>

              <form onSubmit={handleSubmit}>
                <CustomTextField
                  inputError={inputErrors.fname}
                  style={styleFirstHalf}
                  label="First Name"
                  icon={<FaUserAlt />}
                  name="firstName"
                  onChange={handleChange}
                />

                <CustomTextField
                  inputError={inputErrors.lname}
                  style={styleSecondHalf}
                  label="Last Name"
                  icon={<FaUserAlt />}
                  name="lastName"
                  onChange={handleChange}
                />

                <CustomTextField
                  inputError={inputErrors.phone}
                  style={styleFull}
                  label="Phone Number"
                  icon={<FaPhone size={19} />}
                  name="phone"
                  onChange={handleChange}
                />

                <CustomToolTip
                  handleTooltipClose={handleTooltipClose}
                  open={open}
                  title={passwordToottipTitle}
                >
                  <CustomPasswordField
                    onClick={handleTooltipOpen}
                    handleTooltipOpen={handleTooltipOpen}
                    inputError={inputErrors.password}
                    style={styleFull}
                    showIcon={true}
                    id="password"
                    label="Password"
                    icon={<FaLock size={17} />}
                    name="password"
                    handleChange={handleChange}
                  />
                </CustomToolTip>

                <CustomPasswordField
                  inputError={inputErrors.confirmPassword}
                  style={styleFull}
                  showIcon={false}
                  id="confirmPassword"
                  label="Confirm Password"
                  icon={<FaLock size={17} />}
                  name="confirmPassword"
                  handleChange={handleChange}
                />

                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginLeft: "-8%",
                    marginRight: "-8%",
                  }}
                  ref={parent}
                >
                  {error}
                </p>
                <hr />

                <button
                  className="btn btn-success mb-4"
                  style={{
                    fontSize: 21,
                    width: "100%",
                    height: 45,
                  }}
                  type="submit"
                >
                  Register
                </button>
              </form>

              <div
                style={{
                  fontSize: "105%",
                  marginLeft: "-1%",
                  marginRight: "-1%",
                }}
                className="mb-2 mb-md-1 d-flex align-items-center justify-content-center"
              >
                {"Already have an account?"}

                <Link
                  to="/Login"
                  style={{
                    marginLeft: "2%",
                    marginBottom: "2px",
                    textDecoration: "none",
                  }}
                >
                  {"Login"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
