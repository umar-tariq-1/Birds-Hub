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
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent sx={{ pb: { xs: 1, md: 2 } }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {deleteItem}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: 2, pb: 2 }}>
          <Button variant="outlined" onClick={handleAlertDialogClose} autoFocus>
            Cancel
          </Button>
          <Button
            // sx={{ marginRight: "12px" }}
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
