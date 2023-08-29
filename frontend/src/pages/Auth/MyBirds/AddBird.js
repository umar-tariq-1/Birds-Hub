import React, { useEffect, useState } from "react";

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
import { format } from "date-fns";

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
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [ringNo, setRingNo] = useState("");
  const [error, setError] = useState("");
  const [addBirdOpen, setAddBirdOpen] = useState(false);
  const [range, setRange] = useState(new Date()); //Date selected on date selector
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (Number(uploadProgress) === 100) {
      const timeout = setTimeout(() => {
        setShowLoadingAnimation(true);
      }, 600);

      return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
    } else {
      setShowLoadingAnimation(false);
    }
  }, [uploadProgress]);

  const openAddBird = () => {
    setAddBirdOpen(true);
  };
  const closeAddBird = () => {
    setAddBirdOpen(false);
  };

  const resetValues = () => {
    setSelectedImage([]);
    setName("");
    setGender("");
    setStatus("");
    setRange(new Date());
    setError("");
    setRingNo("");
    setPrice("");
    setPurchasedFrom("");
    setPhone("");
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

  useEffect(() => {
    setDate(format(range, "dd-MMM-yy"));
  }, [range]);

  const handleImageUploadOptimized = async () => {
    const jsonData = trimObject({
      name,
      price,
      gender,
      status,
      ringNo,
      date,
      purchasedFrom,
      phone: phone.toString(),
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
      setIsLoading(true);
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
        setShowLoadingAnimation(false);
        setIsLoading(false);
        enqueueSnackbar("Bird data uploaded successfully", {
          variant: "success",
        });
        setUploadProgress(0);
        closeAddBird();
        resetValues();
        return;
      } catch (error) {
        setShowLoadingAnimation(false);
        setIsLoading(false);
        enqueueSnackbar(
          error?.response?.data?.message ||
            "Server not working. Try again later",
          { variant: "error" }
        );
        return;
      }
    } else {
      enqueueSnackbar("Select 1 image before uploading", {
        variant: "error",
      });
    }
  };

  return (
    <>
      {showLoadingAnimation && <CustomLoadingAnimation />}
      <input
        id="imagesInputSelect"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="d-none"
      />
      <div>
        <Button variant="outlined" onClick={openAddBird}>
          Open dialog
        </Button>

        <BootstrapDialog
          onClose={closeAddBird}
          aria-labelledby="customized-dialog-title"
          open={addBirdOpen}
        >
          <DialogTitle
            sx={{
              m: 0,
              px: 2,
              pt: "12px",
              pb: "8px",
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
            onClick={closeAddBird}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
          <DialogContent
            sx={{
              overflow: { xs: "hidden", md: "auto" },
              height: "445px",
            }}
            dividers
          >
            <CustomTextField
              onChange={(e) => setName(e.target.value)}
              label="Bird Name"
              value={name}
              required={true}
              inputError={false}
              style={{
                width: "94%",
                marginBottom: "12px",
                marginLeft: "3%",
                marginTop: "1px",
              }}
            />
            <FormControl
              required={true}
              size="medium"
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "3%",
              }}
            >
              <InputLabel required={true} id="genderLabel">
                Gender
              </InputLabel>
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
              required={true}
              size="medium"
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "1.5%",
              }}
            >
              <InputLabel required={true} id="statusLabel">
                Status
              </InputLabel>
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
              value={ringNo}
              inputError={false}
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "3%",
              }}
              required={false}
            />
            <CustomTextField
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
              type="number"
              value={price}
              style={{
                width: "46.25%",
                marginBottom: "12px",
                marginLeft: "1.5%",
              }}
              required={true}
              inputError={false}
            />
            <CustomTextField
              onChange={(e) => setPurchasedFrom(e.target.value)}
              label="Purchased from"
              style={{ width: "94%", marginBottom: "12px", marginLeft: "3%" }}
              inputError={false}
              required={true}
              value={purchasedFrom}
            />
            <CustomTextField
              onChange={(e) => setPhone(e.target.value)}
              label="Phone number"
              style={{
                width: "49.25%",
                marginBottom: "12px",
                marginLeft: "3%",
              }}
              type="number"
              inputError={false}
              value={phone}
              required={true}
            />
            <CustomTextField
              onChange={(e) => setDate(e.target.value)}
              label="Date"
              value={date}
              style={{
                width: "43.25%",
                marginBottom: "12px",
                marginLeft: "1.5%",
              }}
              required={true}
              inputError={false}
            />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                style={{ width: "93%", marginBottom: "4px" }}
                className="d-flex justify-content-center"
              >
                <h5
                  className="text-muted"
                  style={{ fontFamily: "Titillium Web" }}
                >
                  Image:&nbsp;
                </h5>
                <span
                  className="text-truncate"
                  style={
                    selectedImage[0]?.name
                      ? {
                          color: "Darkgreen",
                          marginTop: "1px",
                          fontFamily: "Titillium Web",
                        }
                      : {
                          color: "red",
                          marginTop: "1px",
                          fontFamily: "Titillium Web",
                        }
                  }
                >
                  {selectedImage[0]?.name ?? "not selected"}
                </span>
              </div>
              {isLoading ? (
                <LoadingBar value={Number(uploadProgress)} width="80%" />
              ) : (
                <div style={{ height: "34px" }}>
                  <button
                    className={`btn btn-outline-success mx-2 mb-4`}
                    onClick={() => {
                      document.getElementById("imagesInputSelect").click();
                    }}
                  >
                    Choose Image
                  </button>
                  <button
                    className={`btn btn-outline-danger mx-2 mb-4`}
                    onClick={() => {
                      setSelectedImage([]);
                    }}
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions sx={{ height: "65px" }}>
            <Button
              sx={{ fontSize: "16px" }}
              autoFocus
              variant="outlined"
              size="medium"
              onClick={handleImageUploadOptimized}
            >
              Upload
            </Button>
            <Button
              sx={{ marginRight: "3.5%", fontSize: "16px" }}
              color="error"
              variant="outlined"
              size="medium"
              onClick={() => {
                resetValues();
                closeAddBird();
              }}
            >
              Discard
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <DatePicker mode="date" range={range} handleSelect={setRange} />
    </>
  );
}

export default AddBird;
