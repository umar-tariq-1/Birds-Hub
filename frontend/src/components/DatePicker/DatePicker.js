import React, { useState } from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

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

function DatePicker(props) {
  const [month, setMonth] = useState(todayDate.getMonth());
  const [year, setYear] = useState(todayDate.getFullYear());

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

  const { range, handleSelect, mode } = props;

  let footer = <></>;
  if (mode === "range" && range?.from) {
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
  } else if (mode === "date") {
    footer = (
      <div
        className="w-100 d-flex justify-content-evenly align-items-center mt-3"
        style={{ color: "darkgreen", fontSize: "18px" }}
      >
        <p>{format(range, "dd-MMM-yy")}</p>
      </div>
    );
  } else {
    footer = (
      <div
        className="w-100 d-flex justify-content-evenly align-items-center mt-3"
        style={{ color: "darkgreen", fontSize: "18px" }}
      >
        <p>Please pick the {mode}...</p>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <DayPicker
          id={mode === "range" ? "rangeFilter" : "dateSelector"}
          mode={mode === "range" ? mode : "single"}
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
    </>
  );
}

export default DatePicker;
