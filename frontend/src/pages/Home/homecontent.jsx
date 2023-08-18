import { Link } from "react-router-dom";
import React from "react";
import main from "../../utils/pictures/mainCompressed.webp";
import styles from "./styles.module.css";
import useImagePreloader from "../../hooks/useImagePreloader/useImagePreloader";
import CustomLoadingAnimation from "../../components/LoadingAnimation/loadingAnimation";
// import Navbar from "../../components/Navbar/navbar";


const preloadSrcList=[main];


export default function HomeContent() {
  const { imagesPreloaded } = useImagePreloader(preloadSrcList);

   if (!imagesPreloaded) {
    console.log(imagesPreloaded);
    return <CustomLoadingAnimation overlayColor={"rgba(0,0,0,0.1)"} />;
  }
  return (
    <>
      {/* <Navbar Home={1} /> */}
      <div
        style={{
          height: "570px",
          backgroundImage: `url(${preloadSrcList[0]})`,
          backgroundPosition: "81%",
          backgroundSize: "cover",
          letterSpacing:"1px"
        }}
      >
        <div className="container h-100 d-flex justify-content-center justify-content-md-start">
          <div className="row h-100">
            <div className="col-md-8 mb-3 text-center d-flex justify-content-center align-items-end align-items-md-center w-100">
              <div className="py-5" style={{ maxWidth: "1000px" }}>
                <div className={`${styles.ani1} ${styles.animatedParagraph}`}>
                  <h1
                    className="text-uppercase text-center fw-bold"
                    style={{ color: "aliceblue" ,fontFamily:'Titillium Web, sans-serif',fontSize: "285%" }}
                  >
                    Empowering
                  </h1>
                </div>
                <div className={`${styles.ani2} ${styles.animatedParagraph}`}>
                  <h1 style={{ color: "aliceblue",fontFamily:'Titillium Web, sans-serif' ,fontSize: "200%" }}>
                    Bird Entrepreneurs
                  </h1>
                </div>
                <div className={`${styles.ani3} ${styles.animatedParagraph}`}>
                  <h1
                    className="text-capitalize mb-5"
                    style={{ color: "aliceblue",fontFamily:'Titillium Web, sans-serif', fontSize: "190%" }}
                  >
                     with Avian Inventory
                  </h1>
                </div>
                <div className={`${styles.ani4} ${styles.animatedParagraph}`}>
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
