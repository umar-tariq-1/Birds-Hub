import React, { useState, useMemo, useRef } from "react";
// import AddBird from "./AddBird";
import "./MyBirds.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { MaterialReactTable } from "material-react-table";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Menu from "@mui/material/Menu";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa6";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import {
  IconButton,
  Slide,
  Tooltip,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

const fileType =
  "application/vnd.openxmlformats.officedocument.spreadsheetml.sheet;charset-UTF-8";
const fileExtension = ".xlsx";
const exportToExcel = async (excelData, fileName) => {
  let maxNameWidth = 0;
  const maxColumnWidths = {};

  excelData.forEach((item) => {
    if (item.name && item.name.length > maxNameWidth) {
      maxNameWidth = item.name.length;
    }
    console.log(maxNameWidth);
  });

  const capitalizedData = excelData.map((item) => {
    const capitalizedItem = {};
    for (const key in item) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      capitalizedItem[capitalizedKey] = item[key];
    }
    return capitalizedItem;
  });

  const ws = XLSX.utils.json_to_sheet(capitalizedData);

  excelData.forEach((item) => {
    for (const key in item) {
      const cellValue = item[key].toString();
      if (!maxColumnWidths[key] || cellValue.length > maxColumnWidths[key]) {
        if (key === "name") {
          maxColumnWidths[key] = cellValue.length - 7;
        } else {
          maxColumnWidths[key] = cellValue.length;
        }
      }
    }
  });

  // Apply column widths
  const columnWidths = Object.keys(maxColumnWidths).map((key) => ({
    wch: maxColumnWidths[key] + 2, // Adding a buffer for cell padding
  }));

  ws["!cols"] = columnWidths;

  // Apply header style to header cells
  const headerCells = columnWidths.map((col, index) =>
    XLSX.utils.encode_cell({ c: index, r: 0 })
  );

  const headerStyle = {
    font: {
      name: "arial",
      sz: 13,
      bold: true,
      color: { rgb: "black" },
    },
  };

  headerCells.forEach((cell) => {
    ws[cell].s = headerStyle;
  });

  const alignmentStyle = {
    alignment: { horizontal: "left" },
  };

  // Apply the alignment style to all cells in the worksheet
  for (const cellAddress in ws) {
    if (cellAddress.startsWith("B")) {
      // Adjust the column letter if needed
      if (cellAddress === "B1") {
        continue;
      }
      ws[cellAddress].s = alignmentStyle;
    }
  }

  const wb = {
    Sheets: {
      [format(todayDate, "dd-MMM-yy", { useAdditionalWeekYearTokens: true })]:
        ws,
    },
    SheetNames: [
      format(todayDate, "dd-MMM-yy", { useAdditionalWeekYearTokens: true }),
    ],
  };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const Data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(Data, fileName + fileExtension);
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const data = [
  { name: "Parblue split palefellow red eye", price: 25000, date: "5-Aug-23" },
  { name: "Arif", price: 20000, date: "15-Aug-23" },
  { name: "Arif", price: 19000, date: "10-Aug-23" },
  { name: "Arif", price: 25000, date: "19-Aug-23" },
];

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

const MyBirds = () => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(todayDate.getMonth());
  const [year, setYear] = useState(todayDate.getFullYear());
  const [anchorEl, setAnchorEl] = useState(null);
  const [range, setRange] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [parent] = useAutoAnimate({ duration: 500 });
  const menuOpen = Boolean(anchorEl);

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (selectedRange) => {
    if (!selectedRange?.to) {
      setRange({ from: selectedRange?.from, to: selectedRange?.from });
    } else {
      setRange(selectedRange);
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
        // All of the options you can specify here
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 131,
        Cell: ({ cell }) =>
          cell.getValue().toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }),
        filterVariant: "range-slider",
        filterFn: "betweenInclusive", // default (or between)
        enableGlobalFilter: true,
        muiTableHeadCellFilterSliderProps: {
          min: 3000,
          max: 30000,
          marks: true,
          step: 1000,
          sx: { width: "95%", marginLeft: "-8px" },
          // valueLabelFormat: (value) =>
          //   value.toLocaleString("en-US", {
          //     style: "currency",
          //     currency: "PKR",
          //     minimumFractionDigits: 0,
          //     maximumFractionDigits: 0,
          //   }),
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        // Cell: ({ cell }) =>
        //   cell
        //     .getValue()
        //     .toLocaleString("en", {
        //       day: "2-digit",
        //       month: "short",
        //       year: "2-digit",
        //     })
        //     .replace(/,/g, ""),
        Filter: () => (
          <div className="d-flex flex-column justify-content-between align-items-center w-100">
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              className="mt-2"
            >
              Select range
            </Button>
          </div>
        ),
        filterFn: (row, _columnIds, filterValue) =>
          Object.keys(filterValue).length === 0 ||
          (filterValue?.to === undefined && filterValue?.from === undefined) ||
          (parse(row.getValue("date"), "dd-MMM-yy", todayDate).getTime() >=
            filterValue.from &&
            parse(row.getValue("date"), "dd-MMM-yy", todayDate).getTime() <=
              filterValue.to),
        sortingFn: (rowA, rowB, columnId) =>
          parse(rowA.getValue(columnId), "dd-MMM-yy", todayDate).getTime() >
          parse(rowB.getValue(columnId), "dd-MMM-yy", todayDate).getTime()
            ? 1
            : parse(rowA.getValue(columnId), "dd-MMM-yy", todayDate).getTime() <
              parse(rowB.getValue(columnId), "dd-MMM-yy", todayDate).getTime()
            ? -1
            : 0,
      },
    ],
    []
  );

  return (
    <ResponsiveDrawer MyBirds={1}>
      {/* <AddBird /> */}
      {/* <CustomLoadingAnimation /> */}
      <div className="py-2 px-1">
        <MaterialReactTable
          columns={columns}
          data={data}
          tableInstanceRef={tableInstanceRef}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () =>
              setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id],
              })),
            selected: rowSelection[row.id],
            sx: {
              cursor: "pointer",
            },
          })}
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              fontSize: "21px",
              backgroundColor: "rgb(182,251,203)",
              whiteSpace: "nowrap",
            },
            style: { paddingTop: "14px", paddingBottom: "8px" },
          }}
          muiTableBodyCellProps={{
            sx: {
              fontSize: "18px",
            },
          }}
          enablePinning={true}
          positionGlobalFilter="right"
          enableBottomToolbar={false}
          enablePagination={false}
          enableStickyHeader={true}
          enableRowNumbers={true}
          enableFullScreenToggle={true}
          enableColumnFilters={true}
          enableColumnResizing={true}
          enableGlobalFilterRankedResults={true}
          selectAllMode="all"
          onShowColumnFiltersChange={() => {
            tableInstanceRef.current.resetColumnFilters();
            setShowColumnFilters(!showColumnFilters);
          }}
          muiTableBodyProps={{ ref: parent }}
          enableGlobalFilter={true}
          enableColumnDragging={false}
          enableGrouping={true}
          initialState={{
            showColumnFilters,
          }}
          state={{
            showColumnFilters,
            rowSelection,
          }}
          renderTopToolbarCustomActions={() => {
            const getTrueObject = (number) => {
              const result = {};
              for (let i = 0; i < number; i++) {
                result[i] = true;
              }
              return result;
            };
            const handleExportPDF = (rows) => {
              const doc = new jsPDF();
              const tableData = rows.map((row) => Object.values(row.original));
              const tableHeaders = columns.map((c) => c.header);

              autoTable(doc, {
                head: [tableHeaders],
                body: tableData,
              });

              doc.save("myBirds Record.pdf");
            };
            const exportPDF = () => {
              handleExportPDF(
                tableInstanceRef.current.getPrePaginationRowModel().rows
              );
              handleMenuClose();
            };
            const exportSelectedPDF = () => {
              handleExportPDF(
                tableInstanceRef.current.getSelectedRowModel().rows
              );
              handleMenuClose();
            };
            const exportXLS = () => {
              exportToExcel(data, "myBirds Record");
              // console.log(JSON.stringify(data));
              //Exporting logic here
              handleMenuClose();
            };
            const exportSelectedXLS = () => {
              //Exporting logic here
              handleMenuClose();
            };
            const selectAll = () => {
              setRowSelection(
                getTrueObject(
                  tableInstanceRef.current.getPrePaginationRowModel().rows
                    .length
                )
              );
              handleMenuClose();
            };
            const unselectAll = () => {
              setRowSelection({});
              handleMenuClose();
            };
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
                      width: "25ch",
                    },
                  }}
                >
                  {tableInstanceRef.current.getIsAllRowsSelected() ? (
                    <MenuItem
                      sx={{ height: "4.55ch" }}
                      disableRipple
                      // selected={option === "Pyxis"}
                      onClick={unselectAll}
                    >
                      <CheckBoxOutlineBlankIcon fontSize="medium" />
                      <p
                        style={{ fontSize: "18px", margin: "0px 0px 0px 10px" }}
                      >
                        Unselect All
                      </p>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      sx={{ height: "4.55ch" }}
                      disableRipple
                      // selected={option === "Pyxis"}
                      onClick={selectAll}
                    >
                      <CheckBoxIcon fontSize="medium" />
                      <p
                        style={{ fontSize: "18px", margin: "0px 0px 0px 10px" }}
                      >
                        Select All
                      </p>
                    </MenuItem>
                  )}
                  <MenuItem
                    sx={{ height: "4.55ch" }}
                    disableRipple
                    disabled={
                      tableInstanceRef.current.getPrePaginationRowModel().rows
                        .length === 0
                    }
                    // selected={option === "Pyxis"}
                    onClick={exportPDF}
                  >
                    <GetAppIcon fontSize="medium" />
                    <p style={{ fontSize: "18px", margin: "0px 0px 2px 10px" }}>
                      Export PDF
                    </p>
                  </MenuItem>
                  <MenuItem
                    sx={{ height: "4.55ch" }}
                    disableRipple
                    disabled={
                      !tableInstanceRef.current.getIsSomeRowsSelected() &&
                      !tableInstanceRef.current.getIsAllRowsSelected()
                    }
                    // selected={option === "Pyxis"}
                    onClick={exportSelectedPDF}
                  >
                    <FaFilePdf size={21} style={{ marginLeft: "3px" }} />
                    <p
                      style={{
                        fontSize: "18px",
                        margin: "0px 0px 2px 10px",
                        marginLeft: "10px",
                      }}
                    >
                      Export Selected
                    </p>
                  </MenuItem>
                  <MenuItem
                    sx={{ height: "4.55ch" }}
                    disableRipple
                    disabled={
                      tableInstanceRef.current.getPrePaginationRowModel().rows
                        .length === 0
                    }
                    // selected={option === "Pyxis"}
                    onClick={exportXLS}
                  >
                    <GetAppIcon fontSize="medium" />
                    <p style={{ fontSize: "18px", margin: "0px 0px 2px 10px" }}>
                      Export Excel
                    </p>
                  </MenuItem>
                  <MenuItem
                    sx={{ height: "4.55ch" }}
                    disableRipple
                    disabled={
                      tableInstanceRef.current.getPrePaginationRowModel().rows
                        .length === 0
                    }
                    // selected={option === "Pyxis"}
                    onClick={exportXLS}
                  >
                    <FaFileExcel size={21} style={{ marginLeft: "3px" }} />
                    <p
                      style={{
                        fontSize: "18px",
                        margin: "0px 0px 2px 10px",
                        marginLeft: "10px",
                      }}
                    >
                      Export Selected
                    </p>
                  </MenuItem>
                </Menu>
              </div>
            );
          }}
        />
      </div>

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
    </ResponsiveDrawer>
  );
};

export default MyBirds;
