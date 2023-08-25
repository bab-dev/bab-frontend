import { saveAs } from "file-saver";
import { exportVariables } from "variables/tableVariables";
import { utils, writeFile } from "xlsx";

function exportToExcel(data, fileName) {
  const fileFullName = `${fileName}.xlsx`;
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, exportVariables.SHEET_1);

  // Write the workbook to a file and save it
  const excelBuffer = writeFile(workbook, fileFullName, {
    bookType: "xlsx",
    type: "array",
  });
  const dataToExport = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(dataToExport, fileFullName);
}

export { exportToExcel };
