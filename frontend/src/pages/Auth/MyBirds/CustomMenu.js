import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa6";
import {
  selectAll,
  unselectAll,
  exportXLS,
  exportPDF,
  exportSelectedPDF,
  exportSelectedXLS,
} from "./helperFunctions";
import { IconButton, Tooltip, MenuItem } from "@mui/material";

const CustomMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { table, setRowSelection, columns } = props;

  return (
    <div>
      <Tooltip arrow title="More Options">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={menuOpen ? "long-menu" : undefined}
          aria-expanded={menuOpen ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleMenuIconClick}
        >
          <MoreVertIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: "28ch",
          },
        }}
      >
        {!table.getSelectedRowModel().rows.length === 0 ? (
          <MenuItem
            sx={{ height: "4.55ch" }}
            disableRipple
            // selected={option === "Pyxis"}
            onClick={() => {
              unselectAll(setRowSelection, handleMenuClose);
            }}
          >
            <CheckBoxOutlineBlankIcon fontSize="medium" />
            <p style={{ fontSize: "18px", margin: "0px 0px 0px 10px" }}>
              Unselect All
            </p>
          </MenuItem>
        ) : (
          <MenuItem
            sx={{ height: "4.55ch" }}
            disableRipple
            // selected={option === "Pyxis"}
            onClick={() => {
              selectAll(table, setRowSelection, handleMenuClose);
            }}
          >
            <CheckBoxIcon fontSize="medium" />
            <p style={{ fontSize: "18px", margin: "0px 0px 0px 10px" }}>
              Select All
            </p>
          </MenuItem>
        )}
        <MenuItem
          sx={{ height: "4.55ch" }}
          disableRipple
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          // selected={option === "Pyxis"}
          onClick={() => {
            exportPDF(table, columns, handleMenuClose);
          }}
        >
          <GetAppIcon fontSize="medium" />
          <p style={{ fontSize: "18px", margin: "0px 0px 2px 10px" }}>
            Export PDF
          </p>
        </MenuItem>
        <MenuItem
          sx={{ height: "4.55ch" }}
          disableRipple
          disabled={table.getSelectedRowModel().rows.length === 0}
          // selected={option === "Pyxis"}
          onClick={() => {
            exportSelectedPDF(table, columns, handleMenuClose);
          }}
        >
          <FaFilePdf size={21} style={{ marginLeft: "3px" }} />
          <p
            style={{
              fontSize: "18px",
              margin: "0px 0px 2px 10px",
              marginLeft: "10px",
            }}
          >
            Export Selected rows
          </p>
        </MenuItem>
        <MenuItem
          sx={{ height: "4.55ch" }}
          disableRipple
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          // selected={option === "Pyxis"}
          onClick={() => {
            exportXLS(table, handleMenuClose);
          }}
        >
          <GetAppIcon fontSize="medium" />
          <p style={{ fontSize: "18px", margin: "0px 0px 2px 10px" }}>
            Export Excel
          </p>
        </MenuItem>
        <MenuItem
          sx={{ height: "4.55ch" }}
          disableRipple
          disabled={table.getSelectedRowModel().rows.length === 0}
          // selected={option === "Pyxis"}
          onClick={() => {
            exportSelectedXLS(table, handleMenuClose);
          }}
        >
          <FaFileExcel size={21} style={{ marginLeft: "3px" }} />
          <p
            style={{
              fontSize: "18px",
              margin: "0px 0px 2px 10px",
              marginLeft: "10px",
            }}
          >
            Export Selected rows
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomMenu;
