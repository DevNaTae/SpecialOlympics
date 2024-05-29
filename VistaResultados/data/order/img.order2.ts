import * as fs from "fs";
import * as path from "path";

// Función para renombrar archivos
const renameFiles = (directory: string): void => {
  // Leer todos los archivos en el directorio
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error leyendo el directorio ${directory}:`, err);
      return;
    }

    // Procesar cada archivo
    files.forEach((file) => {
      const oldPath = path.join(directory, file);

      // Verificar si el archivo tiene comas en el nombre
      if (file.includes(",")) {
        // Nuevo nombre sin comas
        const newFileName = file.replace(/,/g, "");
        const newPath = path.join(directory, newFileName);

        // Renombrar el archivo
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(
              `Error renombrando el archivo ${oldPath} a ${newPath}:`,
              err
            );
          } else {
            console.log(`Renombrado: ${oldPath} -> ${newPath}`);
          }
        });
      }
    });
  });
};

// Usar la función para renombrar archivos en el directorio deseado
const directoryPath = "./img"; // Reemplaza con la ruta de tu directorio
renameFiles(directoryPath);
