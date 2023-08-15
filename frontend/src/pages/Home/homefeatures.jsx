import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moneyPic from "../../utils/pictures/money.png";
import checkPic from "../../utils/pictures/check.png";
import searchPic from "../../utils/pictures/search.png";
import AOS from "aos";
import "aos/dist/aos.css";
import useImagePreloader from "../../hooks/useImagePreloader/useImagePreloader";

import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

import { GrInstagram } from "react-icons/gr";

const preloadSrcList = [moneyPic, checkPic, searchPic];

export default function HomeFeatures() {
  const { imagesPreloaded } = useImagePreloader(preloadSrcList);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  if (!imagesPreloaded) {
    return <></>;
  }
  return (
    <div
      id="tutorial"
      style={{
        paddingTop: "30px",
        backgroundColor: "#eee",
        letterSpacing: "1px",
      }}
    >
      <div className="mt-4 py-4 py-xl-5">
        <div className="row-6 mb-5">
          <div className="col-10 col-md-8 col-xl-3 text-center mx-auto">
            <h1 className="mb-2">Salient Features</h1>
            <p data-aos="zoom-in-up">
              Carefully catered necessary features for user friendly
              environment.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: "-25px", paddingBottom: "40px" }}
        className="container"
      >
        <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
          <div className="col">
            <div className="text-center d-flex flex-column align-items-center align-items-xl-center">
              <div className="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <img
                  style={{ height: "93px", width: "93px" }}
                  src={checkPic}
                  alt=""
                  data-aos="zoom-in-up"
                />
              </div>
              <div className="px-3">
                <h4 data-aos="zoom-in-up">Featured Products</h4>
                <p data-aos="zoom-in-up">
                  Showcase a selection of the freshest and most in-demand crops
                  from local farmers and highlights unique qualities and
                  benefits in their product with brief description. This section
                  can rotate or be regularly updated to highlight different
                  crops, promoting diversity and attracting the attention of
                  potential buyers.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="text-center d-flex flex-column align-items-center">
              <div className="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <img
                  style={{ height: "93px", width: "107px" }}
                  src={moneyPic}
                  alt=""
                  data-aos="zoom-in-up"
                />
              </div>
              <div className="px-3">
                <h4 data-aos="zoom-in-up">Real-time Market Prices</h4>
                <p data-aos="zoom-in-up">
                  Provide a real-time or regularly updated section that displays
                  the current market prices of various crops. This information
                  is crucial for both farmers and buyers as it helps them make
                  informed decisions about when to sell or buy specific crops.
                  Also ensure the fair prices of all crops.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="text-center d-flex flex-column align-items-center align-items-xl-center">
              <div className="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <img
                  style={{ height: "92px", width: "92px" }}
                  src={searchPic}
                  alt=""
                  data-aos="zoom-in-up"
                />
              </div>
              <div className="px-3">
                <h4 data-aos="zoom-in">Intuitive Search</h4>
                <p data-aos="zoom-in">
                  Implement filters and sorting options to help users refine
                  their search results based on criteria such as crop type,
                  price range, location, and more. Additionally, use descriptive
                  and concise labels for navigation buttons and categories to
                  minimize confusion and improve the overall user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <footer
          className="text-center text-lg-start text-dark"
          style={{ backgroundColor: "#5cac81b6" }}
        >
          <section
            className="d-flex justify-content-around align-content-around flex-wrap p-2 text-white"
            style={{ backgroundColor: "#1b854a", fontSize: "23px" }}
          >
            <div className="me-2">
              <div>Connect with us:&nbsp;&nbsp;</div>
            </div>

            <div>
              <a
                href="https://www.instagram.com/umar_.tariq/"
                className="text-white me-4"
              >
                <GrInstagram />
              </a>
              <a
                href="https://twitter.com/umar__tariq/"
                className="text-white me-4"
              >
                <FaTwitter />
              </a>
              <a
                href="https://github.com/umart823/"
                className="text-white me-4"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/umar-tariq-"
                className="text-white me-4"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="mailto: official.umartariq@gmail.com"
                className="text-white me-4"
              >
                <FaEnvelope />
              </a>
            </div>
          </section>
          <section className="">
            <div className={"container text-center mt-2"}>
              <div className="row mt-3">
                <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-0 mb-md-4">
                  <hr />
                  <h5 className="text-uppercase fw-bold">Kisaan App</h5>
                  <hr
                    className="mx-auto"
                    style={{ backgroundColor: "#7c4dff" }}
                    // "width: 60px; background-color: #7c4dff; height: 2px"
                  />
                  <p style={{ textAlign: "justify" }}>
                    We provide a platform for farmers and vendors, through which
                    they are being connected to avoid shortness of crops caused
                    because of middlemen and to ensure the fair prices of crops
                    due to which farmers, vendors and buyers would be happy.
                  </p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-0 mb-md-4">
                  <hr />
                  <h5 className="text-uppercase align-items-center text-center fw-bold">
                    Useful Links
                  </h5>
                  <hr
                    className="mx-auto"
                    style={{ backgroundColor: "#7c4dff" }}
                    // "width: 60px; background-color: #7c4dff; height: 2px"
                  />
                  <div className="py-2">
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      <p className="h5  text-dark text-center fw-normal">
                        Sign Up
                      </p>
                    </Link>
                  </div>
                  <div className="py-2">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <p className="h5 text-dark text-center fw-normal">
                        Login
                      </p>
                    </Link>
                  </div>
                  <div className="py-2">
                    <Link to="/contact" style={{ textDecoration: "none" }}>
                      <p className="h5  text-dark text-center  fw-normal">
                        Contact
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4 ">
                  <hr />
                  <h5 className={"text-uppercase text-center fw-bold"}>
                    About
                  </h5>
                  <hr
                    className="mx-auto"
                    style={{ backgroundColor: "#7c4dff" }}
                    // "width: 60px; background-color: #7c4dff; height: 2px"
                  />
                  <p style={{ textAlign: "justify" }}>
                    We are a team of passionate individuals who believe in the
                    hardwork of farmers and are committed to bridge the gap
                    between farmers and merket, empowering them to reach wider
                    audience and ensure fair prices.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center text-light p-3 p-md-2"
            style={{ backgroundColor: "black" }}
          >
            © 2023 Copyright:&nbsp;
            <a className="text-light" href="/">
              KisaanApp.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
