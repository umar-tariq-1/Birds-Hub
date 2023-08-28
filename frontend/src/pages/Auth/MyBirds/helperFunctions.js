import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { format, parse } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const todayDate = new Date();

const exportToPDF = (rows, columns) => {
  const doc = new jsPDF();
  const tableData = rows.map((row) => Object.values(row.original));
  const tableHeaders = columns.map((c) => c.header);

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
  });

  doc.save("myBirds Record.pdf");
};
const exportToExcel = async (rowModels, fileName) => {
  const fileType =
    "application/vnd.openxmlformats.officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";
  let maxNameWidth = 0;
  const maxColumnWidths = {};

  const excelData = [];
  rowModels.map((row, index) => {
    return (excelData[index] = {
      ID: index + 1,
      ...(({ _id, image, ...rest }) => rest)(row?.original),
    });
  });

  excelData.forEach((item) => {
    if (item.name && item.name.length > maxNameWidth) {
      maxNameWidth = item.name.length;
    }
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
      const cellValue = item[key]?.toString();
      let spaces = 0;
      for (let i = 0; i < cellValue.length; i++) {
        if (cellValue[i] === " ") {
          spaces++;
        }
      }
      if (
        !maxColumnWidths[key] ||
        cellValue.length - spaces > maxColumnWidths[key]
      ) {
        maxColumnWidths[key] = cellValue.length - spaces;
      }
    }
    if (maxColumnWidths.gender <= 6) {
      maxColumnWidths.gender = 6;
    }
    if (maxColumnWidths.purchasedFrom <= 15) {
      maxColumnWidths.purchasedFrom = 15;
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
    alignment: { horizontal: "center" },
  };

  headerCells.forEach((cell) => {
    ws[cell].s = headerStyle;
  });

  // Apply the alignment style to all cells in the worksheet
  for (const cellAddress in ws) {
    if (
      cellAddress.startsWith("A") ||
      cellAddress.startsWith("C") ||
      cellAddress.startsWith("D")
    ) {
      // Adjust the column letter if needed
      if (cellAddress[1] === "1") {
        continue;
      }
      ws[cellAddress].s = {
        alignment: { horizontal: "center" },
      };
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

const getTrueObject = (number) => {
  const result = {};
  for (let i = 0; i < number; i++) {
    result[i] = true;
  }
  return result;
};

export const exportPDF = (table, columns, handleMenuClose) => {
  exportToPDF(table.getPrePaginationRowModel().rows, columns);
  handleMenuClose();
};
export const exportSelectedPDF = (table, columns, handleMenuClose) => {
  exportToPDF(table.getSelectedRowModel().rows, columns);
  handleMenuClose();
};
export const exportXLS = (table, handleMenuClose) => {
  exportToExcel(table.getPrePaginationRowModel().rows, "myBirds Record");
  //Exporting logic here
  handleMenuClose();
};
export const exportSelectedXLS = (table, handleMenuClose) => {
  exportToExcel(table.getSelectedRowModel().rows, "myBirds Record");
  //Exporting logic here
  handleMenuClose();
};
export const selectAll = (table, setRowSelection, handleMenuClose) => {
  setRowSelection(getTrueObject(table.getPrePaginationRowModel().rows.length));
  handleMenuClose();
};
export const unselectAll = (setRowSelection, handleMenuClose) => {
  setRowSelection({});
  handleMenuClose();
};

export const filterFn = (row, _columnIds, filterValue) =>
  Object.keys(filterValue).length === 0 ||
  (filterValue?.to === undefined && filterValue?.from === undefined) ||
  (parse(row.getValue("date"), "dd-MMM-yy", todayDate).getTime() >=
    filterValue.from &&
    parse(row.getValue("date"), "dd-MMM-yy", todayDate).getTime() <=
      filterValue.to);
export const sortingFn = (rowA, rowB, columnId) =>
  parse(rowA.getValue(columnId), "dd-MMM-yy", todayDate).getTime() >
  parse(rowB.getValue(columnId), "dd-MMM-yy", todayDate).getTime()
    ? 1
    : parse(rowA.getValue(columnId), "dd-MMM-yy", todayDate).getTime() <
      parse(rowB.getValue(columnId), "dd-MMM-yy", todayDate).getTime()
    ? -1
    : 0;
