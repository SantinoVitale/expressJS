import multer from "multer";
import { __dirname } from "./dirname.js";

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    console.log(req.files[0].fieldname.split("-")[1]);
    cb(null,__dirname+ "/../public/documents/"+req.files[0].fieldname.split("-")[1]);
  },
  filename: function(req, file, cb){
    // Obtener el ID del usuario desde la ruta
    const userId = req.params.uid;
    // Obtener el nombre original del archivo
    const originalName = file.originalname;
    // Generar el nuevo nombre de archivo con el formato "IDUsuario-NombreArchivo"
    const newFileName = `${userId}-${originalName}`;
    cb(null, newFileName)
  }
})

export const uploader = multer({storage});