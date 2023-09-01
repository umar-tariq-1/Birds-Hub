import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ContextMenu({ x, y, onClose, row, handleUpdate }) {
  return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={{ top: y, left: x }}
      open={Boolean(x !== null && y !== null)}
      onClose={onClose}
    >
      <Paper elevation={0} sx={{ width: 230, maxWidth: "100%" }}>
        <MenuItem sx={{ height: "40px" }} onClick={handleUpdate(row)}>
          <ListItemIcon>
            <EditIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Edit Bird Data</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon color="error" fontSize="medium" />
          </ListItemIcon>
          <ListItemText sx={{ color: "red" }}>Delete Bird Data</ListItemText>
        </MenuItem>
      </Paper>
    </Menu>
  );
}

export default ContextMenu;
