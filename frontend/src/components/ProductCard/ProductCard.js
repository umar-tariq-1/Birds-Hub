import React from "react";

import "./ProductCard.css";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

// provide image, rating, name, city, description, price, ratingsCount, id

const ProductCard = (props) => {
  const halfStar = Math.ceil(props.rating - Math.floor(props.rating));

  return (
    <div className="row justify-content-center mb-3">
      <div className="col-md-12 col-xl-10">
        <div className="card shadow border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 col-lg-3 mb-4 mb-lg-0 image-div">
                {/* <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    > */}
                <img
                  src={`https://ik.imagekit.io/umartariq/productImages/${props.image}?tr=pr-true,ar-11-8,h-240`}
                  className="card-img w-100"
                  loading="lazy"
                  alt="&nbsp;Loading..."
                />
                {/* </MDBRipple> */}
              </div>
              <div className="col-md-8 col-lg-6">
                <h3>{props.name}</h3>
                <div className="d-flex flex-row">
                  <div className="text-warning mb-1 me-2">
                    {Array.from({ length: props.rating }, (_, index) => (
                      <FaStar size={"17px"} />
                    ))}
                    {halfStar && <FaStarHalf size={"17px"} />}
                  </div>
                  <span style={{ marginTop: "3px", fontSize: "14px" }}>
                    {props.ratingsCount}
                  </span>
                </div>
                <div className="mt-2 mb-0 text-muted ">
                  <span>
                    <FaLocationDot
                      size={"16px"}
                      style={{ marginTop: "-3px" }}
                    />
                  </span>
                  <span className="ms-2">{props.city}</span>
                  {/* <span className="text-primary"> • </span>
                      <span>Light weight</span>
                      <span classNAme="text-primary"> • </span>
                      <span>
                        Best finish
                        <br />
                      </span> */}
                </div>
                <p className="text-truncate w-100 mt-3 mb-4 mb-md-0">
                  {props.description}
                </p>
              </div>
              <div className="col-md-6 col-lg-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-2">{props.price}/-</h4>
                  {/* <span className="text-danger">
                        <s>21.99/-</s>
                      </span> */}
                </div>
                {/* <h6 className="text-success">Free shipping</h6> */}
                <div className="d-flex flex-column mt-4">
                  <div
                    style={{ fontSize: "17px" }}
                    className="d-none d-md-block btn btn-success btn-sm"
                  >
                    Details
                  </div>
                  <div
                    style={{ fontSize: "17px" }}
                    className="d-block d-md-none btn btn-success"
                  >
                    Details
                  </div>
                  <div
                    style={{ fontSize: "14px" }}
                    className="btn btn-outline-success btn-sm mt-2"
                  >
                    Add to favourites&nbsp;{" "}
                    <span>
                      <FaHeart style={{ marginBottom: "4px" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
