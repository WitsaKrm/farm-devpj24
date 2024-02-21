import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = "xlsx";

const ExportExcel = ({ excelData, fileName ,classIcon}) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: fileExtension,
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  };

  return (
    <>
    <i
      className={classIcon}
      onClick={exportToExcel}
      title="Export to Excel"
      data-toggle="tooltip"
    >
      <i className="material-icons">insert_drive_file</i>
    </i>
  </>
  );
};

export default ExportExcel;
