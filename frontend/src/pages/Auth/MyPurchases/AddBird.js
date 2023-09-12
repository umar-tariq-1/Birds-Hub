import React, { useEffect, useState, forwardRef } from "react";
import "./MyPurchases.css";
import axios from "axios";
import LoadingBar from "../../../components/LoadingBar/LoadingBar";
import CustomLoadingAnimation from "../../../components/LoadingAnimation/loadingAnimation";
import { useSnackbar } from "notistack";
import { trimObject } from "../../../utils/objectFunctiions/trimObject";
import { findKeyWithEmptyStringValue } from "../../../utils/objectFunctiions/findKeyWithEmptyStringValue";
import { capitalize } from "../../SignUp/Validation";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Dialog,
  TextField,
  MenuItem,
  Select,
  Button,
  Slide,
  InputLabel,
  FormControl,
  IconButton,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import DatePicker from "../../../components/DatePicker/DatePicker";
import { format, parse, isValid } from "date-fns";
import { ImageViewer } from "../../../components/ImageViewer/ImageViewer";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

var selectedImgURL = "";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddBird(props) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [ringNo, setRingNo] = useState("");
  const [dna, setDna] = useState("");
  const [error, setError] = useState({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [range, setRange] = useState(new Date()); //Date selected on date selector
  const [date, setDate] = useState("");
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (Number(uploadProgress) === 100) {
      if (selectedImage.length >= 1) {
        const timeout = setTimeout(() => {
          setShowLoadingAnimation(true);
        }, 600);

        return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
      }
    } else {
      setShowLoadingAnimation(false);
    } // eslint-disable-next-line
  }, [uploadProgress]);

  const { addBirdOpen, setAddBirdOpen, refetch } = props;

  const closeAddBird = () => {
    setAddBirdOpen(false);
  };
  const openDatePicker = () => {
    setDatePickerOpen(true);
  };
  const closeDatePicker = () => {
    setDatePickerOpen(false);
  };

  const handleDatePickerChange = (date) => {
    if (date === undefined || date === null) {
      return;
    } else {
      setRange(date);
    }
  };

  const resetValues = () => {
    setSelectedImage([]);
    setName("");
    setGender("");
    setStatus("");
    setDna("");
    setRange(new Date());
    setDate("");
    setDatePickerOpen(false);
    setError({});
    setRingNo("");
    setPrice("");
    setPurchasedFrom("");
    setPhone("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Select only the first image

    if (file && file.type.startsWith("image/")) {
      setSelectedImage([file]);
      selectedImgURL = URL.createObjectURL(file);
    } else if (file) {
      enqueueSnackbar("Selected file is not a valid image", {
        variant: "error",
      });
      selectedImgURL = "";
    }

    e.target.value = null;
  };

  const handleKeyPress = (e) => {
    if (addBirdOpen && e.key === "Enter") {
      handleImageUploadOptimized();
    }
  };

  const handleImageUploadOptimized = async () => {
    const jsonData = trimObject({
      name,
      gender,
      status,
      dna,
      price,
      purchasedFrom,
      phone: phone.toString(),
      date,
      ringNo,
    });

    const emptyKey = findKeyWithEmptyStringValue(jsonData);
    if (emptyKey !== null && emptyKey !== "ringNo") {
      const newError = `${capitalize(
        emptyKey.replace(/([A-Z])/g, " $1")
      )} must not be empty`;
      setError({ [emptyKey]: true });
      enqueueSnackbar(newError, {
        variant: "error",
      });
      return;
    }

    if (dna !== true && dna !== false) {
      setError({ dna: true });
      enqueueSnackbar("Please select DNA before uploading", {
        variant: "error",
      });
      return;
    }

    const parsedDate = parse(date, "dd-MMM-yy", new Date());
    if (!isValid(parsedDate)) {
      setError({ date: true });
      enqueueSnackbar("Select valid date", { variant: "error" });
      return;
    }

    setIsLoading(true);
    if (selectedImage.length === 0) {
      setShowLoadingAnimation(true);
    }

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

    try {
      formData.append("data", JSON.stringify(jsonData));

      const url = process.env.REACT_APP_BASE_URL + "/addBird";
      await axios.post(url, formData, config);
      setShowLoadingAnimation(false);
      setIsLoading(false);
      setAddBirdOpen(false);
      enqueueSnackbar("Bird data uploaded successfully", {
        variant: "success",
      });
      setUploadProgress(0);
      resetValues();
      refetch();
      return;
    } catch (error) {
      setUploadProgress(0);
      setShowLoadingAnimation(false);
      setIsLoading(false);
      enqueueSnackbar(
        error?.response?.data?.message || "Server not working. Try again later",
        { variant: "error" }
      );
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }; // eslint-disable-next-line
  }, [addBirdOpen]);

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
        <BootstrapDialog
          sx={{ zIndex: 1299 }}
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
            className="hide-scrollbar"
            sx={{
              height: "441px",
            }}
            dividers
          >
            <div className="mt-md-1 px-md-3">
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                  setError({});
                }}
                label="Bird Name"
                value={name}
                required={true}
                type="text"
                color="success"
                error={error.name}
                style={{
                  width: "95%",
                  marginBottom: "12px",
                  marginLeft: "2.5%",
                  marginTop: "1px",
                }}
              />
              <FormControl
                required={true}
                size="medium"
                error={error.gender}
                style={{
                  width: "33.69%",
                  marginBottom: "12px",
                  marginLeft: "2.5%",
                }}
              >
                <InputLabel color="success" required={true} id="genderLabel">
                  Gender
                </InputLabel>
                <Select
                  labelId="genderLabel"
                  id="genderSelect"
                  color="success"
                  value={gender}
                  onClick={() => setError({})}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  label="Gender"
                  required={true}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                required={true}
                size="medium"
                error={error.status}
                style={{
                  width: "31.98%",
                  marginBottom: "12px",
                  marginLeft: "1%",
                }}
              >
                <InputLabel color="success" required={true} id="statusLabel">
                  Status
                </InputLabel>
                <Select
                  labelId="statusLabel"
                  id="statusSelect"
                  color="success"
                  value={status}
                  onClick={() => setError({})}
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
              <FormControl
                required={true}
                size="medium"
                error={error.dna}
                style={{
                  width: "27.33%",
                  marginBottom: "12px",
                  marginLeft: "1%",
                }}
              >
                <InputLabel color="success" required={true} id="dnaLabel">
                  DNA
                </InputLabel>
                <Select
                  labelId="dnaLabel"
                  id="dnaSelect"
                  color="success"
                  value={dna}
                  onClick={() => setError({})}
                  onChange={(e) => {
                    setDna(e.target.value);
                  }}
                  label="DNA"
                  required={true}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

              <TextField
                onChange={(e) => {
                  setRingNo(e.target.value);
                  setError({});
                }}
                label="Ring number"
                value={ringNo}
                type="text"
                color="success"
                error={error.ringNo}
                style={{
                  width: "46.75%",
                  marginBottom: "12px",
                  marginLeft: "2.5%",
                }}
                required={false}
              />
              <TextField
                onChange={(e) => {
                  setPrice(e.target.value);
                  setError({});
                }}
                label="Price"
                type="number"
                color="success"
                value={price}
                style={{
                  width: "46.75%",
                  marginBottom: "12px",
                  marginLeft: "1.5%",
                }}
                required={true}
                error={error.price}
              />
              <TextField
                onChange={(e) => {
                  setPurchasedFrom(e.target.value);
                  setError({});
                }}
                type="text"
                color="success"
                label="Purchased from"
                style={{
                  width: "95%",
                  marginBottom: "12px",
                  marginLeft: "2.5%",
                }}
                error={error.purchasedFrom}
                required={true}
                value={purchasedFrom}
              />
              <TextField
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError({});
                }}
                color="success"
                label="Phone number"
                style={{
                  width: "49.75%",
                  marginBottom: "12px",
                  marginLeft: "2.5%",
                }}
                type="number"
                error={error.phone}
                value={phone}
                required={true}
              />
              <TextField
                readOnly={true}
                color="success"
                onClick={() => {
                  openDatePicker();
                  setError({});
                }}
                label="Date"
                value={date}
                style={{
                  width: "43.75%",
                  marginBottom: "12px",
                  marginLeft: "1.5%",
                }}
                inputProps={{ readOnly: true }}
                required={true}
                error={error.date}
                type="text"
              />
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div
                  style={{ width: "93%", marginBottom: "4px" }}
                  className="d-flex justify-content-center"
                >
                  <h5
                    className="text-muted"
                    style={{ fontFamily: "Titillium Web", fontSize: "19px" }}
                  >
                    Image
                    <span style={{ fontSize: "14px" }}>(optional)&nbsp;</span>
                    :&nbsp;
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
                            color: "#c9b233",
                            marginTop: "1px",
                            fontFamily: "Titillium Web",
                          }
                    }
                  >
                    {selectedImage[0]?.name ? (
                      <span
                        className="imgLink"
                        onClick={() => {
                          document.getElementById("addBirdImage")?.click();
                        }}
                      >
                        {selectedImage[0]?.name}
                      </span>
                    ) : (
                      "not selected"
                    )}
                  </span>
                </div>
                {isLoading && selectedImage.length >= 1 ? (
                  <LoadingBar value={Number(uploadProgress)} width="80%" />
                ) : (
                  <div>
                    <button
                      className={`btn btn-outline-success btn-sm mx-2 ${
                        isLoading && "disabled"
                      }`}
                      onClick={() => {
                        document.getElementById("imagesInputSelect").click();
                      }}
                    >
                      Choose Image
                    </button>
                    <button
                      className={`btn btn-outline-danger btn-sm mx-2 ${
                        isLoading && "disabled"
                      }`}
                      onClick={() => {
                        selectedImgURL = "";
                        setSelectedImage([]);
                      }}
                    >
                      Clear Image
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <ImageViewer ID="addBirdImage" showChildren={false}>
                <img
                  src={
                    selectedImgURL !== ""
                      ? selectedImgURL
                      : /* "blob:" +
                          process.env.REACT_APP_FRONTEND_BASE_URL + */
                        ""
                  }
                  alt=" Loading..."
                />
              </ImageViewer>
            </div>
          </DialogContent>
          <DialogActions sx={{ height: "65px" }}>
            <Button
              startIcon={<UploadIcon />}
              sx={{ fontSize: "14px" }}
              autoFocus
              disabled={isLoading}
              variant="outlined"
              size="medium"
              onClick={handleImageUploadOptimized}
            >
              Upload
            </Button>
            <Button
              sx={{ marginRight: "3.5%", fontSize: "14px" }}
              color="error"
              variant="outlined"
              disabled={isLoading}
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

      {datePickerOpen && (
        <Dialog
          sx={{ zIndex: 1300 }}
          open={datePickerOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeDatePicker}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DatePicker
              mode="date"
              range={range}
              handleSelect={handleDatePickerChange}
            />
          </DialogContent>
          <DialogActions>
            <div
              className="btn btn-primary"
              onClick={() => {
                setDate(format(range, "dd-MMM-yy"));
                setDatePickerOpen(false);
              }}
            >
              Select
            </div>
            <div
              className="btn btn-outline-danger"
              onClick={() => {
                if (date !== "" && date !== null && date !== undefined) {
                  handleDatePickerChange(parse(date, "dd-MMM-yy", new Date()));
                } else {
                  handleDatePickerChange(new Date());
                }
                setDatePickerOpen(false);
              }}
            >
              Cancel
            </div>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AddBird;
