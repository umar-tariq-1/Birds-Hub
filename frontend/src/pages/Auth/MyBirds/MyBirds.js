import React, { useState, useMemo, useRef, useEffect } from "react";

import AddBird from "./AddBird";
import { MaterialReactTable } from "material-react-table";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import "react-day-picker/dist/style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomMenu from "./CustomMenu";
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
  "ringNo",
  "date",
  "purchasedFrom",
  "phone",
  "_id",
  "image",
];

const MyBirds = () => {
  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [parent] = useAutoAnimate({ duration: 500 });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
        // Cell: ({ cell }) =>
        //   cell.getValue().toLocaleString("en-US", {
        //     style: "currency",
        //     currency: "PKR",
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 0,
        //   }),
        filterVariant: "range-slider",
        filterFn: "betweenInclusive", // default (or between)
        // enableGlobalFilter: true,
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
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "ringNo",
        header: "Ring No.",
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
      {
        accessorKey: "purchasedFrom",
        header: "Purchased From",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
    ],
    []
  );

  return (
    <ResponsiveDrawer MyBirds={1}>
      <div className="mt-0">
        <AddBird />
      </div>
      {/* <CustomLoadingAnimation /> */}
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
