import UsersDTO from "../dao/DTO/users.dto.js";
import { userModel } from "../dao/models/user.model.js";
import customError from "../errors/custom-error.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../utils/dirname.js";
import EErros from "../errors/enum.js"
import { usersService } from "../service/users.service.js";
import moment from "moment-timezone";
import { sendMailTransport } from "../utils/mailTransport.js";
import { apiUrl } from "../app.js";

class LoginController{
  register(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    return res.redirect("/profile")
  }

  login(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
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
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    req.session.user = req.user;
    return res.redirect("/vista/products")
  }

  current(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    const userDTO = new UsersDTO(req.user)
    return res.status(200).json({
      status: "success",
      msg: "datos de la sesion",
      payload: userDTO
    })
  }

  async setPremium(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    const { uid } = req.params;
    const result = await userModel.findOne({ _id: uid });

    const documentsPath = path.join(__dirname, "../public/documents/documents");
    const filesToCheck = ["identificacion", "comprobante_domicilio", "comprobante_cuenta"];

    const filesExist = filesToCheck.every((fileName) => {
      const files = fs.readdirSync(documentsPath);
      const fileExists = files.some((file) => file.startsWith(`${uid}-${fileName}`));
      return fileExists;
    });


    if(result.role === "premium"){
      const setUser = await userModel.updateOne({_id: uid}, {role: "user"})
      return res.render("success", {status: "success", message: "Usuario cambiado a user", payload:{setUser}, redirect:"profile"})
    } else if(result.role === "user" && filesExist){
      const setPremium = await userModel.updateOne({_id: uid}, {role: "premium"})
      return res.render("success", {status: "success", message: "Usuario cambiado a premium", payload:{setUser}, redirect:"profile"})
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
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    if(!req.files || req.files.length === 0) return res.status(400).send({status: "error", error: "No se pudo guardar el archivo"})
    return res.render("success", {status:"success", message: "Archivo subido con exito", payload:{}, redirect:"profile"})
  }

  async get(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    const users = await usersService.get();
    return res.status(200).json({
      status: "success",
      payload: users
    });
  }

  async deleteInactive(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    const usersDTO = await usersService.get();
    usersDTO.users.forEach((user) => {
      const lastConnection = user.last_connection;
      const [action, fecha] = lastConnection.split(': ');
      const connectionDate = moment(fecha, 'YYYY-MM-DD HH:mm:ss');
      const diferenciaMinutos = moment().diff(connectionDate, 'minutes');

      // Comprobar si han pasado 30 minutos desde el último login
      if (action === 'login' && diferenciaMinutos >= 30 || action === 'logout' && diferenciaMinutos >= 30) {
        try{
          req.logger.warn(`El usuario ${user.email} tiene una conexión expirada`);
          const deleteThis = usersService.deleteById(user.id)
          const result = sendMailTransport.sendMail({
          from: process.env.GOOGLE_MAIL,
          to: user.email,
          subject: "Se eliminó tu cuenta",
          html:`
              <div>
                <h1>Se borró su cuenta porque expiró su estadía en la página (2 horas)</h1>
                <p>Se puede volver a crear en el siguiente <a href="${apiUrl}/login" >Link</a></p>
              </div>
          `     
        })
        } catch(error){
          return req.logger.error("ERROR: ", error)
        }
        
      } else {
        req.logger.info(`El usuario ${user.email} tiene una conexión vigente`);
      }
    });

    // Enviar respuesta exitosa
    return res.status(200).render("success", { message: 'Verificación de expiración completada' });
  }

  async delete(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    const {uid} = req.params
    const deleteUser = await usersService.deleteById(uid)
    if(!deleteUser){
      req.logger.error("No se pudo borrar el usuario")
      return customError.createError({
        name: "Something´s wrong",
        cause: "Something ocurred in the database",
        message: "Can´t delete the user",
        code: EErros.DATABASE_READ_ERROR
      })
    } 
    return res.status(200).render("success", {status: "success", message: "Usuario borrado con exito", payload: {deleteUser}})
  }
}

export const loginController = new LoginController()