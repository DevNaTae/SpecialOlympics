import * as XLSX from "xlsx";
import * as fs from "fs";

const convertExcelToJson = (filePath: string): any[] => {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  return jsonData;
};

const jsonData = "./datos.xlsx";
const newJsonData = convertExcelToJson(jsonData);
fs.writeFileSync(
  "./1-sport_Category_ordered.json",
  JSON.stringify(newJsonData, null, 2)
);
