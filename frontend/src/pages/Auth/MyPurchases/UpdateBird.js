import React, { useEffect, useState, forwardRef } from "react";
import "./MyPurchases.css";
import axios from "axios";
import LoadingBar from "../../../components/LoadingBar/LoadingBar";
import CustomLoadingAnimation from "../../../components/LoadingAnimation/loadingAnimation";
import { useSnackbar } from "notistack";
import { trimObject } from "../../../utils/objectFunctiions/trimObject";
import { findKeyWithEmptyStringValue } from "../../../utils/objectFunctiions/findKeyWithEmptyStringValue";
import { ImageViewer } from "../../../components/ImageViewer/ImageViewer";
import { capitalize } from "../../SignUp/Validation";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
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

function UpdateBird(props) {
  const { data } = props;

  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [status, setStatus] = useState(data.status);
  const [purchasedFrom, setPurchasedFrom] = useState(data.purchasedFrom);
  const [phone, setPhone] = useState(data.phone);
  const [price, setPrice] = useState(data.price);
  const [ringNo, setRingNo] = useState(data.ringNo);
  const [dna, setDna] = useState(data.dna);
  const [error, setError] = useState({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [date, setDate] = useState(data.date);
  const [range, setRange] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [cashedImgURL, setCashedImgURL] = useState("");

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

  useEffect(() => {
    setName(data.name);
    setGender(data.gender);
    setStatus(data.status);
    setPurchasedFrom(data.purchasedFrom);
    setPhone(data.phone);
    setPrice(data.price);
    setDna(data.dna);
    setDate(data.date);
    setRingNo(data.ringNo);
    setRange(new Date());
  }, [data]);

  useEffect(() => {
    setRange(parse(date, "dd-MMM-yy", new Date())); // eslint-disable-next-line
  }, [datePickerOpen]);

  useEffect(() => {
    fetch(`https://ik.imagekit.io/umartariq/birdImages/${data?.image?.name}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setCashedImgURL(imageUrl);
        localStorage.setItem("cachedImgURL", imageUrl);
      }); //eslint-disable-next-line
  }, []);

  const { updateBirdOpen, setUpdateBirdOpen, refetch, viewMode, setViewMode } =
    props;

  const closeUpdateBird = () => {
    setUpdateBirdOpen(false);
    setViewMode(false);
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
    if (updateBirdOpen && e.key === "Enter") {
      handleImageUploadOptimized();
    }
  };

  const handleImageUploadOptimized = async () => {
    const jsonData = trimObject({
      name,
      gender: gender[0],
      status: status[0],
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

    var deletedSomething = false;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "status" || key === "gender") {
          if (data[key][0] === jsonData[key][0]) {
            delete jsonData[key];
            deletedSomething = true;
          }
        } else if (data[key] === jsonData[key]) {
          delete jsonData[key];
          deletedSomething = true;
        }
      }
    }

    // if (selectedImage.length === 1) {

    try {
      if (
        (deletedSomething && Object.keys(jsonData).length >= 1) ||
        selectedImage.length >= 1
      ) {
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

        formData.append("data", JSON.stringify(jsonData));
        const url = process.env.REACT_APP_BASE_URL + `/updateBird/${data._id}`;
        await axios.put(url, formData, config);
        setShowLoadingAnimation(false);
        setIsLoading(false);
        setUpdateBirdOpen(false);
        enqueueSnackbar("Bird data updated successfully", {
          variant: "success",
        });
        setUploadProgress(0);
        setEdit(false);
        refetch();
        return;
      } else {
        enqueueSnackbar("No field was updated", { variant: "warning" });
        setEdit(false);
        setUpdateBirdOpen(false);
        return;
      }
    } catch (error) {
      setUploadProgress(0);
      setShowLoadingAnimation(false);
      setIsLoading(false);
      setEdit(false);
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
  }, [updateBirdOpen]);

  return (
    <>
      {showLoadingAnimation && <CustomLoadingAnimation />}

      <input
        id="imageUpdateSelect"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="d-none"
      />

      <div>
        {updateBirdOpen && (
          <BootstrapDialog
            sx={{ zIndex: 1299 }}
            onClose={closeUpdateBird}
            aria-labelledby="customized-dialog-title"
            open={updateBirdOpen}
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
              &nbsp;&nbsp;{viewMode ? "View Bird" : "Edit Bird"}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={closeUpdateBird}
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
                height: `${viewMode ? "392" : "441"}px`,
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
                  disabled={!edit && !viewMode}
                  type="text"
                  variant={viewMode ? "filled" : "outlined"}
                  inputProps={{ readOnly: !edit }}
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
                  variant={viewMode ? "filled" : "outlined"}
                  disabled={!edit && !viewMode}
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
                    inputProps={{ readOnly: !edit }}
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
                  variant={viewMode ? "filled" : "outlined"}
                  disabled={!edit && !viewMode}
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
                    inputProps={{ readOnly: !edit }}
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
                  variant={viewMode ? "filled" : "outlined"}
                  size="medium"
                  disabled={!edit && !viewMode}
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
                    inputProps={{ readOnly: !edit }}
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
                  variant={viewMode ? "filled" : "outlined"}
                  disabled={!edit && !viewMode}
                  type="text"
                  color="success"
                  inputProps={{ readOnly: !edit }}
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
                  variant={viewMode ? "filled" : "outlined"}
                  disabled={!edit && !viewMode}
                  type="number"
                  inputProps={{ readOnly: !edit }}
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
                  label="Purchased from"
                  disabled={!edit && !viewMode}
                  type="text"
                  variant={viewMode ? "filled" : "outlined"}
                  color="success"
                  style={{
                    width: "95%",
                    marginBottom: "12px",
                    marginLeft: "2.5%",
                  }}
                  inputProps={{ readOnly: !edit }}
                  error={error.purchasedFrom}
                  required={true}
                  value={purchasedFrom}
                />
                <TextField
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError({});
                  }}
                  label="Phone number"
                  variant={viewMode ? "filled" : "outlined"}
                  disabled={!edit && !viewMode}
                  color="success"
                  style={{
                    width: "49.75%",
                    marginBottom: "12px",
                    marginLeft: "2.5%",
                  }}
                  inputProps={{ readOnly: !edit }}
                  type="number"
                  error={error.phone}
                  value={phone}
                  required={true}
                />
                <TextField
                  color="success"
                  onClick={() => {
                    if (edit) {
                      openDatePicker();
                      setError({});
                    }
                  }}
                  variant={viewMode ? "filled" : "outlined"}
                  disabled={!edit && !viewMode}
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
                      {viewMode === false && (
                        <span style={{ fontSize: "14px" }}>
                          (optional)&nbsp;
                        </span>
                      )}
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
                            document.getElementById("updateBirdImage")?.click();
                          }}
                        >
                          {selectedImage[0]?.name}
                        </span>
                      ) : data?.image?.name !== "" ? (
                        <span
                          className="imgLink"
                          onClick={() => {
                            document.getElementById("updateBirdImage")?.click();
                          }}
                        >
                          {data?.name + ".jpg"}
                        </span>
                      ) : (
                        "not selected"
                      )}
                    </span>
                  </div>
                  {isLoading && selectedImage.length >= 1 ? (
                    <LoadingBar value={Number(uploadProgress)} width="80%" />
                  ) : (
                    viewMode === false && (
                      <div>
                        <button
                          className={`btn btn-outline-success btn-sm mx-2 ${
                            !edit && "disabled"
                          }`}
                          onClick={() => {
                            document
                              .getElementById("imageUpdateSelect")
                              .click();
                          }}
                        >
                          Choose Image
                        </button>
                        <button
                          className={`btn btn-outline-danger btn-sm mx-2 ${
                            !edit && "disabled"
                          }`}
                          onClick={() => {
                            selectedImgURL = "";
                            setSelectedImage([]);
                          }}
                        >
                          Clear Image
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <ImageViewer ID="updateBirdImage" showChildren={false}>
                  <img
                    src={selectedImgURL !== "" ? selectedImgURL : cashedImgURL}
                    alt=" Loading..."
                  />
                </ImageViewer>
              </div>
            </DialogContent>
            <DialogActions sx={{ height: "65px" }}>
              {viewMode === false && (
                <Button
                  startIcon={<SaveIcon />}
                  sx={{ fontSize: "14px" }}
                  disabled={isLoading || (!edit && !viewMode)}
                  autoFocus
                  variant="outlined"
                  size="medium"
                  onClick={handleImageUploadOptimized}
                >
                  Save
                </Button>
              )}
              {viewMode === false && (
                <Button
                  startIcon={<EditIcon />}
                  sx={{ fontSize: "14px" }}
                  disabled={isLoading}
                  color="warning"
                  variant="outlined"
                  size="medium"
                  onClick={() => setEdit(!edit)}
                >
                  Edit
                </Button>
              )}
              <Button
                sx={{ marginRight: "3.5%", fontSize: "14px" }}
                color="error"
                variant="outlined"
                size="medium"
                onClick={() => {
                  resetValues();
                  closeUpdateBird();
                }}
              >
                {viewMode ? "Close" : "Cancel"}
              </Button>
            </DialogActions>
          </BootstrapDialog>
        )}
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

export default UpdateBird;
