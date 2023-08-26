import React, { useState } from "react";

import axios from "axios";
import LoadingBar from "../../../components/LoadingBar/LoadingBar";
import CustomLoadingAnimation from "../../../components/LoadingAnimation/loadingAnimation";
import { useSnackbar } from "notistack";
import { trimObject } from "../../../utils/objectFunctiions/trimObject";
import { findKeyWithEmptyStringValue } from "../../../utils/objectFunctiions/findKeyWithEmptyStringValue";
import { capitalize } from "../../SignUp/Validation";

function AddBird() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [ringNo, setRingNo] = useState("");
  const [error, setError] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Select only the first image

    if (file && file.type.startsWith("image/")) {
      setSelectedImage([file]);
    } else if (file) {
      alert(`Selected file is not a valid image.`);
    }

    e.target.value = null;
  };

  const handleImageUploadOptimized = async () => {
    const jsonData = trimObject({
      name,
      price,
      gender,
      status,
      ringNo,
      date,
      purchasedFrom,
      phone,
    });

    const emptyKey = findKeyWithEmptyStringValue(jsonData);
    if (emptyKey !== null) {
      setError(
        `${capitalize(emptyKey.replace(/([A-Z])/g, " $1"))} must not be empty`
      );
      console.log(error);
      return;
    }

    if (selectedImage.length === 1) {
      setButtonDisabled(true);
      const formData = new FormData();
      formData.append(`image`, selectedImage[0]);

      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Perform the image upload using Axios
      try {
        formData.append("data", JSON.stringify(jsonData));

        const url = process.env.REACT_APP_BASE_URL + "/addBird";
        await axios.post(url, formData, config);
        enqueueSnackbar("Bird data uploaded successfully", {
          variant: "success",
        });
      } catch (error) {
        setButtonDisabled(true);
        enqueueSnackbar(
          error?.response?.data?.message ||
            "Server not working. Try again later",
          { variant: "error" }
        );
      }

      setTimeout(() => {
        setSelectedImage([]);
        setUploadProgress(0);
        setButtonDisabled(false);
      }, 700);
    } else {
      enqueueSnackbar("Select 1 image before uploading", {
        variant: "error",
      });
    }
  };
  return (
    <>
      <div className="">
        <h1>Add Bird Form</h1>
        <div>
          <label>Bird Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Ring Number:</label>
          <input
            type="text"
            value={ringNo}
            onChange={(e) => setRingNo(e.target.value)}
          />
        </div>
        <div>
          <label>Date of purchased:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Purchased from:</label>
          <input
            type="text"
            value={purchasedFrom}
            onChange={(e) => setPurchasedFrom(e.target.value)}
          />
        </div>
        <div>
          <label>Phone number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <input
        id="imagesInputSelect"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="d-none"
      />
      <div>
        <p>Image: {selectedImage[0]?.name}</p>
      </div>
      {buttonDisabled && (
        <LoadingBar value={Number(uploadProgress)} width="80%" />
      )}
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={() => {
          document.getElementById("imagesInputSelect").click();
        }}
      >
        Choose Image
      </button>
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={() => {
          setSelectedImage([]);
        }}
      >
        Clear Image
      </button>
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={handleImageUploadOptimized}
      >
        Upload Bird data
      </button>
    </>
  );
}

export default AddBird;
