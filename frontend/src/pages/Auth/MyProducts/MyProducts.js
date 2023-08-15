import React, { useState } from "react";
import axios from "axios";
import LoadingBar from "../../../components/LoadingBar/LoadingBar";
import CustomLoadingAnimation from "../../../components/LoadingAnimation/loadingAnimation";
import { useSnackbar } from "notistack";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";

const MyProducts = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newSelectedImages = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        if (
          !newSelectedImages.find((file) => {
            return file.name === files[i].name;
          })
        ) {
          newSelectedImages.push(files[i]);
        }
      } else {
        alert(`File ${files[i].name} is not a valid image. Skipping.`);
      }
    }
    e.target.value = null;
    setSelectedImages([...newSelectedImages]);
  };

  const handleAddImages = (e) => {
    const files = e.target.files;
    const newSelectedImages = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        if (
          !selectedImages.find((file) => {
            return file.name === files[i].name;
          })
        ) {
          newSelectedImages.push(files[i]);
        }
      } else {
        alert(`File ${files[i].name} is not a valid image. Skipping.`);
      }
    }
    e.target.value = null;
    setSelectedImages([...newSelectedImages, ...selectedImages]);
  };

  const handleImageUploadOptimized = async () => {
    if (selectedImages.length > 0 && selectedImages.length < 5) {
      setButtonDisabled(true);
      var formData = new FormData();
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append(`image`, selectedImages[i]);
      }

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
        var jsonData = { name, address, quantity, description, price };
        formData.append("data", JSON.stringify(jsonData));

        const url = process.env.REACT_APP_BASE_URL + "/addProduct";
        const { data } = await axios.post(url, formData, config);
        // console.log(data);
        enqueueSnackbar("Images uploaded successfully", {
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
        setSelectedImages([]);
        setUploadProgress(0);
        setButtonDisabled(false);
      }, 700);
    } else if (!(selectedImages.length > 0)) {
      enqueueSnackbar("Select atleast 1 image before uploading", {
        variant: "error",
      });
    } else if (selectedImages.length > 4) {
      enqueueSnackbar("Select atmost 4 images before uploading", {
        variant: "error",
      });
    }
  };

  return (
    <ResponsiveDrawer MyProducts={1}>
      {/* <CustomLoadingAnimation /> */}
      <div className="App">
        <h1>Product Form</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
      </div>
      <input
        id="imagesInputSelect"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="d-none"
      />
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={() => {
          document.getElementById("imagesInputSelect").click();
        }}
      >
        Choose Images
      </button>
      <input
        id="imagesInputAdd"
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddImages}
        className="d-none"
      />
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={() => {
          document.getElementById("imagesInputAdd").click();
        }}
      >
        Add Images
      </button>
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={handleImageUploadOptimized}
      >
        Upload Product
      </button>
      <button
        className={`btn btn-primary ${buttonDisabled && "disabled"} mx-2 mb-4`}
        onClick={() => {
          setSelectedImages([]);
        }}
      >
        Clear Images
      </button>
      <div>
        {selectedImages.map((image, index) => (
          <p key={Date.now().toString() + index.toString()}>{image.name}</p>
        ))}
      </div>
      {buttonDisabled && (
        <LoadingBar value={Number(uploadProgress)} width="80%" />
      )}
    </ResponsiveDrawer>
  );
};

export default MyProducts;
