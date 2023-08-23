import React, { useState, useMemo, useRef } from "react";

import AddBird from "./AddBird";
import { MaterialReactTable } from "material-react-table";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import "react-day-picker/dist/style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@mui/material";
import CustomMenu from "./CustomMenu";
import { filterFn, sortingFn } from "./helperFunctions";
import DateFilterModal from "./DateFilterModal";

const data = [
  {
    name: "Parblue",
    price: 25000,
    date: "5-Aug-23",
  },
  { name: "Arif", price: 20000, date: "15-Aug-23" },
  { name: "Arif", price: 19000, date: "10-Aug-23" },
  { name: "Arif", price: 25000, date: "19-Aug-23" },
];

const MyBirds = () => {
  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [parent] = useAutoAnimate({ duration: 500 });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
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
        filterFn,
        sortingFn,
      },
    ],
    []
  );

  return (
    <ResponsiveDrawer MyBirds={1}>
      <AddBird />
      {/* <CustomLoadingAnimation /> */}
      <div className="py-2 px-1">
        <MaterialReactTable
          columns={columns}
          data={data}
          tableInstanceRef={tableInstanceRef}
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
          muiTableBodyProps={{ ref: parent }}
          muiTableHeadRowProps={{ ref: parent }}
          enableGlobalFilter={true}
          enableColumnDragging={false}
          enableGrouping={true}
          onShowColumnFiltersChange={() => {
            tableInstanceRef.current.resetColumnFilters();
            setShowColumnFilters(!showColumnFilters);
          }}
          muiTableBodyRowProps={({ row }) => ({
            ref: parent,
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
          initialState={{
            showColumnFilters,
          }}
          state={{
            showColumnFilters,
            rowSelection,
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <CustomMenu
                table={table}
                setRowSelection={setRowSelection}
                columns={columns}
              />
            );
          }}
        />
      </div>

      <DateFilterModal
        tableInstanceRef={tableInstanceRef}
        open={open}
        handleClose={handleClose}
      />
    </ResponsiveDrawer>
  );
};

export default MyBirds;
