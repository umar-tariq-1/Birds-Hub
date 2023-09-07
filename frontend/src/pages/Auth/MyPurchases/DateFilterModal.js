import React, { useState, forwardRef } from "react";
import { Dialog, DialogContent, Slide, DialogActions } from "@mui/material";
import DatePicker from "../../../components/DatePicker/DatePicker";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DateFilterModal = (props) => {
  const [range, setRange] = useState({});

  const handleSelect = (selectedRange) => {
    if (range.to !== range.from) {
      if (
        selectedRange?.to !== undefined &&
        selectedRange?.from !== undefined
      ) {
        if (selectedRange.from && selectedRange.from !== range.from) {
          setRange({ from: selectedRange.from, to: selectedRange.from });
        }
        if (selectedRange.to && selectedRange?.to !== range.to) {
          setRange({ from: selectedRange.to, to: selectedRange.to });
        }
      }
    } else if (!selectedRange?.to) {
      setRange({ from: selectedRange?.from, to: selectedRange?.from });
    } else {
      setRange(selectedRange);
    }
  };

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
        <DatePicker mode="range" range={range} handleSelect={handleSelect} />
      </DialogContent>
      <DialogActions>
        <div
          className="btn btn-outline-danger"
          onClick={() => {
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
