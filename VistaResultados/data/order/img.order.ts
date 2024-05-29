import * as fs from "fs";
import * as path from "path";

const directoryPath = "./img";

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error al leer el directorio:", err);
    return;
  }

  files.forEach((file) => {
    const oldPath = path.join(directoryPath, file);
    const fileExtension = path.extname(file);
    const fileNameWithoutExtension = path.basename(file, fileExtension);
    const fileNameParts = fileNameWithoutExtension.split(" ");

    let dni = "";
    const lastPart = fileNameParts.pop() ?? "";
    if (/^\d+$/.test(lastPart)) {
      dni = lastPart;
    } else {
      fileNameParts.push(lastPart);
    }

    const lastName = fileNameParts.shift();
    const firstName = fileNameParts.join(" ");

    const newFileName = dni
      ? `${firstName.charAt(0).toUpperCase()}${removeAccents(
          firstName.slice(1)
        ).toLowerCase()}_${removeAccents(
          lastName ?? ""
        ).toLowerCase()}${fileExtension}`
      : `${firstName.charAt(0).toUpperCase()}${removeAccents(
          firstName.slice(1)
        ).toLowerCase()}_${removeAccents(
          lastName ?? ""
        ).toLowerCase()}${fileExtension}`;
    const newPath = path.join(directoryPath, newFileName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error al renombrar ${file}:`, err);
      } else {
        console.log(`${file} renombrado a ${newFileName}`);
      }
    });
  });
});
