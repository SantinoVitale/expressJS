import UsersDTO from "../dao/DTO/users.dto.js";

class LoginController{
  register(req, res){
    return res.redirect("/profile")
  }

  failRegister(req, res){
    console.log("Failed strategy");
    return res.send({error: "failed"})
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

  failLogin(req, res){
    return res.send({error: "failed login"})
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
}

export const loginController = new LoginController()