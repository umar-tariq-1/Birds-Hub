import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteAlertDialog({
  open,
  deleteFn,
  handleAlertDialogClose,
  deleteItem,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAlertDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {deleteItem}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleAlertDialogClose} autoFocus>
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              deleteFn();
              handleAlertDialogClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
