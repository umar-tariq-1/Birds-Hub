import React, { useState } from "react";

import axios from "axios";
import LoadingBar from "../../../components/LoadingBar/LoadingBar";
import CustomLoadingAnimation from "../../../components/LoadingAnimation/loadingAnimation";
import { useSnackbar } from "notistack";
import { trimObject } from "../../../utils/objectFunctiions/trimObject";
import { findKeyWithEmptyStringValue } from "../../../utils/objectFunctiions/findKeyWithEmptyStringValue";
import { capitalize } from "../../SignUp/Validation";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CustomTextField from "../../../components/Form/textfield";
import DatePicker from "../../../components/DatePicker/DatePicker";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    if (emptyKey !== null && emptyKey !== "ringNo") {
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
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open dialog
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              fontSize: "26px",
              fontFamily: "Titillium Web, sans-serif",
              fontWeight: "Bolder",
              letterSpacing: "1px",
            }}
            id="customized-dialog-title"
          >
            &nbsp;&nbsp;Add Bird
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
          <DialogContent dividers>
            <CustomTextField
              onChange={(e) => setName(e.target.value)}
              label="Bird Name"
              name="name"
              inputError={false}
              style={{ width: "94%", marginBottom: "12px", marginLeft: "3%" }}
            />
            <FormControl
              size="medium"
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "3%",
              }}
            >
              <InputLabel id="genderLabel">Gender*</InputLabel>
              <Select
                labelId="genderLabel"
                id="genderSelect"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                label="Gender"
                required={true}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              size="medium"
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "1.5%",
              }}
            >
              <InputLabel id="statusLabel">Status*</InputLabel>
              <Select
                labelId="statusLabel"
                id="statusSelect"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                label="Status"
                required={true}
              >
                <MenuItem value="Alive">Alive</MenuItem>
                <MenuItem value="Dead">Dead</MenuItem>
              </Select>
            </FormControl>
            <CustomTextField
              onChange={(e) => setRingNo(e.target.value)}
              label="Ring number"
              name="ringNo"
              inputError={false}
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "3%",
              }}
              required={false}
            />
            <CustomTextField
              onChange={(e) => setDate(e.target.value)}
              label="Purchase Date"
              name="date"
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "1.5%",
              }}
              inputError={false}
            />
            <CustomTextField
              onChange={(e) => setPurchasedFrom(e.target.value)}
              label="Purchased from"
              name="purchasedFrom"
              style={{ width: "94%", marginBottom: "12px", marginLeft: "3%" }}
              inputError={false}
            />
            <CustomTextField
              onChange={(e) => setPhone(e.target.value)}
              label="Phone number"
              name="phone"
              style={{ width: "94%", marginBottom: "12px", marginLeft: "3%" }}
              inputError={false}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              size="large"
              onClick={() => {
                handleImageUploadOptimized();
                handleClose();
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <DatePicker mode="date" range={range} handleSelect={setRange} />
    </>
  );
}

export default AddBird;
