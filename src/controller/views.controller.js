class ViewsController{
  logout(req, res){
    req.session.destroy((err) => {
      if(err){
          return res.render("error-page", {msg: "no se pudo cerrar la session"});
      }
      return res.redirect("/login");
  })
  }

  login(req, res){
    return res.redirect("/login")
  }

  register(req, res){
    return res.render("register-form");
  }

  profile(req, res){
    return res.render("profile", {user: req.session.firstName});
  }

  adminOnly(req ,res){
    return res.send("ESTO ES SOLO PARA ADMINS")
  }
}

export const viewsController = new ViewsController()