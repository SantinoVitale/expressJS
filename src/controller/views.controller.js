class ViewsController{
  logout(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

    req.session.destroy((err) => {
      if(err){
          return res.render("error-page", {msg: "no se pudo cerrar la session"});
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
    return res.render("profile", {user: req.session.firstName});
  }

  adminOnly(req ,res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    return res.send("ESTO ES SOLO PARA ADMINS")
  }

  adminProducts(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    return res.render("product-form");
  }
}

export const viewsController = new ViewsController()