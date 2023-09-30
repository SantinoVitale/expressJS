import UsersDTO from "../dao/DTO/users.dto.js";
import { userModel } from "../dao/models/user.model.js";
import customError from "../errors/custom-error.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../utils/dirname.js";
import EErros from "../errors/enum.js"

class LoginController{
  register(req, res){
    return res.redirect("/profile")
  }

  login(req, res){
    req.session.user = {
      _id: req.user._id.toString(),
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      admin: req.user.admin,
    };

    return res.redirect("/vista/products");
  }

  githubCallback(req, res){
    req.session.user = req.user;
    return res.redirect("/vista/products")
  }

  current(req, res){
    const userDTO = new UsersDTO(req.user)
    return res.status(200).json({
      status: "success",
      msg: "datos de la sesion",
      payload: userDTO
    })
  }

  async setPremium(req, res){
    const { uid } = req.params;
    const result = await userModel.findOne({ _id: uid });

    const documentsPath = path.join(__dirname, "../public/documents/documents");
    const filesToCheck = ["identificacion", "comprobante_domicilio", "comprobante_cuenta"];

    const filesExist = filesToCheck.every((fileName) => {
      const files = fs.readdirSync(documentsPath);
      const fileExists = files.some((file) => file.startsWith(`${uid}-${fileName}`));
      return fileExists;
    });

    console.log(filesExist);

    if(result.role === "premium"){
      const setUser = await userModel.updateOne({_id: uid}, {role: "user"})
      return res.render("success", {message: "Usuario cambiado a user"})
    } else if(filesExist){
      const setPremium = await userModel.updateOne({_id: uid}, {role: "premium"})
      return res.render("success", {message: "Usuario cambiado a premium"})
    } else {
      req.logger.error("No se puede cambiar el rol al admin")
      return customError.createError({
        name: "User is admin",
        cause: "Cant change admin role",
        message: "Can´t change de admin role",
        code: EErros.USER_PERMISSION_ERROR
      })
    }
  }

  async postDocument(req, res) {
    if(!req.files || req.files.length === 0) return res.status(400).send({status: "error", error: "No se pudo guardar el archivo"})
    return res.render("success", {message: "Archivo subido con exito"})
  }
}

export const loginController = new LoginController()