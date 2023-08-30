import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import xlsPic from "../../utils/pictures/xls.png";
import checkPic from "../../utils/pictures/check.png";
import searchPic from "../../utils/pictures/search.png";
import AOS from "aos";
import "aos/dist/aos.css";
import useImagePreloader from "../../hooks/useImagePreloader/useImagePreloader";

import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

import { GrInstagram } from "react-icons/gr";

const preloadSrcList = [xlsPic, checkPic, searchPic];

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
      <div className="mt-3 py-4 py-xl-5">
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
                  alt=" Loading..."
                  data-aos="zoom-in-up"
                />
              </div>
              <div className="px-3">
                <h4 data-aos="zoom-in-up">Maintained Data</h4>
                <p data-aos="zoom-in-up">
                  Neatly structured table empowers you to monitor avian stock. Experience the convenience of meticulously designed tables that elegantly organizes and presents your inventory data. With its user-friendly interface, you can effortlessly track, manage, and update your stock and data.
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
                  alt=" Loading..."
                  data-aos="zoom-in-up"
                />
              </div>
              <div className="px-3">
                <h4 data-aos="zoom-in">Intuitive Search</h4>
                <p data-aos="zoom-in">
                  Implement filters and sorting options to help users refine
                  their search results based on criteria such as bird name,
                  price range, purchasing date, and more. Additionally, use descriptive
                  and concise labels for navigation buttons and grouping to
                  minimize confusion and improve the overall user experience.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="text-center d-flex flex-column align-items-center">
              <div className="bs-icon-lg bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <img
                  style={{ height: "94px", width: "94px" }}
                  src={xlsPic}
                  alt=" Loading..."
                  data-aos="zoom-in-up"
                />
              </div>
              <div className="px-3">
                <h4 data-aos="zoom-in-up">Data Exportation</h4>
                <p data-aos="zoom-in-up">
                  Elevate your inventory management experience with the convenience of swift data export. Instantly generate PDF and Excel reports from your maintained records. Say goodbye to complexity and hello to efficiency as you effortlessly compile, share, and analyze your birds data with just one easy click. 
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
                  <h5 className="text-uppercase fw-bold">Birds Hub</h5>
                  <hr
                    className="mx-auto"
                    style={{ backgroundColor: "#7c4dff" }}
                    // "width: 60px; background-color: #7c4dff; height: 2px"
                  />
                  <p style={{ textAlign: "justify" }}>
                    Empowering Avian Enthusiasts and Entrepreneurs With our
                    Birds Inventory, we're offering a comprehensive solution for
                    birdkeepers, breeders, and enthusiasts. This platform has
                    been meticulously designed to streamline the management of
                    your avian companions and facilitate the smooth operation of
                    your bird-related business endeavors.
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
                    We are a team passionate about connecting bird enthusiasts,
                    breeders, and vendors through our innovative Birds Inventory
                    App. With a deep appreciation for the avian world, we
                    recognized the need for a comprehensive solution that
                    simplifies the management of birds, breeding history and
                    handling expenses etc.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center text-white-50 p-3 p-md-2"
            style={{ backgroundColor: "black" }}
          >
            © 2023 Copyright:&nbsp;
            <a className="text-white-50" href="/">
              BirdsHub.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
