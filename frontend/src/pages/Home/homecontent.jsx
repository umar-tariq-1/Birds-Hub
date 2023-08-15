import { Link } from "react-router-dom";
import React from "react";
import main from "../../utils/pictures/main.webp";
import styles from "./styles.module.css";
import useImagePreloader from "../../hooks/useImagePreloader/useImagePreloader";
import CustomLoadingAnimation from "../../components/LoadingAnimation/loadingAnimation";
// import Navbar from "../../components/Navbar/navbar";


const preloadSrcList=[main];


export default function HomeContent() {
  const { imagesPreloaded } = useImagePreloader(preloadSrcList);

   if (!imagesPreloaded) {
    return <CustomLoadingAnimation overlayColor={"rgba(0,0,0,0.1)"} />;
  }
  return (
    <>
      {/* <Navbar Home={1} /> */}
      <div
        style={{
          height: "560px",
          backgroundImage: `url(${main})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          letterSpacing:"1px"
        }}
      >
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-md-8 mb-3 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
              <div style={{ maxWidth: "600px" }}>
                <div className={`${styles.ani1} ${styles.animatedParagraph}`}>
                  <h1
                    className="text-uppercase text-center fw-bold"
                    style={{ color: "aliceblue" ,fontFamily:'Titillium Web, sans-serif',fontSize: "285%" }}
                  >
                    Bringing farm
                  </h1>
                </div>
                <div className={`${styles.ani2} ${styles.animatedParagraph}`}>
                  <h1 style={{ color: "aliceblue",fontFamily:'Titillium Web, sans-serif' ,fontSize: "200%" }}>
                    To Your Doorstep And
                  </h1>
                </div>
                <div className={`${styles.ani3} ${styles.animatedParagraph}`}>
                  <h1
                    className="text-capitalize mb-5"
                    style={{ color: "aliceblue",fontFamily:'Titillium Web, sans-serif', fontSize: "190%" }}
                  >
                    Neighbourhood stores
                  </h1>
                </div>
                <div className={`${styles.ani4} ${styles.animatedParagraph}`}>
                  <p style={{ color: "aliceblue",fontFamily:'Titillium Web, sans-serif' ,fontSize: "130%" }}>
                    We are a team of passionate individuals who are committed to bridge the gap between farmers and merket, empowering both. {/* them to reach wider audience and ensure fair prices */}{/*  Our mission is to bridge the gap between farmers and market. */}
                  </p>
                </div>
                <div className={`${styles.ani5} ${styles.animatedParagraph}`}>
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <button className="btn btn-success btn-lg shadow-lg mt-4 me-2" style={{fontSize:"20px"}}>
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}
