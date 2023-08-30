import React, { useState, useMemo, useRef } from "react";

import AddBird from "./AddBird";
import { MaterialReactTable } from "material-react-table";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import "react-day-picker/dist/style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomMenu from "./CustomMenu";
import AddIcon from "@mui/icons-material/Add";
import { filterFn, sortingFn } from "./helperFunctions";
import DateFilterModal from "./DateFilterModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { reorderKeys } from "../../../utils/objectFunctiions/reorderKeys";

const order = [
  "name",
  "price",
  "gender",
  "status",
  "dna",
  "ringNo",
  "date",
  "purchasedFrom",
  "phone",
  "_id",
  "image",
];

const MyBirds = () => {
  const [open, setOpen] = useState(false);
  const [addBirdOpen, setAddBirdOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [parent] = useAutoAnimate({ duration: 500 });

  const {
    isFetching,
    isLoading,
    data: responseData,
    refetch,
  } = useQuery({
    queryKey: ["birds"],
    queryFn: async () => {
      const url = process.env.REACT_APP_BASE_URL + "/getBirds";
      return await axios.get(url, {
        withCredentials: true,
      });
    },
    refetchOnWindowFocus: false,
    onSuccess: (responseData) => {
      localStorage.setItem(
        "birds",
        JSON.stringify(reorderKeys(responseData?.data?.orderedData, order))
      );
      console.log(responseData.data.orderedData);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
    keepPreviousData: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log();
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
        filterVariant: "range-slider",
        filterFn: "betweenInclusive", // default (or between)
        muiTableHeadCellFilterSliderProps: {
          min: 3000,
          max: 30000,
          marks: true,
          step: 1000,
          sx: { width: "95%", marginLeft: "-8px" },
        },
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 160,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "dna",
        header: "DNA",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue() ? <span>Yes</span> : <span>No</span>,
      },
      {
        accessorKey: "ringNo",
        header: "Ring No.",
        size: 170,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 140,
        Filter: () => (
          <div className="d-flex flex-column justify-content-between align-items-center w-100">
            <Button
              variant="outlined"
              size="small"
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
      {
        accessorKey: "purchasedFrom",
        header: "Purchased From",
        size: 245,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 180,
      },
    ],
    []
  );

  return (
    <ResponsiveDrawer MyBirds={1}>
      <AddBird
        addBirdOpen={addBirdOpen}
        setAddBirdOpen={setAddBirdOpen}
        refetch={refetch}
      />

      <div className="py-2 px-1">
        <MaterialReactTable
          columns={columns}
          data={
            reorderKeys(responseData?.data?.orderedData, order) === []
              ? reorderKeys(responseData?.data?.orderedData, order)
              : reorderKeys(JSON.parse(localStorage.getItem("birds")), order)
          }
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
            onDoubleClick: (rowDblClicked) => {
              tableInstanceRef.current.setEditingRow(row);
              setRowSelection({});
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
            isLoading: isLoading,
            showProgressBars: isFetching,
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <div className="d-flex flex-row">
                <CustomMenu
                  table={table}
                  setRowSelection={setRowSelection}
                  columns={columns}
                />
                <Tooltip arrow title="Refresh Data">
                  <IconButton onClick={() => refetch()}>
                    <RefreshIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title="Add Bird">
                  <IconButton onClick={() => setAddBirdOpen(true)}>
                    <AddIcon color="primary" fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </div>
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
