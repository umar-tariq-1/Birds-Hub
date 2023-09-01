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
import { enqueueSnackbar } from "notistack";
import UpdateBird from "./UpdateBird";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArticleIcon from "@mui/icons-material/Article";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteAlertDialog from "../../../components/DeleteAlertDialog/DeleteAlertDialog";
import CustomLoadingAnimation from "../../../components/LoadingAnimation/loadingAnimation";

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

var editableRow = {};
var passUpdateData = {
  name: "",
  price: "",
  gender: "",
  status: "",
  dna: "",
  ringNo: "",
  date: format(new Date(), "dd-MMM-yy"),
  purchasedFrom: "",
  phone: "",
  image: { name: "" },
  _id: "",
};

const MyBirds = () => {
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [addBirdOpen, setAddBirdOpen] = useState(false);
  const [updateBirdOpen, setUpdateBirdOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: null,
    y: null,
  });
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [parent] = useAutoAnimate({ duration: 500 });
  const navigate = useNavigate();

  const handleAlertDialogOpen = () => {
    setAlertDialogOpen(true);
  };

  const handleAlertDialogClose = () => {
    setAlertDialogOpen(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    setContextMenuPosition({ x, y });
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition({ x: null, y: null });
    setRowSelection({});
  };

  const handleDeleteBird = async () => {
    setShowLoadingAnimation(true);
    try {
      await axios.delete(
        process.env.REACT_APP_BASE_URL + `/deleteBird/${passUpdateData?._id}`
      );
      setShowLoadingAnimation(true);
      enqueueSnackbar("Bird deleted successfully", { variant: "success" });
    } catch (error) {
      setShowLoadingAnimation(false);
      enqueueSnackbar(
        error?.response?.data?.message || "Server not working. Try again later",
        { variant: "error" }
      );
      return;
    }
  };

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
      enqueueSnackbar("Data refreshed successfully", {
        variant: "success",
        autoHideDuration: 1750,
      });
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Coulnot refresh data",
        {
          variant: "error",
        }
      );
      const errors = [
        "Sorry, didn't get cookie in request",
        "Sorry, you are not authorized for this ",
        "Access token expired. Please login again!",
        "Sorry, you are not logged in for this",
      ];
      if (errors.includes(error?.response?.data?.message)) {
        localStorage.setItem(
          "isLoggedIn",
          JSON.stringify(error?.response?.data?.isLoggedIn)
        );
        localStorage.setItem("tokenExpirationTime", JSON.stringify(null));
        localStorage.setItem("birds", "[]");
        navigate("/login");
      }
    },
    keepPreviousData: true,
  });

  const handleClickOpen = () => {
    setDateFilterOpen(true);
  };
  const handleClose = () => {
    setDateFilterOpen(false);
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
      {showLoadingAnimation && <CustomLoadingAnimation />}
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
            onContextMenu: (e) => {
              editableRow = row;
              setRowSelection({
                [row.id]: true,
              });
              handleContextMenu(e);
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
      {addBirdOpen && (
        <AddBird
          addBirdOpen={addBirdOpen}
          setAddBirdOpen={setAddBirdOpen}
          refetch={refetch}
        />
      )}
      {updateBirdOpen && (
        <UpdateBird
          setUpdateBirdOpen={setUpdateBirdOpen}
          updateBirdOpen={updateBirdOpen}
          refetch={refetch}
          data={passUpdateData}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
      )}
      {dateFilterOpen && (
        <DateFilterModal
          tableInstanceRef={tableInstanceRef}
          open={dateFilterOpen}
          handleClose={handleClose}
        />
      )}
      {alertDialogOpen && (
        <DeleteAlertDialog
          open={alertDialogOpen}
          handleAlertDialogClose={handleAlertDialogClose}
          deleteFn={handleDeleteBird}
          deleteItem={`the bird ${passUpdateData?.name}`}
        />
      )}

      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{
          top: contextMenuPosition.y,
          left: contextMenuPosition.x,
        }}
        open={Boolean(
          contextMenuPosition.x !== null && contextMenuPosition.y !== null
        )}
        onClose={handleCloseContextMenu}
      >
        <Paper elevation={0} sx={{ width: 230, maxWidth: "100%" }}>
          <MenuItem
            sx={{ height: "45px" }}
            onClick={() => {
              passUpdateData = JSON.parse(localStorage.getItem("birds"))[
                editableRow?.id
              ];
              handleCloseContextMenu();
              setViewMode(true);
              setUpdateBirdOpen(true);
            }}
          >
            <ListItemIcon>
              <ArticleIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>View Bird Data</ListItemText>
          </MenuItem>
          <MenuItem
            sx={{ height: "45px" }}
            onClick={() => {
              passUpdateData = JSON.parse(localStorage.getItem("birds"))[
                editableRow?.id
              ];
              handleCloseContextMenu();
              setUpdateBirdOpen(true);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Edit Bird Data</ListItemText>
          </MenuItem>
          <MenuItem
            sx={{ height: "45px" }}
            onClick={() => {
              handleAlertDialogOpen();
              passUpdateData = JSON.parse(localStorage.getItem("birds"))[
                editableRow?.id
              ];
              handleCloseContextMenu();
            }}
          >
            <ListItemIcon>
              <DeleteIcon color="error" fontSize="medium" />
            </ListItemIcon>
            <ListItemText sx={{ color: "red" }}>Delete Bird Data</ListItemText>
          </MenuItem>
        </Paper>
      </Menu>
    </ResponsiveDrawer>
  );
};

export default MyBirds;
