import moment from "moment-timezone";
import { userModel } from "../dao/models/user.model.js";

class ViewsController{
  async logout(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    const fechaActualArgentina = moment().tz('America/Argentina/Buenos_Aires');
    const fechaHoraArgentina = "Logout: " + fechaActualArgentina.format('YYYY-MM-DD HH:mm:ss');
    const response = await userModel.updateOne({email: req.session.user.email}, {last_connection: fechaHoraArgentina})
    req.logger.info(req.session.user.email +" last_connection actualizado");
    req.session.destroy((err) => {
      if(err){
          return res.status(400).render("error", {status: "error", title:"Algo salió mal", cause:"Hubo un error a la hora de intentar desloguear", message: err});
      }
      return res.redirect("/login");
  })
  }

  login(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    return res.render("login-form")
  }

  failLogin(req, res){
    req.logger.error("Falló el LOGIN! Revise si puso bien el usuario o contraseña")
    return res.send({error: "failed login"})
  }

  register(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    return res.render("register-form");
  }

  failRegister(req, res){
    req.logger.error("Falló el register! Revise si puso bien el usuario o contraseña")
    return res.send({error: "failed"})
  }

  profile(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    req.logger.debug(req.user);
    return res.render("profile", {user: req.user.firstName, role: req.user.role, email: req.user.email, id: req.user._id.toString()});
  }

  adminOnly(req ,res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    return res.send("ESTO ES SOLO PARA ADMINS")
  }
}

export const viewsController = new ViewsController()