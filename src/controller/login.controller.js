import UsersDTO from "../dao/DTO/users.dto.js";
import { userModel } from "../dao/models/user.model.js";
import customError from "../errors/custom-error.js";

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
    const {uid} = req.params
    const result = await userModel.findOne({_id: uid})
    if(result.role === "premium"){
      const setUser = await userModel.updateOne({_id: uid}, {role: "user"})
      return res.render("success-products", {message: "Usuario cambiado a user"})
    } else if(result.role === "user"){
      const setPremium = await userModel.updateOne({_id: uid}, {role: "premium"})
      return res.render("success-products", {message: "Usuario cambiado a premium"})
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
    console.log(req.file);
    if(!req.files || req.files.length === 0) return res.status(400).send({status: "error", error: "No se pudo guardar el archivo"})
    console.log(req.file);
  }
}

export const loginController = new LoginController()