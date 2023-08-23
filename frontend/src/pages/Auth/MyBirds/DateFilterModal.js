import React, { useState, forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  Slide,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  DialogActions,
} from "@mui/material";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const todayDate = new Date();
const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const yearsArray = Array.from(
  { length: todayDate.getFullYear() - 1969 },
  (_, index) => Number(todayDate.getFullYear() - index)
);

const DateFilterModal = (props) => {
  const [month, setMonth] = useState(todayDate.getMonth());
  const [year, setYear] = useState(todayDate.getFullYear());
  const [range, setRange] = useState({});

  const handleSelect = (selectedRange) => {
    if (!selectedRange?.to) {
      setRange({ from: selectedRange?.from, to: selectedRange?.from });
    } else {
      setRange(selectedRange);
    }
  };
  const handleYearChange = (e) => {
    if (e.target.value === "") {
      setYear(todayDate.getFullYear());
    } else {
      setYear(e.target.value);
    }
  };
  const handleMonthChange = (e) => {
    if (e.target.value === "") {
      setMonth(todayDate.getMonth());
    } else {
      setMonth(e.target.value);
    }
  };

  let footer = <></>;
  if (range?.from) {
    footer = (
      <div
        className="w-100 d-flex justify-content-evenly align-items-center mt-3"
        style={{ color: "darkgreen", fontSize: "18px" }}
      >
        {range?.from === range?.to ? (
          <p>{format(range.from, "dd-MMM-yy")}</p>
        ) : (
          <>
            <p>{format(range.from, "dd-MMM-yy")}</p>
            <p>to</p>
            <p>{format(range.to, "dd-MMM-yy")}</p>
          </>
        )}
      </div>
    );
  } else {
    footer = (
      <div
        className="w-100 d-flex justify-content-evenly align-items-center mt-3"
        style={{ color: "darkgreen", fontSize: "18px" }}
      >
        <p>Please pick the range...</p>
      </div>
    );
  }

  const { tableInstanceRef, open, handleClose } = props;

  return (
    <Dialog
      sx={{ zIndex: 1300 }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="d-flex align-items-center justify-content-center">
          <DayPicker
            id="rangeFilter"
            mode="range"
            selected={range}
            footer={footer}
            defaultMonth={new Date(year, month)}
            month={new Date(year, month)}
            disableNavigation={true}
            onSelect={handleSelect}
          />
        </div>
        <div className="d-flex w-100 justify-content-evenly align-items-center">
          <FormControl size="small">
            <InputLabel id="monthLabel">Month</InputLabel>
            <Select
              labelId="monthLabel"
              id="monthSelect"
              value={month}
              onChange={handleMonthChange}
              label="Month"
              sx={{ width: 120 }}
            >
              <MenuItem sx={{ backgroundColor: "lightgrey" }} value="">
                <em>
                  <b>Current Month</b>
                </em>
              </MenuItem>
              {monthsArray.map((value, index) => {
                return (
                  <MenuItem key={value} value={index}>
                    {value.toLocaleString()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="yearLabel">Year</InputLabel>
            <Select
              labelId="yearLabel"
              id="yearSelect"
              value={year}
              onChange={handleYearChange}
              label="Year"
              sx={{ width: 120 }}
            >
              <MenuItem
                sx={{ backgroundColor: "lightgrey" }}
                value=""
              ></MenuItem>
              {yearsArray.map((value) => {
                return (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <div
          className="btn btn-outline-danger"
          onClick={() => {
            // setRange({});
            handleClose();
          }}
        >
          Close
        </div>
        <div
          className="btn btn-outline-success"
          onClick={() => {
            tableInstanceRef.current.getColumn("date").setFilterValue({});
            setRange({});
          }}
        >
          Reset Filter
        </div>
        <div
          className="btn btn-primary"
          onClick={() => {
            tableInstanceRef.current.getColumn("date").setFilterValue(range);
            handleClose();
          }}
        >
          Apply
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DateFilterModal;
