import React, { useState, useMemo, useRef } from "react";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MaterialReactTable } from "material-react-table";

function BreedRecord(props) {
  const tableInstanceRef = useRef(null);
  const [parent] = useAutoAnimate({ duration: 500 });

  const columns = useMemo(
    () => [{ accessorKey: "clutchNo", header: "Clutch" }],
    []
  );

  return (
    <>
      <ResponsiveDrawer active={{ BreedRecord: true }}>
        <div className="py-2 px-1">
          <MaterialReactTable
            columns={columns}
            data={{}}
            tableInstanceRef={tableInstanceRef}
            enablePinning={true}
            positionGlobalFilter="right"
            enableBottomToolbar={false}
            enablePagination={false}
            enableStickyHeader={true}
            enableRowNumbers={false}
            enableFullScreenToggle={true}
            enableColumnFilters={false}
            enableColumnResizing={true}
            enableGlobalFilterRankedResults={true}
            selectAllMode="all"
            muiTableBodyProps={{ ref: parent }}
            muiTableHeadRowProps={{ ref: parent }}
            enableGlobalFilter={true}
            enableColumnDragging={false}
            enableGrouping={true}
            enableDensityToggle={false}
            muiTableHeadCellProps={{
              sx: {
                fontWeight: "bold",
                fontSize: "19px",
                backgroundColor: "rgb(182,251,203)",
                userSelect: "none",
              },
              style: { paddingTop: "14px", paddingBottom: "8px" },
            }}
            muiTableBodyCellProps={{
              sx: {
                fontSize: "17px",
                userSelect: "none",
              },
            }}
          />
        </div>
      </ResponsiveDrawer>
    </>
  );
}

export default BreedRecord;
